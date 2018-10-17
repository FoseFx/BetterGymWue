"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = require("../../../source/src/app/conf");
const evaKurse_port_1 = require("./evaKurse-port");
const util_1 = require("../util");
let tempTTs = [];
let _kurse = [{ kurse: [] }, { kurse: [] }];
function getTempTTs() {
    return tempTTs;
}
exports.getTempTTs = getTempTTs;
function getKurseDebug() {
    return _kurse;
}
exports.getKurseDebug = getKurseDebug;
function getTT(stufe) {
    console.log(stufe);
    console.log(tempTTs);
    let r = null;
    tempTTs.forEach((val) => { if (val.stufe === stufe)
        r = val; });
    return r;
}
exports.getTT = getTT;
function get_stufen(resp) {
    return new Promise((resolve, reject) => {
        resp.text().then((wert) => {
            // save weeks
            const w = wert.split('<option value="');
            let wochen = [
                w[1][0] + w[1][1],
                w[2][0] + w[2][1]
            ];
            console.log(wochen);
            const a = wert
                .split('var classes = ')[1]
                .split(';')[0]
                .replace(/(")|(\[)|(])|( )/g, '')
                .split(',');
            resolve([a, wochen]);
        }, (err) => {
            console.log(err);
            reject('Failure: ' + err.statusText);
        });
    });
}
exports.get_stufen = get_stufen;
function getkurse(stufe, stufeid, wochen) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!wochen[0] || !wochen[1])
            throw new Error('Internal Error: #01');
        const res = yield util_1.fetchWithCreds(conf_1.CONFIG.baseKursURL + wochen[0] + '/c/c' + generate5(stufeid) + '.htm');
        if (!res.ok)
            throw new Error('Failure: Connection could not be made');
        try {
            let r = yield res.text();
            evaKurse_port_1.evaKurse(r, stufe, tempTTs, _kurse);
            //woche 2
            const res2 = yield util_1.fetchWithCreds(conf_1.CONFIG.baseKursURL + wochen[1] + '/c/c' + generate5(stufeid) + '.htm');
            r = yield res2.text();
            evaKurse_port_1.evaKurse(r, stufe, tempTTs, _kurse);
            let k = [];
            _kurse[0].kurse.forEach((val) => {
                _kurse[1].kurse.forEach((val2) => {
                    if (val2 === val)
                        k.push(val);
                });
            });
            let fin = [];
            _kurse[0].kurse.forEach((val) => {
                if (k.indexOf(val) === -1)
                    fin.push(val);
            });
            _kurse = [{ kurse: [] }, { kurse: [] }];
            return (fin);
        }
        catch (err) {
            console.log(err);
            throw new Error('Failure: ' + err.statusText);
        }
    });
}
exports.getkurse = getkurse;
function generate5(id) {
    let s = '' + id;
    while (s.length < 5) {
        s = '0' + s;
    }
    return s;
}
