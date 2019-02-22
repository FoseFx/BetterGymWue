"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Vertretung_1 = require("./Vertretung");
const Stunden_1 = require("./Stunden");
const hash_1 = require("./hash");
const app = express();
app.set("port", process.env.PORT || 59091);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "authorization");
    res.header("Access-Control-Allow-Methods", "OPTIONS,GET");
    next();
});
app.options("**/**", (_, res) => { res.end(); });
app.get("/v2/version", (req, res) => res.json({ version: "1.6.3 Beta", news: ["Production build", "Backend fixes, sorry für die Downtime", "Kurscloud reset", "Schulplaner Infos eingetragen"] }).end());
app.use(function (req, res, next) {
    const auth = req.headers.authorization;
    if (!auth)
        return res.status(401).json({ error: "Keine Zugangsdaten angegeben" }).end();
    req.credentials = auth;
    next();
});
// Stundenpläne
app.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/**", removeV2MiddleWare, Stunden_1.StundenplaeneHandler);
app.get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer-Stundenplan/**", removeV2MiddleWare, Stunden_1.StundenplaeneHandler);
app.get("/v2/hash", hash_1.HashHandler);
// Vertretungspläne
app.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler/**", removeV2MiddleWare, Vertretung_1.VertretungsplaeneHandler);
app.get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer/**", removeV2MiddleWare, Vertretung_1.VertretungsplaeneHandler);
// Sonstiges
app.get("**/**", (req, res) => {
    return res.status(400).json({ error: "Fehlerhafter Pfad" }).end();
});
exports.default = app;
function removeV2MiddleWare(req, res, next) {
    req.gymWueUrl = req.path.replace("/v2/", "");
    next();
}
//# sourceMappingURL=app.js.map