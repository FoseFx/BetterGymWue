import * as express from "express";
import {dialogflow} from "actions-on-google";
import {StundenPlanIntent} from "./intents/Stundenplan";
import {WelcomeIntent} from "./intents/Welcome";

const app = dialogflow({debug: true});
const eapp = express();
eapp.use(express.json());
eapp.use(app);

[
    ["Default Welcome Intent", WelcomeIntent],
    ["Stundenplan", StundenPlanIntent]
].forEach(function (e: [string, any]) {
    app.intent(e[0], e[1]);
});

app.intent("Stundenplan", StundenPlanIntent);

eapp.listen(45634, () => {console.log("Started Actions Server")});
