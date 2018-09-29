"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var baseUrl = 'https://proxy.fosefx.com/http://gymnasium-wuerselen.de/untis/';
var dd = "https://bettergymwue.firebaseio.com/";
exports.CONFIG = {
    baseURL: baseUrl,
    credentialsCheckUrl: baseUrl + 'Schueler-Stundenplan/frames/navbar.htm',
    credentialsCheckLehrerUrl: baseUrl + 'Lehrer-Stundenplan/frames/navbar.htm',
    baseKursURL: baseUrl + 'Schueler-Stundenplan/',
    dbUrl: dd + 'kurse/',
    vertURL: baseUrl + 'Schueler/',
    lehrerURL: baseUrl + 'Lehrer/',
    databaseURL: dd,
    ferienUrl: dd + "ferien/ferien.json",
    ferienEndsUrl: dd + "ferien/ends.json",
    resets: dd + "resets.json",
    resetHeader: dd + "resetMsg/header.json",
    resetMsg: dd + "resetMsg/message.json",
    actionsDB: dd + "actions/",
    actionsApp: "https://us-central1-bettergymwue.cloudfunctions.net/expressActions/registerForActions"
};
