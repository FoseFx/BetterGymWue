import * as express from "express";
import {dialogflow} from "actions-on-google";
import {StundenPlanIntent} from "./intents/Stundenplan";
import {WelcomeIntent} from "./intents/Welcome";
import {INTENTS} from "./intents/Intents";
import {SignInIntent} from "./intents/SignInIntent";
import * as admin from "firebase-admin";
import {getFromDB} from "./util";
import {KurseConfIntent} from "./intents/KurseConfIntent";

const serviceAccount = require("../../../serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bettergymwue.firebaseio.com"
});

const CLIENT_ID = process.env.ACTION_CLIENT_ID;

const app = dialogflow({debug: false, clientId: CLIENT_ID});
const eapp = express();
eapp.use(express.json());
eapp.use(app);

app.intent(INTENTS.STUNDENPLAN, StundenPlanIntent);
app.intent(INTENTS.WELCOME, WelcomeIntent);
app.intent(INTENTS.SIGN_IN_CONF, SignInIntent);
app.intent(INTENTS.KURSE_CONFIRMED, KurseConfIntent);

eapp.listen(45634, () => {console.log("Started Actions Server")});