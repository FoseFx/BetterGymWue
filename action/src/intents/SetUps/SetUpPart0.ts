import {getUserFromDB, hasScreen} from "../../util";
import {Kurs} from "../../../../source/src/app/Classes";
import {SimpleResponse} from "actions-on-google";
import {REGISTER_URL} from "../../CONFIG";

export async function handlePart0(conv, givenName, id) {
    const dbResolve = await getUserFromDB(id);
    let isRegistered = !!dbResolve;
    if(isRegistered){
        let speach = "<speach> Follgendes weiß ich über deine Kurse: ";
        let text = "";
        dbResolve.kurse.forEach(function (kurs: Kurs) {
            if(kurs.fach === "FREI") return;
            speach += `<say-as interpret-as="characters">${kurs.fach}</say-as> mit <say-as interpret-as="characters">${kurs.lehrer}</say-as><break time="0.5s"/>`;
            text += `${kurs.fach} mit ${kurs.lehrer},\n`;
        });
        speach += ". <break time='0.5s'/>Sollte das falsch sein, kannst du es jederzeit ändern, wo du es eingerichtet hast. Sage 'weiter' um die Einrichtung fortzufahren.</speach>";
        conv.user.storage = {};
        conv.user.storage.payload = {
            kurse: dbResolve.kurse,
            creds: dbResolve.creds,
            aliases: dbResolve.aliases,
            stufe: dbResolve.stufe,
            stufeid: dbResolve.stufeid,
            klasse: dbResolve.klasse
        };
        conv.user.storage.step = 1;
        return conv.ask(new SimpleResponse({
            text: text,
            speech: speach
        }));
    }
    else {
        let sorryText = `Sorry ${givenName}, aber du musst erst die Einrichtung auf ${REGISTER_URL} durchführen.`;
        let sorrySpeach =
            `<speak>Sorry ${givenName}, aber du musst ` +
            (hasScreen(conv) ? '<emphasis level="strong">hier</emphasis>' : `auf <prosody rate="slow"><say-as interpret-as="characters">${REGISTER_URL}</say-as></prosody>`) +
            `erst die Einrichtung durchführen. Bis später!</speak>`;

        return conv.close(new SimpleResponse({
            text: sorryText,
            speech: sorrySpeach
        }));
    }
}