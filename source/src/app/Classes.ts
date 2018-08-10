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
}
export type VertretungsEva = [
  string,
  [
    {
      stufe: string,
      cntnd: VertretungsReihe[]
    }[],
    string[]
  ]
]
export class Kurse {
  title: string;
  fach: string;
  lehrer: string;
  selected?: boolean;
  ph?: boolean
}
