"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function personalisieren(SP, kurse) {
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
                    stunden.push({
                        fach: stunde.fach
                        // todo sayas here
                    });
                }
                else if (stunde.type === "kurs") {
                    var kurs = kurse.find(function (value) { return value.title === stunde.fach; });
                    if (!kurs)
                        stunden.push(0);
                    else
                        stunden.push({
                            fach: kurs.fach
                            // todo asyas
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
