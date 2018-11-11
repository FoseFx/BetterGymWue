// .toLowerCase
export const SACONDITION = ['selbstständiges arbeiten', "selbständiges arbeiten", "selbstständies arbeiten", "selbstäniges arbeiten", "eigenständiges arbeiten"];
const VARTEN =      ['entfall', 'vertretung', 'stattvertretung', 'statt-vertretung', 'raumvtr', 'klausur', "absenz"];
export const VABKUERZUNG = ['e',       'v',            'statt-v',        'statt-v',         'r',        'k',       'fehlt'];
export const VABKSPOKEN = ["Entfall", "Vertretung", "Statt Vertretung", "Statt Vertretung", "Raumvertretung", "Klausur", "noch nicht Klar"];

export function typeAbkuerzen(type:string, infotext:string):string {
  let sa = infotext.includes('SELBST. ARB.');
  let index = VARTEN.findIndex(art=>art===type);
  if(index === -1 && !sa) return type;
  return sa? 'e (v)' : VABKUERZUNG[index];
}
