import {VertretungsEva, VertretungsReihe} from "../../../Classes";

export function evaVD(ret: string, lehrer?:boolean):VertretungsEva {
  lehrer = lehrer || false;
  // .toLowerCase
  const SACONDITION = ['selbstständiges arbeiten', "selbständiges arbeiten", "selbstständies arbeiten", "selbstäniges arbeiten", "eigenständiges arbeiten"];
  const VARTEN =      ['entfall', 'vertretung', 'stattvertretung', 'raumvtr', 'klausur', "absenz"];
  const VABKUERZUNG = ['e',       'v',            'statt-v',          'r',        'k',       'fehlt'];
  let stufen = [];

  function typeAbkuerzen(type:string, infotext:string):string {
    let sa = infotext.includes('SELBST. ARB.');
    let index = VARTEN.findIndex(art=>art===type);
    if(index === -1 && !sa) return type;
    return sa? 'e (v)' : VABKUERZUNG[index];
  }

  let returnArray:VertretungsEva = [undefined, undefined];
  const parser = new DOMParser();
  const doc = parser.parseFromString(ret, "text/html");

  // return next file
  // @ts-ignore
  returnArray[0] = doc.querySelector('meta[http-equiv="refresh"]').content.split('URL=')[1];

  Array.from(doc.querySelectorAll('tr.list.odd,tr.list.even')).forEach(function (zeile) {
    if(zeile.children.length === 0) return;
    let children: HTMLElement[] = <any>zeile.children;

    const firstChild:HTMLElement = <HTMLElement>zeile.firstChild;

    // 'inline_header' is the classname of the td that indicates a new Stufe
    if(/( |^)inline_header( |$)/.test(firstChild.className)) {
      stufen.push({
        stufe: firstChild.innerText.split(' ')[0],
        cntnd: []
      });
      return;
    }

    let date = "";
    let oldroom = !lehrer? children[4].innerText.replace(/\s/g, ""): '?';
    let klasse;
    let stundenstr = children[1].innerText.replace(/\s/g, "");
    let stunden = stundenstr.split("-"); // [1, 2]
    let fach = children[lehrer?3:2].innerText;
    let type = children[lehrer? 6:3].innerText.replace(/\W/g, "").toLowerCase();
    let newroom = children[lehrer?4:5].innerText.replace(/\s/g, "");
    let infotext = children[lehrer?7:6].innerText.replace('\u00a0', '');

    SACONDITION.forEach(cond => {
      infotext = infotext.toUpperCase().replace(cond.toUpperCase(), 'SELBST. ARB.');
    });

    infotext = infotext.replace('AUFGABEN', 'AUFG.');
    type = typeAbkuerzen(type, infotext);

    if (!lehrer){
      date = children[0].innerText.replace(/\s/g, "");
    }else{
      (<HTMLElement>(doc.getElementsByClassName('mon_title')[0])).innerText.split('.').forEach((value, index, array) => {
        if(index === array.length -1) return;
        date += value.replace(" ", "") + ".";
      });
      klasse = children[2].innerText.replace(/\s/g, "");
    }
    let pushObj:VertretungsReihe = {
      type: type,
      date: date,
      fach: fach,
      oldRaum: oldroom,
      newRaum: newroom,
      info: infotext,
    };
    if(lehrer){
      pushObj.stufe = klasse;
    }
    stunden.forEach((stunde, i, array) => {
      let obj = Object.assign({}, pushObj);
      obj.stunde = stunde;
      stufen[stufen.length - 1].cntnd.push(obj);

      if (i === (array.length - 1)) {
        let alls = "";
        array.forEach((ts, ind) => {
          alls += ts + (ind<array.length-1?" - ":"");
        });
        obj = Object.assign({}, pushObj);
        obj.stunde = alls;
        obj.nd = 1;
        stufen[stufen.length - 1].cntnd.push(obj);
      }
    });
  });

  let infoBox = [];
  Array.from(doc.querySelectorAll('tr.info')).forEach(function (inforow, i) {
    Array.from(inforow.children).forEach((child:HTMLElement)=>{
      if(child.tagName.toLowerCase() === "th" ||
        child.parentElement.childElementCount !== 1 &&
        i === 1){
        infoBox.push('<b>' + child.innerText + '</b>')
      }else{
        infoBox.push(child.innerText);
      }
    })
  });
  returnArray[1] = [stufen, infoBox];
  return returnArray;
}
