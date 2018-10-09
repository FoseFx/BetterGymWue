"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_on_google_1 = require("actions-on-google");
var SetUpPart1_1 = require("./SetUps/SetUpPart1");
var days = ["Heute", "Morgen", "Übermorgen"];
// @ts-ignore
function StundenPlanIntent(conv) {
    if (conv.user.storage.payload.planTTL < +new Date())
        return SetUpPart1_1.handlePart1(conv, true);
    // @ts-ignore
    var date = (conv.parameters).date;
    if (!date)
        date = new Date();
    else
        date = new Date(date);
    var today = new Date();
    var diff = dateDiffInDays(today, date);
    if (diff < 0)
        return conv.ask("Leider kann ich nicht in die Vergangenheit reisen, um die Zukunft vorherzusehen");
    var changed = false;
    if (date.getDay() === 0 || date.getDay() === 6) {
        changed = true;
        while (date.getDay() === 0 || date.getDay() === 6)
            date.setDate(date.getDate() + 1);
    }
    diff = dateDiffInDays(today, date);
    console.log(diff);
    var tag = (diff < days.length) ? days[diff] : "in " + diff + " Tagen";
    var A_B_woche = getWeekNumber(date) % 2 === 0 ? 0 : 1;
    var text = "", speech = "";
    var arr = conv.user.storage.payload.plan[A_B_woche][date.getDay() - 1];
    arr.forEach(function (stunde, i) {
        var s = !!stunde.readAlias ? stunde.readAlias : " <say-as interpret-as=\"characters\">" + stunde.fach + "</say-as>";
        var ds = false;
        if (arr[i - 1]) {
            ds = arr[i - 1].fach === stunde.fach;
        }
        var andOrComma = ", ";
        if (arr.length - 2 === i)
            andOrComma = stunde.fach === arr[arr.length - 1].fach ? " und " : ", ";
        if (!ds && arr.length - 1 === i)
            andOrComma = " und ";
        if (i === 0)
            andOrComma = "";
        if (stunde.fach.toUpperCase() !== "FREI" && !ds)
            speech += andOrComma + s + "<break time='0.5s'/>";
        text += " - " + stunde.fach + " \n";
    });
    var changedMsg = !changed ? "" : "Da ist Wochenende, aber";
    conv.ask(new actions_on_google_1.SimpleResponse({
        text: "Stundenplan - " + generateDateText(date) + ": \n" + text,
        speech: "<speak>" + changedMsg + " " + tag + " hast du " + speech + ".</speak>"
    }));
}
exports.StundenPlanIntent = StundenPlanIntent;
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}
var _MS_PER_DAY = 1000 * 60 * 60 * 24;
// a and b are javascript Date objects
function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
function generateDateText(date) {
    var day = (date.getDay() < 10) ? "0" + date.getDay().toString() : date.getDay().toString();
    var month = (date.getMonth() < 10) ? "0" + date.getMonth().toString() : date.getMonth().toString();
    return day + ". " + month + ". " + date.getFullYear();
}
