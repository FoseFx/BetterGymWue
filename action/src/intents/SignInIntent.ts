import {Conversation, SimpleResponse} from "actions-on-google";
import {REGISTER_URL} from "../CONFIG";

export function SignInIntent(conv: Conversation<any>, params, signin) {
    console.log(signin.status);
    if (signin.status !== "OK")
        return conv.close("Ohne deine Erlaubnis kann ich nicht auf deine Kurse zugreifen.");
    const payload = conv.user.profile.payload;
    const givenName = payload.given_name;
    const id = payload.sub;
    const storage = conv.user.storage.payload;

    let isRegistered = false;

    if(!storage){
        // TODO fetch Database
    }

    if(isRegistered){
        // TODO redirect to "Home Intent"
    }
    else // TODO test for Smartphone
        return conv.close(new SimpleResponse({
            text: `Sorry, ${givenName}, aber du musst erst die Einrichtung auf ${REGISTER_URL} durchführen.`,
            speech: `Sorry, ${givenName}, aber du musst erst die Einrichtung auf der angezeigten Website durchführen. Bis später!`
        }));
}