"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var actions_on_google_1 = require("actions-on-google");
var Stundenplan_1 = require("./intents/Stundenplan");
var Welcome_1 = require("./intents/Welcome");
var Intents_1 = require("./intents/Intents");
var SignInIntent_1 = require("./intents/SignInIntent");
var admin = require("firebase-admin");
var KurseConfIntent_1 = require("./intents/KurseConfIntent");
var serviceAccount = require("../../../serviceAccount.json");
exports.VERSION = 1;
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bettergymwue.firebaseio.com"
});
var CLIENT_ID = process.env.ACTION_CLIENT_ID;
if (!CLIENT_ID)
    throw new Error("No Client ID Provided");
var app = actions_on_google_1.dialogflow({ debug: false, clientId: CLIENT_ID });
var eapp = express();
eapp.use(express.json());
eapp.use(app);
app.intent(Intents_1.INTENTS.STUNDENPLAN, Stundenplan_1.StundenPlanIntent);
app.intent(Intents_1.INTENTS.WELCOME, Welcome_1.WelcomeIntent);
app.intent(Intents_1.INTENTS.SIGN_IN_CONF, SignInIntent_1.SignInIntent);
app.intent(Intents_1.INTENTS.KURSE_CONFIRMED, KurseConfIntent_1.KurseConfIntent);
eapp.listen(45634, function () { console.log("Started Actions Server"); });
