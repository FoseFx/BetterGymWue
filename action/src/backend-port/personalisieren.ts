import {PersoPlan, Stunden, Stundenplan, Woche} from "../util";
import {Kurs} from "../../../source/src/app/Classes";

export function personalisieren(SP: Stundenplan, kurse: Kurs[]): PersoPlan {
    let ret: PersoPlan = [];
    SP.plan.forEach(function (SPwoche) {
        // woche hat tage
        let woche: Woche = [];
        SPwoche.days.forEach(function (day) {
            // tag hat stunden
            let stunden: Stunden = [];
            day.forEach(function (stunde) {
                // stunde aus kurse
                if (stunde.type === "klasse") {
                    stunden.push({
                        fach: stunde.fach
                        // todo sayas here
                    });
                }else if(stunde.type === "kurs"){
                    let kurs: Kurs = kurse.find(value => value.title === stunde.fach);
                    if(!kurs) stunden.push(0);
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