import {Conversation, SignIn, SimpleResponse} from "actions-on-google";


export function WelcomeIntent(conv: Conversation<any>) {
    let date = new Date();

    /*
    conv.ask(new SimpleResponse({
        text: "Hi",
        speech: "Hallo"
    }));
    */
    // @ts-ignore
    conv.ask(new SignIn("Um deine Daten für dich zu speichern"));
}