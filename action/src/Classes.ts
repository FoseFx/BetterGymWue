//
// Classes, Types and Interfaces
//
import {Kurs, TempTT} from "../../source/src/app/Classes";

export interface Creds {
    u: string,
    p: string,
    l?: { u: string, p: string }
}

export interface userDBResult {
    exists: boolean;
    creds: Creds;
    stufe: string;
    stufeid: number;
    kurse: Kurs[];
    aliases: string[];
    klasse: string[];
}

export class Stundenplan {
    plan: TempTT;
    availKurse: Kurs[];
}

export type PersoPlan = Woche[];        // A/B
export type Woche = Stunden[];          // Tage
export type Stunden = Stunde[]          // Stunde

export class Stunde {
    fach: string;
    readAlias?: string
}

export class StundenplanDBResult {
    ttl: number; // UTC value
    plan: TempTT;
    availKurse: Kurs[];
    credsHash: string // generateHashedCreds()
}

//                        Kurs|Klasse, alias,  KursTitle
export type mergedAlias = [string, string, string?];

export interface Payload {
    plan?: PersoPlan;
    mergedAliases: mergedAlias[];
    creds: Creds;
    stufe: string;
    stufeid: number;
}