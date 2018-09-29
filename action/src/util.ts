import {Conversation} from "actions-on-google";
import {Kurs} from "../../source/src/app/Classes";
import * as admin from "firebase-admin";
import fetch from 'node-fetch';
import * as btoa from "btoa";

let ref;

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

let _creds: Creds;
export function fetchWithCreds(url: string, creds?: Creds, dontsave = false): Promise<any> {
    if(creds && !dontsave) _creds = creds;
    return fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
            "Authorization": `Basic ${btoa(creds.u + ":" + creds.p)}`
        }
    })
}