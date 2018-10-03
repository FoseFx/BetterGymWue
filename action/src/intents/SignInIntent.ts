import {Conversation, SimpleResponse} from "actions-on-google";
import {REGISTER_URL} from "../CONFIG";
import {getUserFromDB, hasScreen} from "../util";
import {Kurs} from "../../../source/src/app/Classes";
import {handlePart0} from "./SetUps/SetUpPart0";
import {handlePart1} from "./SetUps/SetUpPart1";
import {userDBResult} from "../Classes";

export async function SignInIntent(conv: Conversation<any>, params, signin) {
    if (signin.status !== "OK")
        return conv.close("Ohne deine Erlaubnis kann ich nicht auf deine Kurse zugreifen.");
    const payload = conv.user.profile.payload;
    const givenName = signin.given_name;
    const id = payload.sub;

    if(conv.user.storage.done === true){
        // TODO redirect to "Home Intent"
        return conv.close("redirect");
    }
    if(!conv.user.storage.step)
        return await handlePart0(conv, givenName, id);
    else if (conv.user.storage.step === 1)
        return await handlePart1(conv);
}