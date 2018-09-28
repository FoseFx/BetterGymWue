import {get_stufen, getkurse} from "../../../source/src/app/s/network/initial.netw";
import fetch from 'node-fetch';
import {CONFIG} from "../../../source/src/app/conf";
import {Creds} from "../util";

const fakeService = {
   makeConnections: function (url: string) {
       // TODO fetch here
   }
};

export async function getStundenplan(creds: Creds, stufe: string, stufeid: number, ){
    // TODO step 1:get_stufen()
    let credResult = await fetch(CONFIG.credentialsCheckUrl);
    let access = !!credResult; // TODO 403 check
    if(!access) throw new Error("Anmeldedaten falsch");

    if(!!creds.l){
        let lcredResulr = await fetch(CONFIG.credentialsCheckLehrerUrl);
        if(!lcredResulr) throw new Error("Anmeldedaten für Lehrer falsch"); // TODO 403 check
    }

    let fakeObservable = {
        subscribe: function (func1: Function) {
            func1(credResult);
        }
    };
    // @ts-ignore
    let getStufenResult = await get_stufen(fakeObservable);
    let wochen = getStufenResult[1];



    // TODO step 2: getkurse()
    // @ts-ignore
    await getkurse(stufe, stufeid, wochen, fakeService);
}

