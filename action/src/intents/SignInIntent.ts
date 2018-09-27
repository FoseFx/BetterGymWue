import {Conversation, SimpleResponse} from "actions-on-google";
import {REGISTER_URL} from "../CONFIG";
import {dbResult, getFromDB, hasScreen} from "../util";
import {Kurs} from "../../../source/src/app/Classes";
import {handlePart0} from "./SetUpPart0";
import {handlePart1} from "./SetUpPart1";

export async function SignInIntent(conv: Conversation<any>, params, signin) {
    if (signin.status !== "OK")
        return conv.close("Ohne deine Erlaubnis kann ich nicht auf deine Kurse zugreifen.");
    const payload = conv.user.profile.payload;
    const givenName = payload.given_name;
    const id = payload.sub;

    console.log(conv.user.storage);

    if(conv.user.storage.done === true){
        // TODO redirect to "Home Intent"
        return conv.close("redirect");
    }
    if(!!conv.user.storage.step)
        return await handlePart0(conv, givenName, id);
    else if (conv.user.storage.step === 1)
        return await handlePart1(conv);
}