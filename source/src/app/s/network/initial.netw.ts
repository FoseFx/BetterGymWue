import {CONFIG} from "../../conf";
import {BaseService} from "../base.service";
import {AlertService} from "../alert.service";
import {NetwService} from "./netw.service";
import {evaKurse} from "./evakurse";
import {Observable} from "rxjs/internal/Observable";

export function getTT(stufe, tempTTs){
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

export function getkurse(stufe: string, stufeid: number, that:NetwService): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log(that.wochen);
    if (!that.wochen[0] || !that.wochen[1]) reject('Internal Error: #01');
    const res = that.baseService.makeConnections(CONFIG.baseKursURL + that.wochen[0] + '/c/c' + generate5(stufeid) + '.htm');
    if (res === null) reject('Failure: Connection could not be made');
    res.subscribe(
      (r) => {
        evaKurse(r, ((+that.wochen[0] % 2) === 0) ? 'a' : 'b', stufe, that);
        //woche 2
        const res2 = that.baseService.makeConnections(CONFIG.baseKursURL + that.wochen[1] + '/c/c' + generate5(stufeid) + '.htm');
        res2.subscribe(
          (r) => {
            evaKurse(r, ((+that.wochen[1] % 2) === 0) ? 'a' : 'b', stufe, that);
            let k = [];
            that._kurse[0].kurse.forEach((val) => {
              that._kurse[1].kurse.forEach((val2) => {
                if (val2 === val) k.push(val);
              });
            });
            let fin = [];
            that._kurse[0].kurse.forEach((val) => {
              if (k.indexOf(val) === -1) fin.push(val);
            });
            that._kurse = [{kurse: []},{kurse: []}];
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
