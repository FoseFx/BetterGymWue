import {Conversation} from "actions-on-google";
import {getStundenplan} from "../../backend-port/getStundenplan";
import {Payload} from "../../Payload";

// download and create timetable
export async function handlePart1(conv: Conversation<any>) {
    const payload: Payload = conv.user.storage.payload;
    try{
        await getStundenplan(payload.creds, payload.stufe, payload.stufeid);
    }catch (e) {
        console.error(e);
    }
    return conv.close("handlepart1");
}