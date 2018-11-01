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
const actions_on_google_1 = require("actions-on-google");
const getStundenplan_1 = require("../../backend-port/getStundenplan");
const util_1 = require("../../util");
const personalisieren_1 = require("../../backend-port/personalisieren");
const Stundenplan_1 = require("../Stundenplan");
// download and create timetable
function handlePart1(conv, update = false) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield initializeStundenplan(conv);
            conv.user.storage.done = true;
            if (!update)
                return conv.ask(new actions_on_google_1.SimpleResponse({
                    text: "BGW ist jetzt eingerichtet! Frag mich was!",
                    speech: "BGW ist jetzt eingerichtet! Frag mich was!"
                }));
            else
                return Stundenplan_1.StundenPlanIntent(conv);
        }
        catch (e) {
            console.error(e);
            return conv.close("Da hat etwas nicht funktioniert: " + e.message);
        }
    });
}
exports.handlePart1 = handlePart1;
function initializeStundenplan(conv) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = conv.user.storage.payload;
        let sp = yield util_1.getStundenplanFromDB(payload.stufeid, payload.creds);
        if (sp === null) {
            console.log("SetUpPart1: ", "getStundenplanFromDB returned null, starting setup without cache");
            sp = yield getStundenplan_1.getStundenplan(payload.creds, payload.stufe, payload.stufeid);
        }
        const plan = personalisieren_1.personalisieren(sp, payload.mergedAliases);
        conv.user.storage.payload.plan = plan;
        conv.user.storage.payload.planTTL = +new Date().setDate(new Date().getDate() + 7);
        return plan;
    });
}
exports.initializeStundenplan = initializeStundenplan;
