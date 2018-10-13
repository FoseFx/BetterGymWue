"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeCache = require("node-cache");
class Cache {
    constructor(ttl) {
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
    get(key, storeFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = this.cache.get(key);
            if (value)
                return value;
            const res = yield storeFunction();
            this.cache.set(key, res);
            return res;
        });
    }
    /**
     * Deletes Value based on Key
     * */
    del(key) {
        this.cache.del(key);
    }
    /**
     * Flushes the Cache
     * */
    flush() {
        this.cache.flushAll();
    }
}
exports.default = Cache;
//# sourceMappingURL=Cache.js.map