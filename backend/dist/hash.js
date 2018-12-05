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
const Cache_1 = require("./Cache");
const Stunden_1 = require("./Stunden");
const util_1 = require("./util");
const CONFIG_1 = require("./CONFIG");
const crypto = require('crypto');
const ttl = 12 * 60 * 60; // 12 hours ttl
const cache = new Cache_1.default(ttl);
function HashHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stufe = req.query.stufe;
            if (!stufe)
                return res.json({ error: "No Stufe provided" }).end();
            const wochen = yield getWochen(req.credentials);
            if (wochen === null)
                return res.json({ error: "Credentials are not valid" }).end();
            return res.end(yield getHash(stufe, wochen, req.credentials));
        }
        catch (e) {
            console.error(e);
            return res.json({ error: "501" }).end();
        }
    });
}
exports.HashHandler = HashHandler;
function getHash(stufeid, wochen, creds) {
    return __awaiter(this, void 0, void 0, function* () {
        const d = yield cache.get(stufeid + creds + wochen.toString(), () => getPlaene(stufeid, wochen, creds));
        if (d.ok)
            return d.content;
        else
            return '{"error": "not found"}';
    });
}
function getPlaene(stufeid, wochen, creds) {
    return __awaiter(this, void 0, void 0, function* () {
        let r = yield Promise.all([
            Stunden_1.getSP(`http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/${wochen[0]}/c/c${to5(stufeid)}.htm`, creds),
            Stunden_1.getSP(`http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/${wochen[1]}/c/c${to5(stufeid)}.htm`, creds)
        ]);
        const htmls = [];
        if (r.every(f => f.ok))
            r.forEach((f) => htmls.push(f.content));
        else
            return { ok: false, content: null };
        return { ok: true, content: calcHash(htmls[0], htmls[1]) };
    });
}
function getWochen(creds) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield cache.get("wochen" + creds, () => util_1.fetchWithCreds(CONFIG_1.CONFIG.navbarURL, creds));
        if (!result.ok)
            return null;
        const wert = result.content;
        const w = wert.split('<option value="');
        return [
            w[1][0] + w[1][1],
            w[2][0] + w[2][1]
        ];
    });
}
function calcHash(html1, html2) {
    html1 = html1.replace(/[\n\W]/g, "");
    html2 = html2.replace(/[\n\W]/g, "");
    let md5sum = md5Gen();
    const a = md5sum.update(html1).digest("hex");
    md5sum = md5Gen();
    const b = md5sum.update(html2).digest("hex");
    return a + b;
}
exports.calcHash = calcHash;
const md5Gen = () => crypto.createHash('md5');
function to5(str) {
    while (str.length < 5) {
        str = "0" + str;
    }
    return str;
}
exports.to5 = to5;
//# sourceMappingURL=hash.js.map