import * as express from "express";
import {Conversation, dialogflow, SimpleResponse} from "actions-on-google";

interface ExpectedParameters {
    Stundenplan:string;
    date: Date
}

const app = dialogflow({debug: true});
const eapp = express();
eapp.use(express.json());
eapp.use(app);

app.intent("Stundenplan", function (conv: Conversation<any>) {

    let date = <ExpectedParameters>(conv.parameters).date;
    console.log(date);

    conv.close(new SimpleResponse({
        text: "Fresher test Text",
        speech: "Fresher test yo"
    }));
});

eapp.listen(45634, () => {console.log("Started Actions Server")});
