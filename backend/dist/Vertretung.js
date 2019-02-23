"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cache_1 = require("./Cache");
const util_1 = require("./util");
const ttl = 5 * 60; // 5 Minuten Cache
const cache = new Cache_1.default(ttl);
function getVP(url, credentials) {
    return cache.get(url + credentials, () => util_1.fetchWithCreds(url, credentials));
}
exports.getVP = getVP;
function VertretungsplaeneHandler(req, res) {
    getVP(req.gymWueUrl, req.credentials)
        .then((r) => {
        if (!r.ok)
            return res.status(401).json({ error: "Zugangsdaten sind falsch" }).end();
        return res.status(200).end(r.content);
    })
        .catch((err) => {
        return res.status(500).json({ error: err.message }).end();
    });
}
exports.VertretungsplaeneHandler = VertretungsplaeneHandler;
//# sourceMappingURL=Vertretung.js.map