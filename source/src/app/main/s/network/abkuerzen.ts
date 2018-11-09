// .toLowerCase
export const SACONDITION = ['selbstständiges arbeiten', "selbständiges arbeiten", "selbstständies arbeiten", "selbstäniges arbeiten", "eigenständiges arbeiten"];
const VARTEN =      ['entfall', 'vertretung', 'stattvertretung', 'raumvtr', 'klausur', "absenz"];
const VABKUERZUNG = ['e',       'v',            'statt-v',          'r',        'k',       'fehlt'];


export function typeAbkuerzen(type:string, infotext:string):string {
  let sa = infotext.includes('SELBST. ARB.');
  let index = VARTEN.findIndex(art=>art===type);
  if(index === -1 && !sa) return type;
  return sa? 'e (v)' : VABKUERZUNG[index];
}
