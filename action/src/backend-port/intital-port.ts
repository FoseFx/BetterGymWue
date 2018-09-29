import {KurseType, TempTT, TempTTs} from "../../../source/src/app/Classes";
import {CONFIG} from "../../../source/src/app/conf";
import fetch from 'node-fetch';
import {evaKurse} from "./evaKurse-port";

let tempTTs: TempTTs = [];
let _kurse: KurseType = [{kurse: []}, {kurse: []}];

export function getTempTTs(){
    return tempTTs;
}

export function getKurseDebug() {
    return _kurse;
}

export function getTT(stufe:string): TempTT{
    console.log(stufe);
    console.log(tempTTs);
    let r = null;
    tempTTs.forEach((val) => { if (val.stufe === stufe) r = val.tt; });
    return r;
}

export function get_stufen(resp: Promise<string>): Promise<string[][]> {
    return new Promise((resolve, reject) => {
        if (resp === null) {
            reject('Failure: No Credentials given, how did you even get here?');
        }
        resp.then(
            (wert:string) => {
                // save weeks
                const w = wert.split('<option value="');
                let wochen: string[] = [
                    w[1][0] + w[1][1],
                    w[2][0] + w[2][1]
                ];
                console.log(wochen);
                const a: string[] =
                    wert
                        .split('var classes = ')[1]
                        .split(';')[0]
                        .replace(/(")|(\[)|(])|( )/g, '')
                        .split(',');
                resolve([a, wochen]);
            },
            (err) => {
                console.log(err);
                reject('Failure: ' + err.statusText);
            }
        );
    });
}

export function getkurse(stufe: string, stufeid: number, wochen: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
        if (!wochen[0] || !wochen[1]) reject('Internal Error: #01');
        const res = fetch(CONFIG.baseKursURL + wochen[0] + '/c/c' + generate5(stufeid) + '.htm');
        if (!res.ok) reject('Failure: Connection could not be made');
        res.then(res=>res.text()).then(
            (r:string) => {
                evaKurse(r, stufe, tempTTs, _kurse);
                //woche 2
                const res2 = fetch(CONFIG.baseKursURL + wochen[1] + '/c/c' + generate5(stufeid) + '.htm');
                res2.then(res=>res.text()).then(
                    (r) => {
                        evaKurse(r, stufe, tempTTs, _kurse);
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
