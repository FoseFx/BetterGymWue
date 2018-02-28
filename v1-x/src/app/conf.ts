const baseUrl = 'https://www.fosefx.de/betterGymWue/mirror.php?url=http://gymnasium-wuerselen.de/untis/';
export const CONFIG = {
  baseURL: baseUrl,
  credentialsCheckUrl: baseUrl + 'Schueler-Stundenplan/frames/navbar.htm', // also get Stufen
  baseKursURL: baseUrl + 'Schueler-Stundenplan/', // baseKursURL + WOCHE + /c/c + STUFENDIFF
  dbUrl: 'https://bettergymwue.firebaseio.com/kurse/',
  vertURL: baseUrl + 'Schueler/'
};
