import {Conversation, SimpleResponse} from "actions-on-google";


interface ExpectedParameters {
    Stundenplan:string;
    date: Date
}

export function StundenPlanIntent(conv: Conversation<any>) {
    // @ts-ignore
    let date = <ExpectedParameters>(conv.parameters).date;
    console.log(date);

    conv.ask(new SimpleResponse({
        text: "Fresher test Text",
        speech: "Fresher test yo"
    }));
}