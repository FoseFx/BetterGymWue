"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function personalisieren(SP, mergedAliases) {
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
                    var alias = mergedAliases.find(function (mA) { return mA[0] === stunde.fach; })[1];
                    stunden.push({
                        fach: stunde.fach,
                        readAlias: alias
                    });
                }
                else if (stunde.type === "kurs") {
                    var mA = mergedAliases.find(function (value) { return value[2] === stunde.fach; });
                    if (!mA)
                        stunden.push({ fach: "FREI", readAlias: "Frei" });
                    else
                        stunden.push({
                            fach: mA[0],
                            readAlias: mA[1]
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
