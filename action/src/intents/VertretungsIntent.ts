import {Conversation} from "actions-on-google";
import {Stunde, Stunden, UserStorage} from "../Classes";
import {initializeStundenplan} from "./SetUps/SetUpPart1";
import {getVertretungsdaten} from "../backend-port/getVD";
import {VertretungsDaten, VertretungsReihe} from "../../../source/src/app/Classes";
import {VABKSPOKEN, VABKUERZUNG} from "../../../source/src/app/main/s/network/abkuerzen";

export async function VertretungsIntent(conv: Conversation<UserStorage>) {

    // @ts-ignore
    let date = (<ExpectedParameters>(conv.parameters)).date;
    if(!date) date = new Date();
    else date = new Date(date);

    const DOW = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Sammstag"][date.getDay()];


    const payload = conv.user.storage.payload;
    const plan = (payload.planTTL < +new Date()) ? await initializeStundenplan(conv) : payload.plan;

    const VD: VertretungsDaten = await getVertretungsdaten(payload.creds, false, date);


    if(VD === null)
        return conv.ask(`Keinen Vertretungsplan für ${DOW} gefunden.`);



    const info: string =
        VD[0].length === 0?
            null          :
            VD[0].reduce((p,c)=> p + ` ${unHTML(c)}`, "");

    const stufeVD = VD[1][payload.stufe];

    const answerInit = `Am ${DOW} hast du `;
    let answer = answerInit;
    if(!!stufeVD){
        let relevant: Stunde[] = [];
        plan.forEach((woche: Stunden[]) => {
            relevant = relevant.concat(woche[date.getDay() - 1]);
        });
        stufeVD.forEach((reihe: VertretungsReihe) => {
            if(!reihe.nd) return;
            const stunde = relevant.find((stunde: Stunde) => stunde.fach == reihe.fach);
            if(!stunde) return;
            answer += `${stify(reihe.stunde)} ${!!stunde.readAlias? stunde.readAlias: stunde.fach} ${untype(reihe.type)}`;
        })
    }
    if (answerInit === answer)
        answer += "keine Vertretung.";

    if(info !== null)
        answer += ` Weitere Informationen:${info}`;



    return conv.ask(answer);

}

const regex = /<[^><]*>|<\/[^><]*>|\t|\n/g;
export function unHTML(string: string): string{
    if(typeof string === "undefined") return undefined;
    return string.replace(regex, "").trim();
}

export function stify(string: string):string {
    return string.replace(" - ", "/").replace(/(\d+)/g, "$1.");
}

export function untype(string: string): string {
    string = string.trim();
    const index = VABKUERZUNG.findIndex(v => v === string);
    if(index === -1)
        return string === "e (v)"? "Selbstständiges Arbeiten":string;
    return VABKSPOKEN[index];
}