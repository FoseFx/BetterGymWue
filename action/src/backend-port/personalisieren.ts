import {Stundenplan} from "../Classes";
import {Kurs} from "../../../source/src/app/Classes";
import {PersoPlan, Stunden, Woche} from "../Classes";

export function personalisieren(SP: Stundenplan, kurse: Kurs[], aliases: string[], klasse: string[]): PersoPlan {

    let klasseObj = {};
    klasse.forEach(function (k, i) { klasseObj[k] = i; });

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
                    const index = klasseObj[stunde.fach];
                    stunden.push({
                        fach: stunde.fach,
                        readAlias: aliases[kurse.length + index]
                    });
                }else if(stunde.type === "kurs"){
                    let kursIndex = kurse.findIndex(value => value.title === stunde.fach);
                    if(kursIndex === -1) stunden.push(0);
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