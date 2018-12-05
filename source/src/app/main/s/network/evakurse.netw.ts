import {KurseType, TempTTs} from "../../../Classes";
import {TimeTableSlot} from "../../../Classes";

export function evaKurse(html: string, stufe:string, tempTTs: TempTTs, kurse: KurseType):void {
  const hash = md5(html);
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

  umdrehen(data, tempTTs, woche, stufe, hash);

}



export function umdrehen(data: TimeTableSlot[][], tempTTs: TempTTs, woche: 0|1, stufe:string, hash: string) {
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
    for (let sub = 0; sub < length; sub++){ // backwards iterator
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

  tempTTs.forEach(function (val: { stufe: string, tt: { days: any[][]}[], hash: string }) {
    if (val.stufe !== stufe) return;
    val.tt[woche] = tt;
    val.hash += hash;
    setYet = true;
  });
  if(!setYet)
    tempTTs.push({
      stufe: stufe,
      tt: (woche === 0)? [tt]: [undefined, tt],
      hash: hash
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

function md5(val:string):string {
	val = val.replace(/[\n\W]/g, "");
  let result = "";
  const MD5 = function(d){result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
  result = MD5(val);
  return result;
}
