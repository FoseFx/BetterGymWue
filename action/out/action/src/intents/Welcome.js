"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_on_google_1 = require("actions-on-google");
var index_1 = require("../index");
function WelcomeIntent(conv) {
    var date = new Date();
    if (!conv.user.storage.version)
        conv.user.storage.version = index_1.VERSION;
    if (conv.user.storage.version !== index_1.VERSION) {
        conv.user.storage = { version: index_1.VERSION };
        return conv.close(new actions_on_google_1.SimpleResponse({
            text: "Eine neuer Version von BGW hat dafür gesorgt, dass dein gepeicherter Plan gelöscht wurde. Starte die App neu, um ihn neu zu erstellen!",
            speech: "Eine neuer Version von BGW hat dafür gesorgt, dass dein gepeicherter Plan gelöscht wurde. Starte die App neu, um ihn neu zu erstellen!"
        }));
    }
    // @ts-ignore
    return conv.ask(new actions_on_google_1.SignIn("Um deine Daten für dich zu speichern"));
}
exports.WelcomeIntent = WelcomeIntent;
