import {VertretungsReihe} from "../../../../../Classes";

export function addVDtoDisplayArray(VDMe, displayArray, that){
	const order = ["k", "eva", "e (v)", "e", "v", "r"];
	if(VDMe.length === 0) return;
  let filteredList: VertretungsReihe[] = VDMe.filter((me: VertretungsReihe) => // filter alle nicht meine klausuren und reduziert auf !nd
    (
    	me.type.toLowerCase() !== "k"
				|| (
					me.type.toLowerCase() === "k"
						&& isMyKlausur(me, that)
					)
		)
			&& !me.nd
			&& order.findIndex((s) => s===me.type) !== -1
  );
  console.log("been here", filteredList);
  if(filteredList.length === 0) return;

  let stunden: VertretungsReihe[] = [];
  // set stunden in order
  filteredList.forEach(function (vr: VertretungsReihe) {
    if(!stunden[+vr.stunde - 1]){
			stunden[+vr.stunde - 1] = vr;
		}
    else {
      let oldI = order.findIndex((s: string) => stunden[+vr.stunde - 1].type.toLowerCase() === s);
      let newI = order.findIndex((s: string) => vr.type.toLowerCase() === s);
      if( oldI >= newI && oldI !== -1 && newI !== -1) stunden[+vr.stunde - 1] = vr;
    }
  });

  console.log("stunden", stunden);

  // map VD of stunden to displayArray
  for (let i = 0; i < displayArray.length; i++){
    if (!!displayArray[i])
    // @ts-ignore
      displayArray[i].VD = !!stunden[i]? stunden[i]: {};
  }
  console.log("displayArray new", displayArray);
}

function isMyKlausur(me: VertretungsReihe, that):boolean{
  if(me.type.toLowerCase() !== "k") return false;
  let info = me.info;
  let val = false;
  that.baseService.myKurse.forEach((kurs) => {
    if(info.indexOf(kurs.fach.toUpperCase()) != -1) val = true;
  });
  return val;
}
