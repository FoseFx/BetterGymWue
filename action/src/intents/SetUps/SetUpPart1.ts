import {Conversation, SimpleResponse} from "actions-on-google";
import {getStundenplan} from "../../backend-port/getStundenplan";
import {Payload} from "../../Classes";
import {getStundenplanFromDB} from "../../util";
import {personalisieren} from "../../backend-port/personalisieren";
import {StundenPlanIntent} from "../Stundenplan";

// download and create timetable
export async function handlePart1(conv: Conversation<any>, update=false) {
    const payload: Payload = conv.user.storage.payload;
    try{
        let sp = await getStundenplanFromDB(payload.stufeid, payload.creds);
        if(sp === null){
            console.log("SetUpPart1: ", "getStundenplanFromDB returned null, starting setup without cache");
            sp = await getStundenplan(payload.creds, payload.stufe, payload.stufeid);
        }
        conv.user.storage.payload.plan = personalisieren(sp, payload.mergedAliases);
        conv.user.storage.payload.planTTL = +new Date(new Date().getDate() + 7);
        conv.user.storage.done = true;

        if(!update)
            return conv.ask(new SimpleResponse({
                text: "BGW ist jetzt eingerichtet! Frag mich was!",
                speech: "BGW ist jetzt eingerichtet! Frag mich was!"
            }));
        else return StundenPlanIntent(conv);
    }catch (e) {
        console.error(e);
        return conv.close("Da hat etwas nicht funktioniert: " + e.message);
    }
}