import fetch from "node-fetch";
import {FetchResult} from "./types/FetchResult";

export async function fetchWithCreds(url: string, credentials: string): Promise<FetchResult> {
    const res = await fetch(url, {
        headers: {
            "Authorization": credentials
        }
    });
    const ok = res.ok;
    if(!ok) return {ok: ok};
    const text = await res.text();
    return {ok: ok, content: text};

}