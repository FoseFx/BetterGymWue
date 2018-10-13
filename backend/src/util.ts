import fetch from "node-fetch";
import {FetchResult} from "./types/FetchResult";

export async function fetchWithCreds(url: string, credentials: string): Promise<FetchResult> {
    try {
        if(!/^http:\/\/(www\.)?gymnasium-wuerselen\.de\/untis\/(Schueler|Lehrer).*$/g.test(url)) return {ok: false};
        const res = await fetch(url, {
            headers: {
                "Authorization": credentials
            }
        });
        const ok = res.ok;
        if (!ok) return {ok: ok};
        const text = await res.text();
        return {ok: ok, content: text};
    }catch (e) {
        console.error(e);
        return {ok: false};
    }
}