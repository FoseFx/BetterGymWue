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
var util_1 = require("../../util");
var actions_on_google_1 = require("actions-on-google");
var CONFIG_1 = require("../../CONFIG");
function handlePart0(conv, givenName, id) {
    return __awaiter(this, void 0, void 0, function () {
        var dbResolve, isRegistered, mergedAliases, speach_1, text_1, sorryText, sorrySpeach;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, util_1.getUserFromDB(id)];
                case 1:
                    dbResolve = _a.sent();
                    isRegistered = !!dbResolve;
                    if (isRegistered) {
                        mergedAliases = util_1.generateMergedAliases(dbResolve.kurse, dbResolve.klasse, dbResolve.aliases);
                        speach_1 = "<speach> Follgendes weiß ich über deine Kurse: <break time='0.5s'/>";
                        text_1 = "";
                        dbResolve.kurse.forEach(function (kurs, i) {
                            if (kurs.fach === "FREI")
                                return;
                            speach_1 += dbResolve.aliases[i] + " mit <say-as interpret-as=\"characters\">" + kurs.lehrer + "</say-as><break time=\"0.5s\"/>";
                            text_1 += kurs.fach + " mit " + kurs.lehrer + ",\n";
                        });
                        speach_1 += ". <break time='0.5s'/>Sollte das falsch sein, kannst du es jederzeit ändern, wo du es eingerichtet hast. Sage 'weiter' um die Einrichtung fortzufahren.</speach>";
                        conv.user.storage = {};
                        conv.user.storage.payload = {
                            creds: dbResolve.creds,
                            mergedAliases: mergedAliases,
                            stufe: dbResolve.stufe,
                            stufeid: dbResolve.stufeid,
                        };
                        conv.user.storage.step = 1;
                        return [2 /*return*/, conv.ask(new actions_on_google_1.SimpleResponse({
                                text: text_1 + " sage 'weiter' oder \u00E4ndere deine Kurse in der App.",
                                speech: speach_1
                            }))];
                    }
                    else {
                        sorryText = "Sorry " + givenName + ", aber du musst erst die Einrichtung auf " + CONFIG_1.REGISTER_URL + " durchf\u00FChren.";
                        sorrySpeach = "<speak>Sorry " + givenName + ", aber du musst " +
                            (util_1.hasScreen(conv) ? '<emphasis level="strong">hier</emphasis>' : "auf <prosody rate=\"slow\"><say-as interpret-as=\"characters\">" + CONFIG_1.REGISTER_URL + "</say-as></prosody>") +
                            "erst die Einrichtung durchf\u00FChren. Bis sp\u00E4ter!</speak>";
                        return [2 /*return*/, conv.close(new actions_on_google_1.SimpleResponse({
                                text: sorryText,
                                speech: sorrySpeach
                            }))];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.handlePart0 = handlePart0;
