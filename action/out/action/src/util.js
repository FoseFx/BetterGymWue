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
const admin = require("firebase-admin");
const node_fetch_1 = require("node-fetch");
const btoa = require("btoa");
const crypto = require('crypto');
let ref;
//
// Util
//
function hasScreen(conv) {
    return conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
}
exports.hasScreen = hasScreen;
let _creds;
function fetchWithCreds(url, creds, dontsave = false) {
    if (creds && !dontsave)
        _creds = creds;
    return node_fetch_1.default(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
            "Authorization": `Basic ${btoa(_creds.u + ":" + _creds.p)}`
        }
    });
}
exports.fetchWithCreds = fetchWithCreds;
function cleanCreds() {
    _creds = undefined;
}
exports.cleanCreds = cleanCreds;
function generateHashedCreds(creds) {
    const sha256 = crypto.createHash("sha256");
    return sha256.update(`${creds.u}:${creds.p}`).digest("base64");
}
exports.generateHashedCreds = generateHashedCreds;
function generateMergedAliases(kurse, klasse, aliases) {
    let mergedAliases = [];
    kurse.forEach(function (k, i) {
        mergedAliases.push([k.fach, aliases[i], k.title]);
    });
    klasse.forEach(function (k, i) {
        mergedAliases.push([k, aliases[kurse.length + i]]);
    });
    return mergedAliases;
}
exports.generateMergedAliases = generateMergedAliases;
//
// DB Functions
//
function getUserFromDB(sub) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ref)
            ref = admin.database().ref("actions");
        const snap = yield ref.child(sub).once("value");
        return snap.val();
    });
}
exports.getUserFromDB = getUserFromDB;
function getStundenplanFromDB(stufeid, usrCreds) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ref)
            ref = admin.database().ref("actions");
        const spRef = ref.child("sp").child(stufeid.toString());
        const snap = yield spRef.once("value");
        const val = snap.val();
        if (val === null) {
            console.log("getStundenplanFromDB: ", "no cache found");
            return null;
        }
        const now = +(new Date());
        if (now > val.ttl) {
            console.log("getStundenplanFromDB: ", "cache is too old");
            return null;
        }
        if (generateHashedCreds(usrCreds) !== val.credsHash)
            throw new Error("Die angegebenen Zugangsdaten stimmen nicht mit dem Zwischenspeicher zusammen. Sollten sich die Daten geändert haben, sollte BGW innerhalb von einer Woche wieder funktionieren. Kontaktiere mich, um den Prozess zu beschleunigen.");
        console.log("getStundenplanFromDB: ", "Using cache");
        return { plan: val.plan, availKurse: val.availKurse };
    });
}
exports.getStundenplanFromDB = getStundenplanFromDB;
function pushSPtoDB(plan, availKurse, creds, stufeid) {
    return __awaiter(this, void 0, void 0, function* () {
        const sendPayload = {
            availKurse: availKurse,
            plan: plan,
            credsHash: generateHashedCreds(creds),
            ttl: new Date().setDate(new Date().getDate() + 7)
        };
        if (!ref)
            ref = admin.database().ref("actions");
        const spRef = ref.child("sp").child(stufeid.toString());
        return spRef.set(sendPayload);
    });
}
exports.pushSPtoDB = pushSPtoDB;
