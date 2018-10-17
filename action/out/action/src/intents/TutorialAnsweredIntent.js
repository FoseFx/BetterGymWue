"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Stundenplan_1 = require("./Stundenplan");
const VertretungsIntent_1 = require("./VertretungsIntent");
function TutorialAnsweredIntent(conv) {
    const intent = conv.request.inputs[0].arguments[0].textValue;
    if (intent === "vertretung")
        return VertretungsIntent_1.VertretungsIntent(conv);
    else if (intent === "morgen")
        return Stundenplan_1.StundenPlanIntent(conv, true);
    else
        return Stundenplan_1.StundenPlanIntent(conv);
    conv.close("Yeah, I could do that");
}
exports.TutorialAnsweredIntent = TutorialAnsweredIntent;
