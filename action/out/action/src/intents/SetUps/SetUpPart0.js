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
const util_1 = require("../../util");
const actions_on_google_1 = require("actions-on-google");
const CONFIG_1 = require("../../CONFIG");
function handlePart0(conv, givenName, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbResolve = yield util_1.getUserFromDB(id);
        let isRegistered = !!dbResolve;
        if (isRegistered) {
            const mergedAliases = util_1.generateMergedAliases(dbResolve.kurse, dbResolve.klasse, dbResolve.aliases);
            let speach = "<speach> Follgendes weiß ich über deine Kurse: <break time='0.5s'/>";
            let text = "";
            dbResolve.kurse.forEach(function (kurs, i) {
                if (kurs.fach === "FREI")
                    return;
                speach += `${dbResolve.aliases[i]} mit <say-as interpret-as="characters">${kurs.lehrer}</say-as><break time="0.5s"/>`;
                text += `${kurs.fach} mit ${kurs.lehrer},\n`;
            });
            speach += ". <break time='0.5s'/>Sollte das falsch sein, kannst du es jederzeit ändern, wo du es eingerichtet hast. Sage 'weiter' um die Einrichtung fortzufahren.</speach>";
            conv.user.storage = {};
            conv.user.storage.payload = {
                creds: dbResolve.creds,
                mergedAliases: mergedAliases,
                stufe: dbResolve.stufe,
                stufeid: dbResolve.stufeid,
            };
            conv.user.storage.step = 1;
            return conv.ask(new actions_on_google_1.SimpleResponse({
                text: `${text} sage 'weiter' oder ändere deine Kurse in der App.`,
                speech: speach
            }));
        }
        else {
            let sorryText = `Sorry ${givenName}, aber du musst erst die Einrichtung auf ${CONFIG_1.REGISTER_URL} durchführen.`;
            let sorrySpeach = `<speak>Sorry ${givenName}, aber du musst ` +
                (util_1.hasScreen(conv) ? '<emphasis level="strong">hier</emphasis>' : `auf <prosody rate="slow"><say-as interpret-as="characters">${CONFIG_1.REGISTER_URL}</say-as></prosody>`) +
                `erst die Einrichtung durchführen. Bis später!</speak>`;
            return conv.close(new actions_on_google_1.SimpleResponse({
                text: sorryText,
                speech: sorrySpeach
            }));
        }
    });
}
exports.handlePart0 = handlePart0;
