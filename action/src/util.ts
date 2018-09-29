import {Conversation} from "actions-on-google";
import {Kurs, TempTT} from "../../source/src/app/Classes";
import * as admin from "firebase-admin";
import fetch from 'node-fetch';
import * as btoa from "btoa";
import {accessSync} from "fs";

let ref: admin.database.Reference;

export function hasScreen(conv: Conversation<any>) {
    return conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
}

export interface Creds {u: string, p: string, l?: {u: string, p: string}}
export interface dbResult {
    exists: boolean;
    creds: Creds;
    stufe: string;
    stufeid: number;
    kurse: Kurs[];
}

export async function getFromDB(sub: string): Promise<dbResult>{
    if(!ref) ref = admin.database().ref("actions");
    const snap = await ref.child(sub).once("value");
    return snap.val();
}

export async function pushSPtoDB(stufe: string, sp): Promise<boolean>{
    if(!ref) ref = admin.database().ref("actions");
    try {
        const spRef = ref.child("sp").child(stufe);
        const val = await spRef.once("value");
        if(val.val() === null) {
            await spRef.set(sp.tt);
            return true;
        }
        return false;

    } catch (e) {
        console.error(e);
        return false;
    }
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