"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_on_google_1 = require("actions-on-google");
function WelcomeIntent(conv) {
    var date = new Date();
    conv.close(new actions_on_google_1.SimpleResponse({
        text: "Hi",
        speech: "Hallo"
    }));
}
exports.WelcomeIntent = WelcomeIntent;
