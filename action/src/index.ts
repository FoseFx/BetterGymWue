import * as express from "express";
import {dialogflow} from "actions-on-google";
import {StundenPlanIntent} from "./intents/Stundenplan";
import {WelcomeIntent} from "./intents/Welcome";
import {INTENTS} from "./intents/Intents";

const CLIENT_ID = process.env.ACTION_CLIENT_ID;

const app = dialogflow({debug: true, clientId: CLIENT_ID});
const eapp = express();
eapp.use(express.json());
eapp.use(app);

app.intent(INTENTS.STUNDENPLAN, StundenPlanIntent);
app.intent(INTENTS.WELCOME, WelcomeIntent);


eapp.listen(45634, () => {console.log("Started Actions Server")});
