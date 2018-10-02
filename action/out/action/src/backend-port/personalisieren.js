"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function personalisieren(SP, kurse, aliases, klasse) {
    var klasseObj = {};
    klasse.forEach(function (k, i) { klasseObj[k] = i; });
    var ret = [];
    SP.plan.tt.forEach(function (SPwoche) {
        // woche hat tage
        var woche = [];
        SPwoche.days.forEach(function (day) {
            // tag hat stunden
            var stunden = [];
            day.forEach(function (stunde) {
                // stunde aus kurse
                if (stunde.type === "klasse") {
                    var index = klasseObj[stunde.fach];
                    stunden.push({
                        fach: stunde.fach,
                        readAlias: aliases[kurse.length + index]
                    });
                }
                else if (stunde.type === "kurs") {
                    var kursIndex = kurse.findIndex(function (value) { return value.title === stunde.fach; });
                    if (kursIndex === -1)
                        stunden.push(0);
                    else
                        stunden.push({
                            fach: kurse[kursIndex].fach,
                            readAlias: aliases[kursIndex]
                        });
                }
            }); // day
            woche.push(stunden);
        }); // SPwoche
        ret.push(woche);
    }); // SP
    return ret;
}
exports.personalisieren = personalisieren;
