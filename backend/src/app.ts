import express = require("express");
import {mRequest} from "./types/Request";
import {Response, Request} from "express";
import {getVP} from "./Vertretung";
import {FetchResult} from "./types/FetchResult";

const app = express();
app.set("port", process.env.PORT || 59091);
app.use(function (req: mRequest, res: Response, next: ()=>void) {
    const auth = req.headers.authorization;
    if(!auth) res.status(401).json({error: "Keine Zugangsdaten angegeben"}).end();
    req.credentials = auth;
    next();
});
// Stundenpläne
app.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/**", removeV2MiddleWare, (req: mRequest, res: Response) => {

});

// Vertretungspläne
app.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler/**", removeV2MiddleWare, (req: mRequest, res: Response) => {
    getVP(req.gymWueUrl, req.credentials)
    .then((r: FetchResult) => {
        if(!r.ok) return res.status(401).json({error: "Zugangsdaten sind falsch"}).end();
        return res.status(200).end(r.content);
    })
    .catch((err)=>{
        return res.status(500).json({error: err.message}).end();
    });
});

// Sonstiges
app.get("**/**",(req, res: Response) => {
    res.status(400).json({error: "Fehlerhafter Pfad"}).end();
});

export default app;


function removeV2MiddleWare(req: mRequest, res: Response, next: ()=>void){
    req.gymWueUrl = req.path.replace("/v2/", "");
    next();
}
