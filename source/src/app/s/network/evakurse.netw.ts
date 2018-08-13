import {KurseType, TempTTs} from "../../Classes";

export function evaKurse(html: string, stufe:string, tempTTs: TempTTs, kurse: KurseType) {
  const parser = new DOMParser();
  let doc = parser.parseFromString(html, "text/html");
  let woche = (<HTMLElement>(
    doc.querySelectorAll('font[size="3"][face="Arial"]')[1]
    )
  ).innerText.split(/(?:\d+\.){2}\d{4} /)[1][0].toLowerCase() === "a"? 0: 1;

}
