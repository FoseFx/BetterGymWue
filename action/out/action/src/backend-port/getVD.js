"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getVertretungsdaten(creds, useLehrer = false) {
    if (useLehrer)
        return _getLehrerVertretungsDaten(creds.l);
    else
        return _getSchuelerVertretungsDaten(creds);
}
exports.getVertretungsdaten = getVertretungsdaten;
function _getLehrerVertretungsDaten(creds) {
    throw new Error("Not implemented function _getVertretungsDaten");
}
exports._getLehrerVertretungsDaten = _getLehrerVertretungsDaten;
function _getSchuelerVertretungsDaten(creds) {
    throw new Error("Not implemented function _getVertretungsDaten");
}
exports._getSchuelerVertretungsDaten = _getSchuelerVertretungsDaten;
