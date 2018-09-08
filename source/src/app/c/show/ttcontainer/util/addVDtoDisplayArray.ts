import {VertretungsReihe} from "../../../../Classes";

export function addVDtoDisplayArray(VDMe, displayArray){
  if(VDMe.length === 0) return;
  let filteredList: VertretungsReihe[] = VDMe.filter((me: VertretungsReihe) => // filter alle nicht meine klausuren und reduziert auf !nd
    (me.type.toLowerCase() !== "k" || (me.type.toLowerCase() === "k" && isMyKlausur(me)) ) && !me.nd
  );

  if(filteredList.length === 0) return;

  let stunden: VertretungsReihe[] = [];
  let order = ["k", "e (v)", "v", "r"];
  // set stunden in order
  filteredList.forEach(function (vr: VertretungsReihe) {
    if(!stunden[+vr.stunde - 1])
      stunden[+vr.stunde - 1] = vr;
    else {
      let oldI = order.findIndex((s: string) => stunden[+vr.stunde - 1].type.toLowerCase() === s);
      let newI = order.findIndex((s: string) => vr.type.toLowerCase() === s);
      if( oldI >= newI ) stunden[+vr.stunde - 1] = vr;
    }
  });

  console.log("stunden", stunden);

  // map VD of stunden to displayArray
  for (let i = 0; i < displayArray.length; i++){
    if (!!displayArray[i])
    // @ts-ignore
      displayArray[i].VD = !!stunden[i]? stunden[i]: {};
  }
  console.log("displayArray", displayArray);
}

function isMyKlausur(me: VertretungsReihe):boolean{
  if(me.type.toLowerCase() !== "k") return false;
  let info = me.info;
  let val = false;
  this.baseService.myKurse.forEach((kurs) => {
    if(info.indexOf(kurs.fach.toUpperCase()) != -1) val = true;
  });
  return val;
}
