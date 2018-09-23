import {Confirmation, Conversation, SignIn} from "actions-on-google";

export function SignInIntent(conv: Conversation<any>, params, signin) {
    console.log(signin.status);
    if (signin.status !== "OK"){
        conv.close("Ohne deine Erlaubnis kann ich nicht auf deine Kurse zugreifen.");
        return;
    }
    console.log(conv.user);
    // @ts-ignore
    conv.ask(new Confirmation("Danke für dein Vertrauen! Bitte ließ dir die AGBs und Datenschutzbedingungen durch und akzeptiere" +
        " diese: https://bgw.fosefx.com/agb"));

}