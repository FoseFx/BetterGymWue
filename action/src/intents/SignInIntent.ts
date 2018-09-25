import {Conversation, SimpleResponse} from "actions-on-google";
import {REGISTER_URL} from "../CONFIG";
import {hasScreen} from "../util";

export async function SignInIntent(conv: Conversation<any>, params, signin) {
    console.log(signin.status);
    if (signin.status !== "OK")
        return conv.close("Ohne deine Erlaubnis kann ich nicht auf deine Kurse zugreifen.");
    const payload = conv.user.profile.payload;
    const givenName = payload.given_name;
    const id = payload.sub;
    const storage = conv.user.storage.payload;

    let isRegistered = false;

    if(!storage){
        // await isRegisteredThenGet()
        // TODO fetch Database
        const dbResolve = await Promise.resolve(false);
        isRegistered = !!dbResolve;
    }

    if(isRegistered){
        // TODO redirect to "Home Intent"
    }
    // else
    let sorryText = `Sorry ${givenName}, aber du musst erst die Einrichtung auf ${REGISTER_URL} durchführen.`;
    let sorrySpeach =
        `<speak>Sorry ${givenName}, aber du musst ` +
        (hasScreen(conv)?'<emphasis level="strong">hier</emphasis>': `auf <prosody rate="slow"><say-as interpret-as="characters">${REGISTER_URL}</say-as></prosody>`) +
        `erst die Einrichtung durchführen. Bis später!</speak>`;

    return conv.close(new SimpleResponse({
        text: sorryText,
        speech: sorrySpeach
    }));
}