import {Conversation} from "actions-on-google";
import {handlePart1} from "./SetUps/SetUpPart1";

export function KurseConfIntent(conv: Conversation<any>) {
    return handlePart1(conv);
}