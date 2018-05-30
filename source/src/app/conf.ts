const baseUrl = 'https://www.fosefx.de/betterGymWue/mirror.php?url=http://gymnasium-wuerselen.de/untis/';
const dd = "https://bettergymwue.firebaseio.com/";
export const CONFIG = {
  baseURL: baseUrl,
  credentialsCheckUrl: baseUrl + 'Schueler-Stundenplan/frames/navbar.htm', // also get Stufen
  credentialsCheckLehrerUrl: baseUrl + 'Lehrer-Stundenplan/frames/navbar.htm',
  baseKursURL: baseUrl + 'Schueler-Stundenplan/', // baseKursURL + WOCHE + /c/c + STUFENDIFF
  dbUrl: dd + 'kurse/',
  vertURL: baseUrl + 'Schueler/',
  lehrerURL: baseUrl + 'Lehrer/', // .. f1/subst_001.htm
  databaseURL: dd
};
