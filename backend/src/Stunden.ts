import Cache from "./Cache";
import {FetchResult} from "./types/FetchResult";
import {fetchWithCreds} from "./util";
import {mRequest} from "./types/Request";
import {Response} from "express";

const ttl = 12 * 60 * 60; // 12 hours ttl
const cache = new Cache(ttl);

export function StundenplaeneHandler(req: mRequest, res: Response) {
    getSP(req.gymWueUrl, req.credentials)
        .then((r) => {
            if(!r.ok) return res.status(401).json({error: "Zugangsdaten sind falsch"}).end();
            return res.status(200).end(r.content);
        })
        .catch((err)=>{
            return res.status(500).json({error: err.message}).end();
        });
}

export default function getSP(url: string, credentials: string): Promise<FetchResult> {
    return cache.get(url + credentials, () =>
        fetchWithCreds(url, credentials)
    );
}