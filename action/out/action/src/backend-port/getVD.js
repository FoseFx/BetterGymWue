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
const CONFIG_1 = require("../CONFIG");
function getVertretungsdaten(creds, useLehrer = false) {
    const cache = null; // TODO cache
    if (cache)
        return cache;
    if (useLehrer)
        return _getLehrerVertretungsDaten(creds.l);
    else
        return _getSchuelerVertretungsDaten(creds);
}
exports.getVertretungsdaten = getVertretungsdaten;
function _getLehrerVertretungsDaten(creds) {
    return __awaiter(this, void 0, void 0, function* () {
        throw new Error("Not implemented function _getVertretungsDaten");
    });
}
exports._getLehrerVertretungsDaten = _getLehrerVertretungsDaten;
function _getSchuelerVertretungsDaten(creds) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = fetchVD(creds, CONFIG_1.VERT_URL_S);
        throw new Error("Not implemented function _getVertretungsDaten");
    });
}
exports._getSchuelerVertretungsDaten = _getSchuelerVertretungsDaten;
function fetchVD(creds, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield resp.textConverted();
    });
}
exports.fetchVD = fetchVD;
