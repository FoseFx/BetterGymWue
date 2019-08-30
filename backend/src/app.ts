import express = require("express");
import fetch from "node-fetch";
import {Response, Request} from "express";
import {UPDATE_NEWS, VERSION} from "./version";
import * as bodyParser from "body-parser";
import {extractSessionCookies} from "./util";

const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(jsonParser);
app.use(urlencodedParser);
app.set("port", process.env.PORT || 59091);
app.use((req: Request, res:Response, next:()=>void)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS,GET,POST");
    next();
});
app.options("**/**", (_, res)=>{res.end();});
app.get("/v3/version", (req, res) => res.json({version: VERSION, news: UPDATE_NEWS}).end());

interface LoginRequest extends Request {
    body: {
        email: string,
        password: string
    }
}
app.post("/v3/login", async (req: LoginRequest, resp: Response) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return resp.status(400).json({error: "email und passwort erwartet"}).end();
    }
    try {
        const res = await fetch("https://login.schulmanager-online.de/api/remote-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36",
                "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
                "Upgrade-Insecure-Requests": "1"
            },
            body: `emailOrUsername=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
            redirect: "manual"
        });
        return resp.status(200).json(extractSessionCookies(res.headers.get('set-cookie'))).end();
    } catch (e) {
        return resp.status(500).json({error: "Verbindung zu Schulmanager gescheitert"}).end();
    }
});

interface TTRequest extends Request{
    body: {
        session: string;
        sig: string;
    }
}

app.post("/v3/tt", (req: TTRequest, resp: Response) => {
    /*
    fetch("https://login.schulmanager-online.de/api/calls", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0",
            "Accept": "application/json, text/plain, *",
            "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
            "Content-Type": "application/json;charset=utf-8"
        },
        "referrer": "https://login.schulmanager-online.de/",
        "body": "[{\"moduleName\":\"schedules\",\"endpointName\":\"get-actual-lessons\",\"parameters\":{\"student\":{\"firstname\":\"Maximilian Josef\",\"firstnames\":null,\"lastname\":\"Baumann\",\"salutation\":null,\"recipientName\":null,\"entryDate\":null,\"leavingDate\":null,\"birthplace\":null,\"birthday\":null,\"id\":620618,\"sex\":null,\"isFullAged\":null,\"createdAt\":\"2019-08-21T09:11:58.535Z\",\"updatedAt\":\"2019-08-30T05:55:42.456Z\",\"classId\":0,\"tutorId\":null},\"start\":\"2019-09-02\",\"end\":\"2019-09-08\"}}]",
        "method": "POST",
        "mode": "cors"
    });
    */

});

// Sonstiges
app.get("**/**",(req, res: Response) => {
    return res.status(400).json({error: "Fehlerhafter Pfad"}).end();
});

export default app;
