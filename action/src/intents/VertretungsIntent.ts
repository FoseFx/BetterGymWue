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



    const payload = conv.user.storage.payload;
    const plan = (payload.planTTL < +new Date()) ? await initializeStundenplan(conv) : payload.plan;

    const VD: VertretungsDaten = await getVertretungsdaten(payload.creds, false, date);
    const info = VD[0].reduce((p,c)=>p + new JSDOM(c).window.document.textContent().trim());

    const stufeVD = VD[1][payload.stufe];

    return conv.ask(`Info: ${info}, payload: ${JSON.stringify(stufeVD)}`);

    //return conv.ask("Das kann ich noch nicht");
}