import {Conversation, SimpleResponse} from "actions-on-google";
import {getStundenplan} from "../../backend-port/getStundenplan";
import {Payload} from "../../Payload";

// download and create timetable
export async function handlePart1(conv: Conversation<any>) {
    const payload: Payload = conv.user.storage.payload;
    try{
        conv.user.storage.payload.stundenplan = await getStundenplan(payload.creds, payload.stufe, payload.stufeid);

        return conv.ask(new SimpleResponse({
            text: "Das scheint zu funktionieren!",
            speech: "Super!"
        }));
    }catch (e) {
        console.error(e);
        return conv.close("Da hat etwas nicht funktioniert: " + e.message);
    }
}