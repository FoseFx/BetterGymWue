import {Conversation} from "actions-on-google";
import {UserStorage} from "../Classes";
import {StundenPlanIntent} from "./Stundenplan";
import {VertretungsIntent} from "./VertretungsIntent";

export function TutorialAnsweredIntent(conv: Conversation<UserStorage>) {
    const intent = conv.request.inputs[0].arguments[0].textValue;
    if(intent === "vertretung") return VertretungsIntent(conv);
    else if (intent === "morgen") return StundenPlanIntent(conv, true);
    else return StundenPlanIntent(conv);
    conv.close("Yeah, I could do that");
}