import {Conversation} from "actions-on-google";
import {UserStorage} from "../Classes";

export function VertretungsIntent(conv: Conversation<UserStorage>) {
    return conv.ask("Das kann ich noch nicht");
}