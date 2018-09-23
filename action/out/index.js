"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var actions_on_google_1 = require("actions-on-google");
var Stundenplan_1 = require("./intents/Stundenplan");
var Welcome_1 = require("./intents/Welcome");
var app = actions_on_google_1.dialogflow({ debug: true });
var eapp = express();
eapp.use(express.json());
eapp.use(app);
[
    ["Default Welcome Intent", Welcome_1.WelcomeIntent],
    ["Stundenplan", Stundenplan_1.StundenPlanIntent]
].forEach(function (e) {
    app.intent(e[0], e[1]);
});
app.intent("Stundenplan", Stundenplan_1.StundenPlanIntent);
eapp.listen(45634, function () { console.log("Started Actions Server"); });
