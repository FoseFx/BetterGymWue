const baseUrl = 'https://proxy.fosefx.com/http://gymnasium-wuerselen.de/untis/';
const dd = "https://bettergymwue.firebaseio.com/";
export const CONFIG = {
  baseURL: baseUrl,
  credentialsCheckUrl: baseUrl + 'Schueler-Stundenplan/frames/navbar.htm', // also get Stufen
  credentialsCheckLehrerUrl: baseUrl + 'Lehrer-Stundenplan/frames/navbar.htm',
  baseKursURL: baseUrl + 'Schueler-Stundenplan/', // baseKursURL + WOCHE + /c/c + STUFENDIFF
  dbUrl: dd + 'kurse/',
  vertURL: baseUrl + 'Schueler/',
  lehrerURL: baseUrl + 'Lehrer/', // .. f1/subst_001.htm
  databaseURL: dd,
  ferienUrl: dd + "ferien/ferien.json",
  ferienEndsUrl: dd + "ferien/ends.json",
  resets: dd + "resets.json",
  resetHeader: dd + "resetMsg/header.json",
  resetMsg: dd + "resetMsg/message.json",
  actionsDB: dd + "actions/"
};
