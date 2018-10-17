"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const actions_on_google_1 = require("actions-on-google");
const Stundenplan_1 = require("./intents/Stundenplan");
const Welcome_1 = require("./intents/Welcome");
const Intents_1 = require("./intents/Intents");
const SignInIntent_1 = require("./intents/SignInIntent");
const admin = require("firebase-admin");
const KurseConfIntent_1 = require("./intents/KurseConfIntent");
const TutorialAnsweredIntent_1 = require("./intents/TutorialAnsweredIntent");
process.env.TZ = "Europe/Berlin";
const serviceAccount = require("../../../serviceAccount.json");
exports.VERSION = 1;
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bettergymwue.firebaseio.com"
});
const CLIENT_ID = process.env.ACTION_CLIENT_ID;
if (!CLIENT_ID)
    throw new Error("No Client ID Provided");
const app = actions_on_google_1.dialogflow({ debug: false, clientId: CLIENT_ID });
const eapp = express();
eapp.use(express.json());
eapp.use(app);
// @ts-ignore
app.intent(Intents_1.INTENTS.STUNDENPLAN, Stundenplan_1.StundenPlanIntent);
app.intent(Intents_1.INTENTS.WELCOME, Welcome_1.WelcomeIntent);
app.intent(Intents_1.INTENTS.SIGN_IN_CONF, SignInIntent_1.SignInIntent);
app.intent(Intents_1.INTENTS.KURSE_CONFIRMED, KurseConfIntent_1.KurseConfIntent);
app.intent(Intents_1.INTENTS.TUTORIAL_ANSWERED, TutorialAnsweredIntent_1.TutorialAnsweredIntent);
eapp.listen(45634, () => { console.log("Started Actions Server"); });
