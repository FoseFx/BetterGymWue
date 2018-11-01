import {Conversation} from "actions-on-google";
import {UserStorage} from "../Classes";
import {initializeStundenplan} from "./SetUps/SetUpPart1";
import {getVertretungsdaten} from "../backend-port/getVD";
import {VertretungsDaten} from "../../../source/src/app/Classes";
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

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
        return conv.ask(`Keinen Vertretungsplan für ${DOW} gefunden`);




    const info: string =
        VD[0].length === 0? null:
                            VD[0].reduce((p,c)=>p + new JSDOM(c).window.document.textContent().trim());

    const stufeVD = VD[1][payload.stufe];

    let answer = `Am ${DOW} hast du `;
    if(!!stufeVD){
        // todo
    }else
        answer += "keine Vertretung.";

    if(info !== null)
        answer += `Weitere Informationen: ${info}`;



    return conv.ask(answer);

}