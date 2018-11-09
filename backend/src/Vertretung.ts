import Cache from "./Cache";
import {fetchWithCreds} from "./util";
import {FetchResult} from "./types/FetchResult";
import {mRequest} from "./types/Request";
import {Response} from "express";

const ttl = 5 * 60; // 5 Minuten Cache
const cache = new Cache(ttl);
export function getVP(url: string, credentials: string): Promise<FetchResult> {
    return cache.get(url+credentials, () =>
        fetchWithCreds(url, credentials)
    );
}

export function VertretungsplaeneHandler(req: mRequest, res: Response) {
    getVP(req.gymWueUrl, req.credentials)
        .then((r: FetchResult) => {
            if(!r.ok) return res.status(401).json({error: "Zugangsdaten sind falsch"}).end();
            return res.status(200).end(r.content);
        })
        .catch((err)=>{
            return res.status(500).json({error: err.message}).end();
        });
}