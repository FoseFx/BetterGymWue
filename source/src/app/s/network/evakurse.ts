export function evaKurse(r:string, ABWOCHE, stufe, that){
  let $ = that.$;
  let arr = [];
  let orig = $(r.replace(/\r?\n|\r/g, '').toUpperCase());
  ABWOCHE = orig.find("font");
  ABWOCHE = ABWOCHE[ABWOCHE.length - 1].innerText.split("- ")[1].split(" (")[0].split(" ")[1].toLowerCase();
  console.log(ABWOCHE);
  let what = (ABWOCHE === "a")? 0:1;
  let main = orig.children('table')[0];
  $(main).children('tbody').children('tr')[0].remove();
  main = $(main).children('tbody')[0];
  $(main).find('b').each(function () {
    if ($(this).html() === 'PAUSE') {
      $(this).parents().eq(6).attr('id', 'pause').html(' ');
    }
  });
  let subtractor = 0;
  $(main).children('tr').each((someindex, welcheRow) => {
    let row = $(welcheRow);
    if (row.is('#pause')) return;
    let stunde = [];
    if (row.html() === '') {
      subtractor++;
      row.remove();
      return;
    }
    row.children('td').each((i, idfk) => {
      let TAG = i;
      if (i === 0) return;
      let isBig = false;
      if ($(idfk).attr('rowspan') === '4') isBig = true;

      let data = $(idfk).children('table').children('tbody');
      let rowz = data.children('tr');

      if (rowz.length  === 1) {
        let vars = rowz.find('font');
        if (vars.length === 1) {
          if (vars.html() !== '') return;
        }
        let fach = $(vars[0]).children('b').html();
        let lehrer = $(vars[1]).html();
        let raum = $(vars[2]).html();
        let objz = {
          type: 'klasse',
          isBig: isBig,
          fach: fach,
          lehrer: lehrer,
          raum: raum,
          pos: [welcheRow - subtractor + 1, TAG - 1]
        };
        stunde.push(objz);
      } else {
        let fach = rowz.find('font').children('b').html();
        let raeume = [];
        rowz.each((i, jndjnsjfs) => {
          if (i === 0) return;
          let ffach = $($(jndjnsjfs).children('td')[0]).children('font').html();
          let lehrer = $($(jndjnsjfs).children('td')[1]).children('font').html();
          let raum = $($(jndjnsjfs).children('td')[2]).children('font').html();

          raeume.push({kurs: ffach, raum: raum});

          let kurs = {
            title: fach,
            fach: ffach,
            lehrer: lehrer
          };
          let orig = null;


          for(let i = 0; i < that._kurse[what].kurse.length; i++)
            if(kurs.fach === that._kurse[what].kurse[i].fach) orig = i;
          if(orig === null){
            that._kurse[what].kurse.push({
              fach: kurs.fach,
              lehrer: kurs.lehrer,
              title: kurs.title
            });
          }
        });
        let objz = {
          type: 'kurs',
          fach: fach,
          isBig: isBig,
          raeume: raeume
        };
        stunde.push(objz);
      }
    });
    arr.push(stunde);
  });

  let final = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length !== 0) {
      let tval = true;
      if (tval) final.push(arr[i]);
    }
  }

  let tt = { days: [[], [], [], [], []]};
  final.forEach(function (stunden, eins) {

    stunden.forEach(function (tage, zwei) {
      let back = {};
      let tag = zwei;
      let stunde = eins;
      let ob = tt.days[tag][stunde];

      while (typeof ob != 'undefined') {
        stunde++;
        ob = tt.days[tag][stunde];
      }
      if (tage.fach !== undefined || tage.fach === 'klasse') {
        if (tage.type === 'klasse') {
          back = {
            type: tage.type,
            fach: tage.fach,
            lehrer: tage.lehrer,
            raum: tage.raum
          };
        } else if (tage.type === 'kurs') {
          back = {
            type: tage.type,
            fach: tage.fach,
            raeume: tage.raeume
          };
        }
      }
      tt.days[tag][stunde] = back;
      if (tage.isBig) tt.days[tag][stunde + 1] = back;
    });
  });
  for(let i = 0; i < 5; i++){
    tt.days[i].splice(6, 0, {});
  }
  let b = true;
  that.tempTTs.forEach((val, i) => {
    if (val.stufe === stufe) {
      val.tt[what] = (tt);
      b = false;
    }
  });
  if (b)
    that.tempTTs.push({
      stufe: stufe,
      tt: (what === 0) ? [tt] : [, tt]
    });
}
