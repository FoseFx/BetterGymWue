import {TtcontainerComponent} from "../ttcontainer.component";

export function evaVertretung(w, that: TtcontainerComponent){
  console.log("w", w);
  let VD  = undefined;
  for (let Vobj in w[1]){
    if (Vobj == that.baseService.myStufe) VD = w[1][Vobj];
  }
  if (!VD) return;
  let VDT = [];
  VD.forEach((v) => {
    if (v.date === that.readableDate) {
      if(v.fach == "---" && v.lehrer == "-----" && v.info.replace(" ", "") == "") return;
      else VDT.push(v);
    }
  });
  let relevant = [];
  VDT.forEach((row) => {
    if (row.date != that.readableDate) return;
    that.baseService.myKurse.forEach((val) => {
      if (val.fach == row.fach) relevant.push(row);
    });
    that.baseService.KlassenKurse.forEach((val) => {
      if (val == row.fach) relevant.push(row);
    });
    try{if(/^\s+$/.test(row.fach)) relevant.push(row);} catch (e){}
    if(row.fach == undefined) relevant.push(row);
  });


  try{
    that.info = that.info.concat(Array.from(w[0][0]));
  } catch (e){console.log(e.message);}

  that.VDStufe = VDT;
  that.VDMe = relevant;
  console.log("VDMe", that.VDMe);
  that.addVDtoDisplayArray();
}

function cmp(x, y) {
  return x > y ? 1 : (x < y ? -1 : 0);
}
