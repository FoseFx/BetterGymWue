import {Conversation} from "actions-on-google";
import {Kurs} from "../../source/src/app/Classes";
import * as admin from "firebase-admin";

let ref;

export function hasScreen(conv: Conversation<any>) {
    return conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
}
export interface dbResult {
    exists: boolean;
    creds: {u: string, p: string, l?: {u: string, p: string}};
    stufe: string;
    kurse: Kurs[];
}

export async function getFromDB(sub: string): Promise<dbResult>{
    if(!ref) ref = admin.database().ref("actions");
    const snap = await ref.child(sub).once("value");
    return snap.val();
}