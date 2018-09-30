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
var util_1 = require("../util");
var intital_port_1 = require("./intital-port");
function getStundenplan(creds, stufe, stufeid) {
    return __awaiter(this, void 0, void 0, function () {
        var credResult, access, lcredResulr, getStufenResult, wochen, availKurse, plan;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, util_1.fetchWithCreds(conf_1.CONFIG.credentialsCheckUrl, creds)];
                case 1:
                    credResult = _a.sent();
                    access = credResult.ok;
                    if (!access)
                        throw new Error("Anmeldedaten falsch");
                    if (!!!creds.l) return [3 /*break*/, 3];
                    return [4 /*yield*/, util_1.fetchWithCreds(conf_1.CONFIG.credentialsCheckLehrerUrl, creds.l, true)];
                case 2:
                    lcredResulr = _a.sent();
                    if (!lcredResulr.ok)
                        throw new Error("Anmeldedaten für Lehrer falsch");
                    _a.label = 3;
                case 3: return [4 /*yield*/, intital_port_1.get_stufen(credResult)];
                case 4:
                    getStufenResult = _a.sent();
                    wochen = getStufenResult[1];
                    return [4 /*yield*/, intital_port_1.getkurse(stufe, stufeid, wochen)];
                case 5:
                    availKurse = _a.sent();
                    util_1.cleanCreds();
                    console.log("availKurse", availKurse);
                    plan = intital_port_1.getTT(stufe);
                    return [4 /*yield*/, util_1.pushSPtoDB(plan, availKurse, creds, stufeid)];
                case 6:
                    _a.sent();
                    return [2 /*return*/, { plan: plan, availKurse: availKurse }];
            }
        });
    });
}
exports.getStundenplan = getStundenplan;
