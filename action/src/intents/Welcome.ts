import {Conversation, SignIn, SimpleResponse} from "actions-on-google";
import {VERSION} from "../index";
import {UserStorage} from "../Classes";


export function WelcomeIntent(conv: Conversation<UserStorage>) {
    let date = new Date();
    if(!conv.user.storage.version) conv.user.storage.version = VERSION;
    if (conv.user.storage.version !== VERSION) {
        conv.user.storage = {version: VERSION};
        return conv.close(new SimpleResponse({
            text: "Eine neuer Version von BGW hat dafür gesorgt, dass dein gepeicherter Plan gelöscht wurde. Starte die App neu, um ihn neu zu erstellen!",
            speech: "Eine neuer Version von BGW hat dafür gesorgt, dass dein gepeicherter Plan gelöscht wurde. Starte die App neu, um ihn neu zu erstellen!"
        }));
    }
    // @ts-ignore
    return conv.ask(new SignIn("Um deine Daten für dich zu speichern"));
}