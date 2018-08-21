import {KurseType, TempTTs} from "../../Classes";
import {TimeTableSlot} from "../../Classes";


export function evaKurse(html: string, stufe:string, tempTTs: TempTTs, kurse: KurseType):void {
  const parser = new DOMParser();
  let doc = parser.parseFromString(html, "text/html");
  let woche = (<HTMLElement>(
    doc.querySelectorAll('font[size="3"][face="Arial"]')[1]
    )
  ).textContent.split(/(?:\d+\.){2}\d{4} /)[1][0].toLowerCase() === "a"? 0: 1;

  let wholeTable: HTMLElement = doc.getElementsByTagName('tbody')[0];
  // remove header
  wholeTable.firstElementChild.remove();

  let data = [];

  let tri = 0;
  (<HTMLElement[]>Array.from( wholeTable.children )).forEach(function (tr) {

    if(tr.innerText === ""){
      // tr is Empty
      tr.remove(); // TODO, necessary?
      return;
    }
    if(tr.textContent.toLowerCase().includes('pause'))
      return;
    tri++;

    let stunde: TimeTableSlot[] = [];

    Array.from(tr.children).forEach(function (td, tag) {
      if(tag === 0) return; // Exclude number
      // Tag: 1: Mo, 2: Di, ...
      const doppelStunde = (td.getAttribute('rowspan') === "4");

      let info: HTMLElement[] = Array.from(td.getElementsByTagName('tr'));

      //
      // Klassenstunde
      //
      if (info.length === 1){
        let spaltenRaw = Array.from( info[0].getElementsByTagName('font') );
        let spalten = spaltenRaw.map(x => x.textContent.replace(/\n/g, ""))

        stunde.push({
          type: 'klasse',
          isBig: doppelStunde,
          fach: spalten[0],
          lehrer: spalten[1],
          raum: spalten[2],
          pos: [tri + 1, tag - 1] // [index + 1, 0:Mo; 1:Di ...]
        });
      }else{
        //
        // Kursstunde
        //
        const fach = td.getElementsByTagName('b')[0].textContent;

        let raeume: {kurs: string, raum: string}[] = [];

        info.forEach(function (infos, infoi) {
          if(infoi === 0) return;

          let spaltenRaw = Array.from(infos.getElementsByTagName('font'));
          let spalten = spaltenRaw.map(x => x.textContent.replace(/\n/g, ""));

          const title = spalten[0];
          const lehrer = spalten[1];
          const raum = spalten[2];

          raeume.push({
            kurs: title,
            raum: raum
          });

          let kurs = {
            title: title,
            fach: fach,
            lehrer: lehrer
          };

          // TODO
          // TODO
          // TODO

        });

        stunde.push({
          type: 'kurs',
          fach: fach,
          isBig: doppelStunde,
          raeume: raeume
        });

      }

    });
    data.push(stunde);

  });



}
