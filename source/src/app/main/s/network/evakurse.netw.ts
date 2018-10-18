import {KurseType, TempTTs} from "../../../Classes";
import {TimeTableSlot} from "../../../Classes";

export function evaKurse(html: string, stufe:string, tempTTs: TempTTs, kurse: KurseType):void {
  const parser = new DOMParser();
  let doc = parser.parseFromString(html, "text/html");
  let woche: 0|1 = getWoche(doc);

  let wholeTable: HTMLElement = doc.getElementsByTagName('tbody')[0];
  // remove header
  wholeTable.firstElementChild.remove();

  let data: TimeTableSlot[][] = [];
  let tri = 0;

  (<HTMLElement[]>Array.from( wholeTable.children )).forEach(function (tr) {

    if(tr.textContent.trim() === "")
      return;

    tri++;

    let stunde: TimeTableSlot[] = [];

    Array.from(tr.children).forEach(function (td, tag) {
      if(tag === 0) return; // Exclude number
      // Tag: 1: Mo, 2: Di, ...

      if(isPauseOrEmpty(td)) {
        // @ts-ignore
        stunde.push({isUsed: true});
        return;
      }

      const doppelStunde = isDoppelStunde(td);

      let info: HTMLElement[] = Array.from(td.getElementsByTagName('tr'));

      let isUsed = false;
      if(!doppelStunde){
        const fitin = fitIn(data, tag);
        isUsed = fitin.isUsed;
        tag = fitin.tag;
      }


      if (info.length === 1){
        stunde.push(handleKlasse(info, doppelStunde, tag, isUsed));
      }else{
        stunde.push(handleKurse(info, td, kurse, woche, doppelStunde, tag, isUsed));
      }
    }); // td
    if(stunde.length !== 0)
      data.push(stunde);

  }); // tr

  umdrehen(data, tempTTs, woche, stufe);

}



export function umdrehen(data: TimeTableSlot[][], tempTTs: TempTTs, woche: 0|1, stufe:string) {
  let tt: {days: TimeTableSlot[][]} = {days: [[], [], [], [], []]};
  data.forEach(function (stundeE, stunde) {
    stundeE.forEach(function (timetableslot, untrustedtag) {
      let tts: TimeTableSlot;
      let tag: number = timetableslot.tag;
      tag = (tag === undefined || tag === -1)? untrustedtag: tag;

      // get a free timetable slot
      while (typeof tt.days[tag][stunde] !== "undefined"){
        stunde++;
      }

      if (timetableslot.fach !== undefined ){
        tts = Object.assign({}, timetableslot);
        delete tts.isBig;
      }

      // add to TT
      // @ts-ignore
      if(tts === undefined) tts = {};
      tt.days[tag][stunde] = tts;
      // two times in case of isBig
      if (timetableslot.isBig) tt.days[tag][stunde + 1] = tts;
    })
  });


  tt.days.forEach(function (day, i) {
    let length = tt.days[i].length;
    for (let sub = 0; sub < length; sub++){
      if(!tt.days[i][length-sub]) delete tt.days[i][length-sub];
      else if (!tt.days[i][length-sub].type) delete tt.days[i][length-sub];
      else break;
    }
    // Pause vor 10/11 löschen
    if (tt.days[i][9])
      if (!tt.days[i][9].type)
        delete tt.days[i][9];
    tt.days[i] = day.filter(e=>e !== undefined);
  });

  // Add tt to TempTTs
  let setYet = false;

  tempTTs.forEach(function (val) {
    if (val.stufe !== stufe) return;
    val.tt[woche] = tt;
    setYet = true;
  });
  if(!setYet)
    tempTTs.push({
      stufe: stufe,
      tt: (woche === 0)? [tt]: [undefined, tt]
    });

}

export function getWoche(doc: Document):0|1 {
  return (
    <HTMLElement>(
      doc.querySelectorAll('font[size="3"][face="Arial"]')[1]
    )
  ).textContent.split(/(?:\d+\.){2}\d{4} /)[1][0].toLowerCase() === "a"? 0: 1;
}

export function handleKlasse(info: HTMLElement[], doppelStunde: boolean, tag: number, isUsed: boolean): TimeTableSlot {
  let spaltenRaw = Array.from( info[0].getElementsByTagName('font') );
  let spalten = spaltenRaw.map(x => x.textContent.replace(/\n/g, ""));

  return {
    type: 'klasse',
    isBig: doppelStunde,
    fach: spalten[0],
    lehrer: spalten[1],
    raum: spalten[2],
    tag: tag - 1,
    isUsed: isUsed
  };
}

export function handleKurse(info: HTMLElement[],
                     td: Element,
                     kurse: KurseType,
                     woche: 0|1,
                     doppelStunde: boolean,
                     tag: number,
                     isUsed: boolean): TimeTableSlot {
  const title = td.getElementsByTagName('b')[0].textContent;

  let raeume: {kurs: string, raum: string}[] = [];

  info.forEach(function (infos, infoi) {
    if(infoi === 0) return;

    let spaltenRaw = Array.from(infos.getElementsByTagName('font'));
    let spalten = spaltenRaw.map(x => x.textContent.replace(/\n/g, ""));

    const fach = spalten[0]; // GE3, E1, ...
    const lehrer = spalten[1];
    const raum = spalten[2];

    raeume.push({
      kurs: fach,
      raum: raum
    });


    //
    // test for existence in other week
    //
    let exists = false;
    kurse[woche].kurse.forEach(function (kurs) {
      if(fach === kurs.fach) exists = true;
    });

    if (!exists)
      kurse[woche].kurse.push({
        title: title,
        fach: fach,
        lehrer: lehrer
      });

  }); // info

  return {
    type: 'kurs',
    fach: title,
    isBig: doppelStunde,
    raeume: raeume,
    tag: tag - 1,
    isUsed: isUsed
  };

}

export function isPauseOrEmpty(td: Element) {
  return /^\npause\n/i.test(td.textContent) || td.textContent === ""
}

export function isDoppelStunde(td: Element) {
  return (td.getAttribute('rowspan') === "4");
}

export function fitIn(data, tag): {tag: number, isUsed: boolean} {
  let isUsed = false;
  let indexOfFirstSmallSlotBefore = data[data.length-1].findIndex((e: TimeTableSlot)=> !e.isBig && !e.isUsed);
  tag = indexOfFirstSmallSlotBefore === -1? tag : indexOfFirstSmallSlotBefore + 1;
  // +1 to counter following -1, which is needed because of the exclusion
  if(indexOfFirstSmallSlotBefore !== -1){
    data[data.length-1][indexOfFirstSmallSlotBefore].isUsed = true;
    isUsed = true;
  }
  return {tag: tag, isUsed: isUsed};
}