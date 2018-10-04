export class VertretungsReihe{
  type: string;
  date: string;
  fach: string;
  oldRaum: string;
  newRaum: string;
  info: string;
  stufe?:string;
  stunde?:string;
  nd?:number;
  lehrer?: string;
}
export type VertretungsEva = [
  string,
  VertretungsEvaPayload
]
export type VertretungsEvaPayload = [
  {
    stufe: string,
    cntnd: VertretungsReihe[]
  }[],
  string[]
]

export type VertretungsDaten = [
  any[],
  {
    [key: string]: VertretungsReihe[]
  }
];

export class Kurs {
  title: string;
  fach: string;
  lehrer: string;
  selected?: boolean;
  ph?: boolean
}

export class TimeTable {
  date: Date;
  tag: TimeTableSlot[];
}

export class TimeTableSlot {
  type: string;
  fach: string;
  lehrer?: string;
  raeume?: {kurs: string, raum: string}[];
  raum?: string;
  pos? : any[];
  isBig?: boolean;
  tag? : number;
  isUsed?: boolean;
}


export type DisplayArray = {
  fach: string,
  lehrer: string,
  raum: string,
  vert?: string,
  nd?: number,
  isFreistunde?: boolean,
  VD?: VertretungsReihe
}[];

export type TTinTempTT = { days: any[][]}[];
export type TempTT = { stufe: string, tt: TTinTempTT };
export type TempTTs = TempTT[];

export type TT = {days: TimeTableSlot[][]}[];

export type KurseType = {kurse: Kurs[]}[]; // length = 2, A: 0, B: 1

export class NetworkError {statusText: string; err: any; }
