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
const SetUpPart1_1 = require("./SetUps/SetUpPart1");
const getVD_1 = require("../backend-port/getVD");
const abkuerzen_1 = require("../../../source/src/app/main/s/network/abkuerzen");
function VertretungsIntent(conv) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        let date = (conv.parameters).date;
        if (!date)
            date = new Date();
        else
            date = new Date(date);
        const DOW = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Sammstag"][date.getDay()];
        const payload = conv.user.storage.payload;
        const plan = (payload.planTTL < +new Date()) ? yield SetUpPart1_1.initializeStundenplan(conv) : payload.plan;
        const VD = yield getVD_1.getVertretungsdaten(payload.creds, false, date);
        if (VD === null)
            return conv.ask(`Keinen Vertretungsplan für ${DOW} gefunden.`);
        const info = VD[0].length === 0 ?
            null :
            VD[0].reduce((p, c) => p + ` ${unHTML(c)}`, "");
        const stufeVD = VD[1][payload.stufe];
        const answerInit = `Am ${DOW} hast du `;
        let answer = answerInit;
        if (!!stufeVD) {
            let relevant = [];
            plan.forEach((woche) => {
                relevant = relevant.concat(woche[date.getDay() - 1]);
            });
            stufeVD.forEach((reihe) => {
                if (!reihe.nd)
                    return;
                const stunde = relevant.find((stunde) => stunde.fach == reihe.fach);
                if (!stunde)
                    return;
                answer += `${stify(reihe.stunde)} ${!!stunde.readAlias ? stunde.readAlias : stunde.fach} ${untype(reihe.type)}`;
            });
        }
        if (answerInit === answer)
            answer += "keine Vertretung.";
        if (info !== null)
            answer += ` Weitere Informationen:${info}`;
        return conv.ask(answer);
    });
}
exports.VertretungsIntent = VertretungsIntent;
const regex = /<[^><]*>|<\/[^><]*>|\t|\n/g;
function unHTML(string) {
    if (typeof string === "undefined")
        return undefined;
    return string.replace(regex, "").trim();
}
exports.unHTML = unHTML;
function stify(string) {
    return string.replace(" - ", "/").replace(/(\d+)/g, "$1.");
}
exports.stify = stify;
function untype(string) {
    string = string.trim();
    const index = abkuerzen_1.VABKUERZUNG.findIndex(v => v === string);
    if (index === -1)
        return string === "e (v)" ? "Selbstständiges Arbeiten" : string;
    return abkuerzen_1.VABKSPOKEN[index];
}
exports.untype = untype;
