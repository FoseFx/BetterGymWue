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
export class Kurse {
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
}


export type DisplayArray = {
  fach: string,
  lehrer: string,
  raum: string,
  vert?: string,
  nd?: number,
  isFreistunde?: boolean
}[];
