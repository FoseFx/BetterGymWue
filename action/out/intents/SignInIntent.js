"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function SignInIntent(conv, params, signin) {
    if (signin.status !== "ok")
        conv.close("Ohne deine Erlaubnis kann ich nicht auf deine Kurse zugreifen.");
    console.log(conv.user);
    conv.close("Danke für dein Vertrauen! Ich beginne jetzt mit der Einrichtung.");
}
exports.SignInIntent = SignInIntent;
