import fetch from 'node-fetch';
import {CONFIG} from "../../../source/src/app/conf";
import {Creds} from "../util";
import {get_stufen, getkurse, getKurseDebug, getTempTTs, getTT} from "./intital-port";
import {TempTT} from "../../../source/src/app/Classes";

export async function getStundenplan(creds: Creds, stufe: string, stufeid: number): Promise<TempTT>{
    // step 1: get_stufen()
    let credResult = await fetch(CONFIG.credentialsCheckUrl);
    let access = credResult.ok;
    console.log(credResult.ok);
    if(!access) throw new Error("Anmeldedaten falsch");

    if(!!creds.l){
        let lcredResulr = await fetch(CONFIG.credentialsCheckLehrerUrl);
        if(!lcredResulr.ok) throw new Error("Anmeldedaten für Lehrer falsch");
    }


    // @ts-ignore
    let getStufenResult = await get_stufen(credResult.then(res=>res.text()));
    let wochen = getStufenResult[1];



    // step 2: getkurse()
    // @ts-ignore
    await getkurse(stufe, stufeid, wochen);
    console.log("FINAL getTempTTs", getTempTTs());
    console.log("FINAL getKurseDebug", getKurseDebug());

    // step 3: getTT()
    return getTT(stufe);
}

