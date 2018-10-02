import {Conversation} from "actions-on-google";
import {Kurs, TempTT} from "../../source/src/app/Classes";
import * as admin from "firebase-admin";
import fetch from 'node-fetch';
import * as btoa from "btoa";
import {WritableOptions} from "stream";
const crypto = require('crypto');

let ref: admin.database.Reference;

//
// Util
//

export function hasScreen(conv: Conversation<any>) {
    return conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
}


let _creds: Creds;
export function fetchWithCreds(url: string, creds?: Creds, dontsave = false): Promise<any> {
    if(creds && !dontsave) _creds = creds;
    return fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
            "Authorization": `Basic ${btoa(_creds.u + ":" + _creds.p)}`
        }
    })
}

export function cleanCreds(){
    _creds = undefined;
}

export function generateHashedCreds(creds: Creds): string{
    const sha256 = crypto.createHash("sha256");
    return sha256.update(JSON.stringify({
        u: creds.u,
        p: creds.p
    })).digest("base64");
}

//
// Classes
//
export interface Creds {u: string, p: string, l?: {u: string, p: string}}

export interface userDBResult {
    exists: boolean;
    creds: Creds;
    stufe: string;
    stufeid: number;
    kurse: Kurs[];
}


export class Stundenplan{
    plan: TempTT;
    availKurse: Kurs[];
}

export type PersoPlan = Woche[];

export type Woche = Stunden[];

export type Stunden = Array<Stunde | 0>

export class Stunde {fach: string; readAlias?: string}


export class StundenplanDBResult{
    ttl: number; // UTC value
    plan: TempTT;
    availKurse: Kurs[];
    credsHash: string // generateHashedCreds()
}

//
// DB Functions
//

export async function getUserFromDB(sub: string): Promise<userDBResult>{
    if(!ref) ref = admin.database().ref("actions");
    const snap = await ref.child(sub).once("value");
    return snap.val();
}

export async function getStundenplanFromDB(stufeid: number, usrCreds: Creds):Promise<Stundenplan|null> {
    if(!ref) ref = admin.database().ref("actions");
    const spRef: admin.database.Reference = ref.child("sp").child(stufeid.toString());
    const snap = await spRef.once("value");
    const val: StundenplanDBResult|null = snap.val();
    if(val === null) {
        console.log("getStundenplanFromDB: ", "no cache found");
        return null;
    }
    const now = +(new Date());
    if(now > val.ttl) {
        console.log("getStundenplanFromDB: ", "cache is too old");
        return null;
    }
    if(generateHashedCreds(usrCreds) !== val.credsHash) throw new Error("Die angegebenen Zugangsdaten stimmen nicht mit dem Zwischenspeicher zusammen. Sollten sich die Daten geändert haben, sollte BGW innerhalb von einer Woche wieder funktionieren. Kontaktiere mich, um den Prozess zu beschleunigen.");
    console.log("getStundenplanFromDB: ", "Using cache");
    return {plan: val.plan, availKurse: val.availKurse};
}

export async function pushSPtoDB(plan: TempTT, availKurse: Kurs[], creds: Creds, stufeid: number) {
    const sendPayload: StundenplanDBResult = {
        availKurse: availKurse,
        plan: plan,
        credsHash: generateHashedCreds(creds),
        ttl: new Date().setDate(new Date().getDate() + 7)
    };
    if(!ref) ref = admin.database().ref("actions");
    const spRef: admin.database.Reference = ref.child("sp").child(stufeid.toString());
    return spRef.set(sendPayload);

}