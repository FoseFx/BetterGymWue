import {Conversation} from "actions-on-google";

// download and create timetable
export async function handlePart1(conv: Conversation<any>) {
    return conv.close("handlepart1");
}