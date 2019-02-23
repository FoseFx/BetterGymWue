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
const node_fetch_1 = require("node-fetch");
function fetchWithCreds(url, credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!/^http:\/\/(www\.)?gymnasium-wuerselen\.de\/untis\/(Schueler|Lehrer).*$/g.test(url))
                return { ok: false };
            const res = yield node_fetch_1.default(url, {
                headers: {
                    "Authorization": credentials,
                    "User-Agent": "(Bitte nicht bannen) BGW Bot, mehr Infos auf bgw.fosefx.com/about"
                }
            });
            const ok = res.ok;
            if (!ok)
                return { ok: ok };
            let txt = yield res.textConverted();
            return { ok: ok, content: txt };
        }
        catch (e) {
            console.error(e);
            return { ok: false };
        }
    });
}
exports.fetchWithCreds = fetchWithCreds;
//# sourceMappingURL=util.js.map