import {Conversation, SignIn} from "actions-on-google";

export function SignInIntent(conv: Conversation<any>, params, signin) {
    if (signin.status !== "ok")
        conv.close("Ohne deine Erlaubnis kann ich nicht auf deine Kurse zugreifen.");
    else
        conv.close("Danke für dein Vertrauen! Ich beginne jetzt mit der Einrichtung.");
    //TODO
}