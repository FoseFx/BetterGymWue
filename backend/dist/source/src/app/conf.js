"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain = "https://proxy.fosefx.com";
const baseUrl = domain + '/v2/http://gymnasium-wuerselen.de/untis/';
const dd = "https://bettergymwue.firebaseio.com/";
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
    message: dd + "header.json",
    hashURL: domain + "/v2/hash",
    versionURL: domain + "/v2/version"
};
exports.APP_VERSION = "1.6.0 Beta";
//# sourceMappingURL=conf.js.map