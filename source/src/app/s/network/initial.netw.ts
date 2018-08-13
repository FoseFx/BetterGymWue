import {CONFIG} from "../../conf";
import {evaKurse} from "./evakurse";
import {Observable} from "rxjs/internal/Observable";
import {KurseType, TempTTs} from "../../Classes";
import {BaseService} from "../base.service";

let tempTTs: TempTTs = [];
let _kurse: KurseType = [{kurse: []}, {kurse: []}];

export function getTT(stufe:string){
  console.log(stufe);
  console.log(tempTTs);
  let r = null;
  tempTTs.forEach((val) => { if (val.stufe === stufe) r = val.tt; });
  return r;
}

export function get_stufen(resp: Observable<string>): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    if (resp === null) {
      reject('Failure: No Credentials given, how did you even get here?');
    }
    resp.subscribe(
      (wert:string) => {
        // save weeks
        const w = wert.split('<option value="');
        let wochen: string[] = [
          w[1][0] + w[1][1],
          w[2][0] + w[2][1]
        ];
        console.log(wochen);
        const a: string[] = wert.split('var classes = ')[1].split(';')[0].replace(/(")|(\[)|(])|( )/g, '').split(',');
        resolve([a, wochen]);
      },
      (err) => {
        console.log(err);
        reject('Failure: ' + err.statusText);
      }
    );
  });
}

export function getkurse(stufe: string, stufeid: number, wochen: string[], baseService: BaseService): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log(wochen);
    if (!wochen[0] || !wochen[1]) reject('Internal Error: #01');
    const res = baseService.makeConnections(CONFIG.baseKursURL + wochen[0] + '/c/c' + generate5(stufeid) + '.htm');
    if (res === null) reject('Failure: Connection could not be made');
    res.subscribe(
      (r:string) => {
        console.log(r);
        evaKurse(r, ((+wochen[0] % 2) === 0) ? 'a' : 'b', stufe, tempTTs, _kurse);
        //woche 2
        const res2 = baseService.makeConnections(CONFIG.baseKursURL + wochen[1] + '/c/c' + generate5(stufeid) + '.htm');
        res2.subscribe(
          (r) => {
            evaKurse(r, ((+wochen[1] % 2) === 0) ? 'a' : 'b', stufe, tempTTs, _kurse);
            let k = [];
            _kurse[0].kurse.forEach((val) => {
              _kurse[1].kurse.forEach((val2) => {
                if (val2 === val) k.push(val);
              });
            });
            let fin = [];
            _kurse[0].kurse.forEach((val) => {
              if (k.indexOf(val) === -1) fin.push(val);
            });
            _kurse = [{kurse: []},{kurse: []}];
            resolve(fin);
          }
        );

      },
      (err) => {
        console.log(err);
        reject('Failure: ' + err.statusText);
      }
    );

  });

}

function generate5(id: number): string {
  let s = '' + id;
  while (s.length < 5) {
    s = '0' + s;
  }
  return s;
}
