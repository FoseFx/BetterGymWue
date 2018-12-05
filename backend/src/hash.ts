import Cache from "./Cache";
import {Response} from "express";
import {mRequest} from "./types/Request";
import {getSP} from "./Stunden";
import {FetchResult} from "./types/FetchResult";
import {fetchWithCreds} from "./util";
import {CONFIG} from "./CONFIG";

const crypto = require('crypto');
const ttl = 12 * 60 * 60; // 12 hours ttl
const cache = new Cache(ttl);

interface Req extends mRequest {
    query: {stufe: string, w1: string, w2: string}
}

export async function HashHandler(req: Req, res: Response) {
    try{
        const stufe = req.query.stufe;
        if(!stufe)
            return res.json({error: "No Stufe provided"}).end();
        const wochen = await getWochen(req.credentials);
        if(wochen === null)
            return res.json({error: "Credentials are not valid"}).end();

        return res.end(await getHash(stufe, wochen, req.credentials));

    }catch (e) {
        console.error(e);
        return res.json({error: "501"}).end();
    }
}

async function getHash(stufeid: string, wochen: string[], creds: string): Promise<string> {
    const d = await cache.get(stufeid + creds + wochen.toString(), () =>
        getPlaene(stufeid, wochen, creds)
    );
    if(d.ok)
        return d.content;
    else
        return '{"error": "not found"}';
}

async function getPlaene(stufeid: string, wochen: string[], creds: string): Promise<FetchResult> {
    let r = await Promise.all([
        getSP(`http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/${wochen[0]}/c/c${to5(stufeid)}.htm`, creds),
        getSP(`http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/${wochen[1]}/c/c${to5(stufeid)}.htm`, creds)
    ]);
    const htmls: string[] = [];
    if (r.every(f => f.ok))
        r.forEach((f) => htmls.push(f.content));
    else
        return {ok: false, content: null};
    return {ok: true, content: calcHash(htmls[0], htmls[1])};
}

async function getWochen(creds: string): Promise<string[]> {
    const result = await cache.get("wochen" + creds,() =>
        fetchWithCreds(CONFIG.navbarURL, creds)
    );
    if(!result.ok)
        return null;

    const wert = result.content;
    const w = wert.split('<option value="');
    return [ // e.g. ["49", "50"]
        w[1][0] + w[1][1],
        w[2][0] + w[2][1]
    ];
}


export function calcHash(html1: string, html2: string): string {
    html1 = html1.replace(/[\n\W]/g, "");
    html2 = html2.replace(/[\n\W]/g, "");
    let md5sum = md5Gen();
    const a = md5sum.update(html1).digest("hex");
    md5sum = md5Gen();
    const b = md5sum.update(html2).digest("hex");
    return a + b;
}

const md5Gen = () => crypto.createHash('md5');

export function to5(str: string): string {
    while (str.length < 5){
        str = "0" + str;
    }
    return str;
}