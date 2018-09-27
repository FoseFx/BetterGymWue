"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_on_google_1 = require("actions-on-google");
function StundenPlanIntent(conv) {
    // @ts-ignore
    var date = (conv.parameters).date;
    console.log(date);
    conv.ask(new actions_on_google_1.SimpleResponse({
        text: "Fresher test Text",
        speech: "Fresher test yo"
    }));
}
exports.StundenPlanIntent = StundenPlanIntent;
