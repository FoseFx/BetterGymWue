import express = require("express");
import {mRequest} from "./types/Request";
import {Response, Request} from "express";
import {VertretungsplaeneHandler} from "./Vertretung";
import {StundenplaeneHandler} from "./Stunden";
import {HashHandler} from "./hash";

const app = express();
app.set("port", process.env.PORT || 59091);
app.use((req: Request, res:Response, next:()=>void)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "authorization");
    res.header("Access-Control-Allow-Methods", "OPTIONS,GET");
    next();
});
app.options("**/**", (_, res)=>{res.end();});
app.get("/test", (req, res) => res.end("es ist 16:20 Uhr"));
app.get("/v2/version", (req, res) => res.json({version: "1.6.3 Beta", news: ["Production build", "Backend fixes, sorry für die Downtime", "Kurscloud reset", "Schulplaner Infos eingetragen"]}).end());
app.use(function (req: mRequest, res: Response, next: ()=>void) {
    const auth = req.headers.authorization;
    if(!auth) return res.status(401).json({error: "Keine Zugangsdaten angegeben"}).end();
    req.credentials = auth;
    next();
});
// Stundenpläne
app.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/**", removeV2MiddleWare, StundenplaeneHandler);
app.get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer-Stundenplan/**", removeV2MiddleWare, StundenplaeneHandler);

app.get("/v2/hash", HashHandler);

// Vertretungspläne
app.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler/**", removeV2MiddleWare, VertretungsplaeneHandler);
app.get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer/**", removeV2MiddleWare, VertretungsplaeneHandler);

// Sonstiges
app.get("**/**",(req, res: Response) => {
    return res.status(400).json({error: "Fehlerhafter Pfad"}).end();
});

export default app;


function removeV2MiddleWare(req: mRequest, res: Response, next: ()=>void){
    req.gymWueUrl = req.path.replace("/v2/", "");
    next();
}
