"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_on_google_1 = require("actions-on-google");
var days = ["Heute", "Morgen", "Übermorgen"];
// @ts-ignore
function StundenPlanIntent(conv) {
    // @ts-ignore
    var date = (conv.parameters).date;
    if (!date)
        date = new Date();
    var today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // start of day
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var timeDiff = Math.abs(date.getTime() - today.getTime());
    var diff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diff < 0)
        return conv.ask("Leider kann ich nicht in die Vergangenheit reisen, um die Zukunft vorherzusehen");
    var changed = false;
    if (date.getDay() === 0 || date.getDay() === 6) {
        changed = true;
        while (date.getDay() === 0 || date.getDay() === 6)
            date.setDate(date.getDate() + 1);
    }
    var tag = (diff < days.length) ? days[diff] : "in " + diff + " Tagen";
    var A_B_woche = getWeekNumber(date) % 2 === 0 ? 0 : 1;
    var text = "", speech = "";
    conv.user.storage.payload.plan[A_B_woche][date.getDay() - 1].forEach(function (stunde) {
        var s = !!stunde.readAlias ? stunde.readAlias : " <say-as interpret-as=\"characters\">" + stunde.fach + "</say-as><break time=\"0.75s\"/>";
        if (stunde.fach.toUpperCase() !== "FREI")
            speech += s;
        text += " - " + stunde.fach + " \n";
    });
    var changedMsg = !changed ? "" : "Da ist Wochenende, aber";
    conv.ask(new actions_on_google_1.SimpleResponse({
        text: "Stundenplan - " + date.getDay() + ". " + date.getMonth() + ". " + date.getFullYear() + ": \n" + text,
        speech: "<speak>" + changedMsg + " " + tag + " hast du " + speech + "</speak>"
    }));
}
exports.StundenPlanIntent = StundenPlanIntent;
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}
