import * as http from "http";

import {Conversation, dialogflow, SimpleResponse} from "actions-on-google";

const app = dialogflow({debug: true});

app.intent("Stundenplan", function (conv: Conversation<any>) {
    // const data = await getData();


    conv.close(new SimpleResponse({
        text: "Fresher test Text",
        speech: "Fresher test yo"
    }));
});


http.createServer(app).listen(45634, () => {console.log("Started Actions Server")});