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
const SetUpPart0_1 = require("./SetUps/SetUpPart0");
const SetUpPart1_1 = require("./SetUps/SetUpPart1");
const Stundenplan_1 = require("./Stundenplan");
function SignInIntent(conv, params, signin) {
    return __awaiter(this, void 0, void 0, function* () {
        if (signin.status !== "OK")
            return conv.close("Ohne deine Erlaubnis kann ich nicht auf deine Kurse zugreifen.");
        const payload = conv.user.profile.payload;
        const givenName = signin.given_name;
        const id = payload.sub;
        if (conv.user.storage.done === true) {
            return Stundenplan_1.StundenPlanIntent(conv);
        }
        if (!conv.user.storage.step)
            return yield SetUpPart0_1.handlePart0(conv, givenName, id);
        else if (conv.user.storage.step === 1)
            return yield SetUpPart1_1.handlePart1(conv);
    });
}
exports.SignInIntent = SignInIntent;
