"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// .toLowerCase
exports.SACONDITION = ['selbstständiges arbeiten', "selbständiges arbeiten", "selbstständies arbeiten", "selbstäniges arbeiten"];
const VARTEN = ['entfall', 'vertretung', 'statt-vertretung', 'raum-vtr.', 'klausur', "absenz"];
const VABKUERZUNG = ['e', 'v', 'statt-v', 'r', 'k', 'fehlt'];
function typeAbkuerzen(type, infotext) {
    let sa = infotext.includes('SELBST. ARB.');
    let index = VARTEN.findIndex(art => art === type);
    if (index === -1 && !sa)
        return type;
    return sa ? 'e (v)' : VABKUERZUNG[index];
}
exports.typeAbkuerzen = typeAbkuerzen;
