import {CONFIG} from "../../../source/src/app/conf";
import {
    cleanCreds,
    Creds,
    fetchWithCreds,
    pushSPtoDB,
    Stundenplan,
} from "../util";
import {get_stufen, getkurse, getKurseDebug, getTempTTs, getTT} from "./intital-port";

export async function getStundenplan(creds: Creds, stufe: string, stufeid: number): Promise<Stundenplan>{
    // step 1: get_stufen()
    let credResult = await fetchWithCreds(CONFIG.credentialsCheckUrl, creds);
    let access = credResult.ok;
    if(!access) throw new Error("Anmeldedaten falsch");

    if(!!creds.l){
        let lcredResulr = await fetchWithCreds(CONFIG.credentialsCheckLehrerUrl, creds.l, true);
        if(!lcredResulr.ok) throw new Error("Anmeldedaten für Lehrer falsch");
    }

    let getStufenResult = await get_stufen(credResult);
    let wochen = getStufenResult[1];


    // step 2: getkurse()
    // @ts-ignore
    const availKurse = await getkurse(stufe, stufeid, wochen);
    cleanCreds();
    const plan = getTT(stufe);
    await pushSPtoDB(plan, availKurse, creds, stufeid);

    return {plan: plan.tt, availKurse: availKurse};
}

