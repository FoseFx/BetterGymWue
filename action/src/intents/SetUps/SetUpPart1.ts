import {Conversation, SimpleResponse} from "actions-on-google";
import {getStundenplan} from "../../backend-port/getStundenplan";
import {Payload} from "../../Payload";
import {getStundenplanFromDB} from "../../util";

// download and create timetable
export async function handlePart1(conv: Conversation<any>) {
    const payload: Payload = conv.user.storage.payload;
    try{
        let sp = await getStundenplanFromDB(payload.stufeid, payload.creds);
        if(sp === null)
            sp = await getStundenplan(payload.creds, payload.stufe, payload.stufeid);
        // todo personalisieren()


        return conv.ask(new SimpleResponse({
            text: "Das scheint zu funktionieren!",
            speech: "Super!"
        }));
    }catch (e) {
        console.error(e);
        return conv.close("Da hat etwas nicht funktioniert: " + e.message);
    }
}