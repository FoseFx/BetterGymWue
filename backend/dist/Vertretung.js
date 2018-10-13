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
//# sourceMappingURL=Vertretung.js.map