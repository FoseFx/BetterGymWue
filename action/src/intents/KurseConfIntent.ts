import {Conversation} from "actions-on-google";
import {handlePart1} from "./SetUps/SetUpPart1";
import {UserStorage} from "../Classes";

export function KurseConfIntent(conv: Conversation<UserStorage>) {
    return handlePart1(conv);
}