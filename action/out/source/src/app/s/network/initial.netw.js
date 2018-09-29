"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conf_1 = require("../../conf");
var evakurse_netw_1 = require("./evakurse.netw");
var tempTTs = [];
var _kurse = [{ kurse: [] }, { kurse: [] }];
function getTT(stufe) {
    console.log(stufe);
    console.log(tempTTs);
    var r = null;
    tempTTs.forEach(function (val) { if (val.stufe === stufe)
        r = val.tt; });
    return r;
}
exports.getTT = getTT;
function get_stufen(resp) {
    return new Promise(function (resolve, reject) {
        if (resp === null) {
            reject('Failure: No Credentials given, how did you even get here?');
        }
        resp.subscribe(function (wert) {
            // save weeks
            var w = wert.split('<option value="');
            var wochen = [
                w[1][0] + w[1][1],
                w[2][0] + w[2][1]
            ];
            console.log(wochen);
            var a = wert
                .split('var classes = ')[1]
                .split(';')[0]
                .replace(/(")|(\[)|(])|( )/g, '')
                .split(',');
            resolve([a, wochen]);
        }, function (err) {
            console.log(err);
            reject('Failure: ' + err.statusText);
        });
    });
}
exports.get_stufen = get_stufen;
function getkurse(stufe, stufeid, wochen, baseService) {
    return new Promise(function (resolve, reject) {
        if (!wochen[0] || !wochen[1])
            reject('Internal Error: #01');
        var res = baseService.makeConnections(conf_1.CONFIG.baseKursURL + wochen[0] + '/c/c' + generate5(stufeid) + '.htm');
        if (res === null)
            reject('Failure: Connection could not be made');
        res.subscribe(function (r) {
            evakurse_netw_1.evaKurse(r, stufe, tempTTs, _kurse);
            //woche 2
            var res2 = baseService.makeConnections(conf_1.CONFIG.baseKursURL + wochen[1] + '/c/c' + generate5(stufeid) + '.htm');
            res2.subscribe(function (r) {
                evakurse_netw_1.evaKurse(r, stufe, tempTTs, _kurse);
                var k = [];
                _kurse[0].kurse.forEach(function (val) {
                    _kurse[1].kurse.forEach(function (val2) {
                        if (val2 === val)
                            k.push(val);
                    });
                });
                var fin = [];
                _kurse[0].kurse.forEach(function (val) {
                    if (k.indexOf(val) === -1)
                        fin.push(val);
                });
                _kurse = [{ kurse: [] }, { kurse: [] }];
                resolve(fin);
            });
        }, function (err) {
            console.log(err);
            reject('Failure: ' + err.statusText);
        });
    });
}
exports.getkurse = getkurse;
function generate5(id) {
    var s = '' + id;
    while (s.length < 5) {
        s = '0' + s;
    }
    return s;
}
