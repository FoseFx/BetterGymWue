import {Conversation, SimpleResponse} from "actions-on-google";


export function WelcomeIntent(conv: Conversation<any>) {
    let date = new Date();

    conv.close(new SimpleResponse({
        text: "Hi",
        speech: "Hallo"
    }));
}