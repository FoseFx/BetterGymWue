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
const util_1 = require("../util");
const intital_port_1 = require("./intital-port");
function getStundenplan(creds, stufe, stufeid) {
    return __awaiter(this, void 0, void 0, function* () {
        // step 1: get_stufen()
        let credResult = yield util_1.fetchWithCreds(conf_1.CONFIG.credentialsCheckUrl, creds);
        let access = credResult.ok;
        if (!access)
            throw new Error("Anmeldedaten falsch");
        if (!!creds.l) {
            let lcredResulr = yield util_1.fetchWithCreds(conf_1.CONFIG.credentialsCheckLehrerUrl, creds.l, true);
            if (!lcredResulr.ok)
                throw new Error("Anmeldedaten für Lehrer falsch");
        }
        let getStufenResult = yield intital_port_1.get_stufen(credResult);
        let wochen = getStufenResult[1];
        // step 2: getkurse()
        // @ts-ignore
        const availKurse = yield intital_port_1.getkurse(stufe, stufeid, wochen);
        util_1.cleanCreds();
        const plan = intital_port_1.getTT(stufe);
        yield util_1.pushSPtoDB(plan, availKurse, creds, stufeid);
        return { plan: plan, availKurse: availKurse };
    });
}
exports.getStundenplan = getStundenplan;
