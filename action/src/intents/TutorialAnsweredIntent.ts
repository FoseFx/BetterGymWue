import {Conversation} from "actions-on-google";
import {UserStorage} from "../Classes";

export function TutorialAnsweredIntent(conv: Conversation<UserStorage>) {
    console.log(conv.request);
    conv.close("Yeah, I could do that");
}