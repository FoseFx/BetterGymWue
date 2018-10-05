import {Conversation, SimpleResponse} from "actions-on-google";
import {Payload, Stunde} from "../Classes";


interface ExpectedParameters {
    Stundenplan:string;
    date: Date
}

const days = ["Heute","Morgen", "Übermorgen"];
// @ts-ignore
export function StundenPlanIntent(conv: Conversation<any>) {
    // @ts-ignore
    let date = (<ExpectedParameters>(conv.parameters)).date;
    if(!date) date = new Date();
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(),today.getDate()); // start of day
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let timeDiff = Math.abs(date.getTime() - today.getTime());
    const diff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if(diff < 0) return conv.ask("Leider kann ich nicht in die Vergangenheit reisen, um die Zukunft vorherzusehen");
    let changed = false;
    if(date.getDay() === 0 || date.getDay() === 6){
        changed = true;
        while (date.getDay() === 0 || date.getDay() === 6)
            date.setDate(date.getDate() + 1);
    }

    const tag = (diff < days.length)? days[diff] : `in ${diff} Tagen`;
    const A_B_woche = getWeekNumber(date) % 2 === 0? 0:1;

    let text = "",
        speech = "";
    (<Payload>conv.user.storage.payload).plan[A_B_woche][date.getDay() -1].forEach(function (stunde: Stunde) {
        const s = !!stunde.readAlias? stunde.readAlias: ` <say-as interpret-as="characters">${stunde.fach}</say-as>`;
        if(stunde.fach.toUpperCase() !== "FREI") speech += s + "<break time='0.75s'/>";
        text += ` - ${stunde.fach} \n`;
    });
    const changedMsg = !changed? "" : `Da ist Wochenende, aber`;
    conv.ask(new SimpleResponse({
        text: `Stundenplan - ${date.getDay()}. ${date.getMonth()}. ${date.getFullYear()}: \n${text}`,
        speech: `<speak>${changedMsg} ${tag} hast du ${speech}</speak>`
    }));
}

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    let yearStart:any = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}