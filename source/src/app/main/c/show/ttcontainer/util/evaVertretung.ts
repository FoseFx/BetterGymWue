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

  // SORT
  VDT.sort((a, b) => {
    return cmp(a.fach, b.fach) || cmp(a.stunde[0], b.stunde[1]) || cmp(a.type, b.type);
  });



  let obj = {};
  VDT.forEach((v, i) => {
    if(i === 0) obj[v.fach] = [v];
    else if(v.fach == VDT[i-1].fach) obj[v.fach].push(v);
    else obj[v.fach] = [v];
  });
  console.log(obj);

  let final = [];
  Object.keys(obj).sort((a, b) => {
    return obj[a][0].stunde[0] - obj[b][0].stunde[0];
  }).forEach((v) => {
    obj[v].forEach((vv) => {final.push(vv)});
  });

  let arrEmpty = [];
  let arrRest = [];
  final.forEach(v=>{
    if(v.fach.trim() === "") arrEmpty.push(v);
    else arrRest.push(v);
  });
  VDT = arrEmpty.concat(arrRest);
  // /SORT

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
