import * as http from "http";
import * as express from "express";

import {Conversation, dialogflow, SimpleResponse} from "actions-on-google";

const app = dialogflow({debug: true});
const eapp = express();
eapp.use(express.json());
eapp.use(app);

app.intent("Stundenplan", function (conv: Conversation<any>) {
    // const data = await getData();


    conv.close(new SimpleResponse({
        text: "Fresher test Text",
        speech: "Fresher test yo"
    }));
});

eapp.listen(45634, () => {console.log("Started Actions Server")});


// http.createServer(app).listen(45634, () => {console.log("Started Actions Server")});