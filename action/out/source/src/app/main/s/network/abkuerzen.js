"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// .toLowerCase
exports.SACONDITION = ['selbstständiges arbeiten', "selbständiges arbeiten", "selbstständies arbeiten", "selbstäniges arbeiten", "eigenständiges arbeiten"];
const VARTEN = ['entfall', 'vertretung', 'stattvertretung', 'statt-vertretung', 'raumvtr', 'klausur', "absenz"];
exports.VABKUERZUNG = ['e', 'v', 'statt-v', 'statt-v', 'r', 'k', 'fehlt'];
exports.VABKSPOKEN = ["Entfall", "Vertretung", "Statt Vertretung", "Statt Vertretung", "Raumvertretung", "Klausur", "noch nicht Klar"];
function typeAbkuerzen(type, infotext) {
    let sa = infotext.includes('SELBST. ARB.');
    let index = VARTEN.findIndex(art => art === type);
    if (index === -1 && !sa)
        return type;
    return sa ? 'e (v)' : exports.VABKUERZUNG[index];
}
exports.typeAbkuerzen = typeAbkuerzen;
