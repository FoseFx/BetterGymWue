import {CONFIG} from "../../conf";
import {BaseService} from "../base.service";
import {AlertService} from "../alert.service";
import {NetwService} from "./netw.service";

export function getTT(stufe, tempTTs){
  console.log(stufe);
  console.log(tempTTs);
  let r = null;
  tempTTs.forEach((val) => { if (val.stufe === stufe) r = val.tt; });
  return r;
}

export function get_stufen(_stufen, baseService:BaseService, alertService:AlertService, wochen): Promise<string[]> {
  return new Promise((resolve, reject) => {

    if (_stufen) resolve(_stufen);
    const resp = baseService.makeConnections(CONFIG.credentialsCheckUrl);
    if (resp === null) {
      alertService.alert('Failure: No Credentials given, how did you even get here?', alertService.DANGER);
      reject();
    }
    resp.subscribe(
      (wert) => {
        // save weeks
        const w = wert.split('<option value="');
        wochen[0] = w[1][0] + w[1][1];
        wochen[1] = w[2][0] + w[2][1];
        console.log(wochen);
        const a = wert.split('var classes = ')[1].split(';')[0].replace(/(")|(\[)|(])|( )/g, '').split(',');
        localStorage.stufen = JSON.stringify(a);
        _stufen = a;
        resolve(_stufen);
      },
      (err) => {
        console.log(err);
        alertService.alert('Failure: ' + err.statusText, alertService.DANGER);
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
        that.evaKurse(r, ((that.wochen[0] % 2) === 0) ? 'a' : 'b', stufe);
        //woche 2
        const res2 = that.baseService.makeConnections(CONFIG.baseKursURL + that.wochen[1] + '/c/c' + generate5(stufeid) + '.htm');
        res2.subscribe(
          (r) => {
            that.evaKurse(r, ((that.wochen[1] % 2) === 0) ? 'a' : 'b', stufe);
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
