import * as NodeCache from "node-cache";
import {FetchResult} from "./types/FetchResult";

class Cache {
    /**
     * @param ttl - number in Seconds
     * */
    cache: NodeCache;
    constructor(ttl: number){
        this.cache = new NodeCache({
            stdTTL: ttl,
            checkperiod: ttl * 0.2,
            useClones: false
        });
    }

    /**
     * Gets Val from Cache, when possible,
     * when not it sets it
     * */
    async get(key: string, storeFunction: () => Promise<FetchResult>): Promise<FetchResult>{
        const value: FetchResult = this.cache.get(key);
        if(value) console.log("Use Cache");
        if(value) return value;
        console.log("Use Network");
        const res = await storeFunction();
        this.cache.set(key, res);
        return res;
    }

    /**
     * Deletes Value based on Key
     * */
    del(key: string): void{
        this.cache.del(key);
    }

    /**
     * Flushes the Cache
     * */
    flush(){
        this.cache.flushAll();
    }

}

export default Cache;