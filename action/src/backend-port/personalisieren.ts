import {mergedAlias, Stundenplan} from "../Classes";
import {Kurs} from "../../../source/src/app/Classes";
import {PersoPlan, Stunden, Woche} from "../Classes";

export function personalisieren(SP: Stundenplan, mergedAliases: mergedAlias[]): PersoPlan {


    let ret: PersoPlan = [];
    SP.plan.tt.forEach(function (SPwoche) {
        // woche hat tage
        let woche: Woche = [];
        SPwoche.days.forEach(function (day) {
            // tag hat stunden
            let stunden: Stunden = [];
            day.forEach(function (stunde) {
                // stunde aus kurse
                if (stunde.type === "klasse") {
                    const alias = mergedAliases.find(mA => mA[0] === stunde.fach)[1];
                    stunden.push({
                        fach: stunde.fach,
                        readAlias: alias
                    });
                }else if(stunde.type === "kurs"){
                    const mA = mergedAliases.find(value => value[2] === stunde.fach);
                    if(!mA) stunden.push({fach: "FREI", readAlias: "Frei"});
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