export function evaVertretung(w, that){
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

  VDT.sort(function (a, b) {
    return cmp(a.stunde[0], b.stunde[0]) || cmp(a.kurs, b.kurs) ||cmp(a.type, b.type);
  });


  try{
    that.info = that.info.concat(Array.from(w[0][0]));
  } catch (e){console.log(e.message);}

  that.VDStufe = VDT;
  that.VDMe = relevant;
  console.log(that.VDMe);
  that.addVDtoDisplayArray();
}

function cmp(x, y) {
  return x > y ? 1 : (x < y ? -1 : 0);
}
