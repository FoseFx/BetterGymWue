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
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
function VertretungsIntent(conv) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        let date = (conv.parameters).date;
        if (!date)
            date = new Date();
        else
            date = new Date(date);
        const payload = conv.user.storage.payload;
        const plan = (payload.planTTL < +new Date()) ? yield SetUpPart1_1.initializeStundenplan(conv) : payload.plan;
        const VD = yield getVD_1.getVertretungsdaten(payload.creds, false, date);
        const info = VD[0].reduce((p, c) => p + new JSDOM(c).window.document.textContent().trim());
        const stufeVD = VD[1][payload.stufe];
        return conv.ask(`Info: ${info}, payload: ${JSON.stringify(stufeVD)}`);
        //return conv.ask("Das kann ich noch nicht");
    });
}
exports.VertretungsIntent = VertretungsIntent;
