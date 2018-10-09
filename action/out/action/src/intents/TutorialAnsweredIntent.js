"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function TutorialAnsweredIntent(conv) {
    console.log(conv.request);
    conv.close("Yeah, I could do that");
}
exports.TutorialAnsweredIntent = TutorialAnsweredIntent;
