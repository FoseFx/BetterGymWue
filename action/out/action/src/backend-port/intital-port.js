"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var conf_1 = require("../../../source/src/app/conf");
var evaKurse_port_1 = require("./evaKurse-port");
var util_1 = require("../util");
var tempTTs = [];
var _kurse = [{ kurse: [] }, { kurse: [] }];
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
        resp.then(function (res) { return res.text(); }).then(function (wert) {
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
function getkurse(stufe, stufeid, wochen) {
    return __awaiter(this, void 0, void 0, function () {
        var res, r, res2, k_1, fin_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!wochen[0] || !wochen[1])
                        throw new Error('Internal Error: #01');
                    return [4 /*yield*/, util_1.fetchWithCreds(conf_1.CONFIG.baseKursURL + wochen[0] + '/c/c' + generate5(stufeid) + '.htm')];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error('Failure: Connection could not be made');
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, , 7]);
                    return [4 /*yield*/, res.text()];
                case 3:
                    r = _a.sent();
                    evaKurse_port_1.evaKurse(r, stufe, tempTTs, _kurse);
                    return [4 /*yield*/, util_1.fetchWithCreds(conf_1.CONFIG.baseKursURL + wochen[1] + '/c/c' + generate5(stufeid) + '.htm')];
                case 4:
                    res2 = _a.sent();
                    return [4 /*yield*/, res2.text()];
                case 5:
                    r = _a.sent();
                    evaKurse_port_1.evaKurse(r, stufe, tempTTs, _kurse);
                    k_1 = [];
                    _kurse[0].kurse.forEach(function (val) {
                        _kurse[1].kurse.forEach(function (val2) {
                            if (val2 === val)
                                k_1.push(val);
                        });
                    });
                    fin_1 = [];
                    _kurse[0].kurse.forEach(function (val) {
                        if (k_1.indexOf(val) === -1)
                            fin_1.push(val);
                    });
                    _kurse = [{ kurse: [] }, { kurse: [] }];
                    return [2 /*return*/, (fin_1)];
                case 6:
                    err_1 = _a.sent();
                    console.log(err_1);
                    throw new Error('Failure: ' + err_1.statusText);
                case 7: return [2 /*return*/];
            }
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
