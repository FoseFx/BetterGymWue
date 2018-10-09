import * as express from "express";
import {dialogflow} from "actions-on-google";
import {StundenPlanIntent} from "./intents/Stundenplan";
import {WelcomeIntent} from "./intents/Welcome";
import {INTENTS} from "./intents/Intents";
import {SignInIntent} from "./intents/SignInIntent";
import * as admin from "firebase-admin";
import {KurseConfIntent} from "./intents/KurseConfIntent";
import {TutorialAnsweredIntent} from "./intents/TutorialAnsweredIntent";

process.env.TZ = "Europe/Berlin";
const serviceAccount = require("../../../serviceAccount.json");

export const VERSION = 1;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bettergymwue.firebaseio.com"
});

const CLIENT_ID = process.env.ACTION_CLIENT_ID;

if(!CLIENT_ID) throw new Error("No Client ID Provided");
const app = dialogflow({debug: false, clientId: CLIENT_ID});
const eapp = express();
eapp.use(express.json());
eapp.use(app);

app.intent(INTENTS.STUNDENPLAN, StundenPlanIntent);
app.intent(INTENTS.WELCOME, WelcomeIntent);
app.intent(INTENTS.SIGN_IN_CONF, SignInIntent);
app.intent(INTENTS.KURSE_CONFIRMED, KurseConfIntent);
app.intent(INTENTS.TUTORIAL_ANSWERED, TutorialAnsweredIntent);

eapp.listen(45634, () => {console.log("Started Actions Server")});