import fetch from "node-fetch"
import {FetchResult} from "./types/FetchResult";

export async function fetchWithCreds(url: string, credentials: string): Promise<FetchResult> {
    try {
        if(!/^http:\/\/(www\.)?gymnasium-wuerselen\.de\/untis\/(Schueler|Lehrer).*$/g.test(url)) return {ok: false};
        const res = await fetch(url, {
            headers: {
                "Authorization": credentials,
                "User-Agent": "(Bitte nicht bannen) BGW Bot, mehr Infos auf bgw.fosefx.com/about"
            }
        });
        const ok = res.ok;
        if (!ok) return {ok: ok};
        let txt = await res.textConverted();
        return {ok: ok, content: txt};
    }catch (e) {
        console.error(e);
        return {ok: false};
    }
}