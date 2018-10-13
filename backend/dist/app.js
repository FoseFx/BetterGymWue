"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Vertretung_1 = require("./Vertretung");
const app = express();
app.set("port", process.env.PORT || 59091);
app.use(function (req, res, next) {
    const auth = req.headers.authorization;
    if (!auth)
        res.status(401).json({ error: "Keine Zugangsdaten angegeben" }).end();
    req.credentials = auth;
    next();
});
// Stundenpläne
app.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/**", removeV2MiddleWare, (req, res) => {
});
// Vertretungspläne
app.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler/**", removeV2MiddleWare, (req, res) => {
    Vertretung_1.getVP(req.gymWueUrl, req.credentials)
        .then((r) => {
        if (!r.ok)
            return res.status(401).json({ error: "Zugangsdaten sind falsch" }).end();
        return res.status(200).end(r.content);
    })
        .catch((err) => {
        return res.status(500).json({ error: err.message }).end();
    });
});
// Sonstiges
app.get("**/**", (req, res) => {
    res.status(400).json({ error: "Fehlerhafter Pfad" }).end();
});
exports.default = app;
function removeV2MiddleWare(req, res, next) {
    req.gymWueUrl = req.path.replace("/v2/", "");
    next();
}
//# sourceMappingURL=app.js.map