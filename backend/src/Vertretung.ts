import Cache from "./Cache";
import {fetchWithCreds} from "./util";
import {FetchResult} from "./types/FetchResult";

const ttl = 5 * 60; // 5 Minuten Cache
const cache = new Cache(ttl);
export function getVP(url: string, credentials: string): Promise<FetchResult> {
    return cache.get(url+credentials, () =>
        fetchWithCreds(url, credentials)
    );
}