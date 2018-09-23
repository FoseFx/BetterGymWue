"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_on_google_1 = require("actions-on-google");
function WelcomeIntent(conv) {
    var date = new Date();
    /*
    conv.ask(new SimpleResponse({
        text: "Hi",
        speech: "Hallo"
    }));
    */
    // @ts-ignore
    conv.ask(new actions_on_google_1.SignIn("Um deine Daten für dich zu speichern"));
}
exports.WelcomeIntent = WelcomeIntent;
