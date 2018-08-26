    function evaKurseOld(r, ABWOCHE, stufe, tempTTs, _kurse) {
        var arr = [];
        var orig = $(r.replace(/\r?\n|\r/g, '').toUpperCase());
        ABWOCHE = orig.find("font");
        ABWOCHE = ABWOCHE[ABWOCHE.length - 1].innerText.split("- ")[1].split(" (")[0].split(" ")[1].toLowerCase();
        var what = (ABWOCHE === "a") ? 0 : 1;
        var main = orig.children('table')[0];
        $(main).children('tbody').children('tr')[0].remove();
        main = $(main).children('tbody')[0];
        $(main).find('b').each(function () {
            if ($(this).html() === 'PAUSE') {
                $(this).parents().eq(6).attr('id', 'pause').html(' ');
            }
        });
        var subtractor = 0;
        $(main).children('tr').each(function (someindex, welcheRow) {
            var row = $(welcheRow);
            if (row.is('#pause'))
                return;
            var stunde = [];
            if (row.html() === '') {
                subtractor++;
                row.remove();
                return;
            }
            row.children('td').each(function (i, idfk) {
                var TAG = i;
                if (i === 0)
                    return;
                var isBig = false;
                if ($(idfk).attr('rowspan') === '4')
                    isBig = true;
                var data = $(idfk).children('table').children('tbody');
                var rowz = data.children('tr');
                if (rowz.length === 1) {
                    var vars = rowz.find('font');
                    if (vars.length === 1) {
                        if (vars.html() !== '')
                            return;
                    }
                    var fach = $(vars[0]).children('b').html();
                    var lehrer = $(vars[1]).html();
                    var raum = $(vars[2]).html();
                    var objz = {
                        type: 'klasse',
                        isBig: isBig,
                        fach: fach,
                        lehrer: lehrer,
                        raum: raum,
                        pos: [welcheRow - subtractor + 1, TAG - 1]
                    };
                    stunde.push(objz);
                }
                else {
                    var fach_1 = rowz.find('font').children('b').html();
                    var raeume_1 = [];
                    rowz.each(function (i, jndjnsjfs) {
                        if (i === 0)
                            return;
                        var ffach = $($(jndjnsjfs).children('td')[0]).children('font').html();
                        var lehrer = $($(jndjnsjfs).children('td')[1]).children('font').html();
                        var raum = $($(jndjnsjfs).children('td')[2]).children('font').html();
                        raeume_1.push({ kurs: ffach, raum: raum });
                        var kurs = {
                            title: fach_1,
                            fach: ffach,
                            lehrer: lehrer
                        };
                        var orig = null;
                        for (var i_1 = 0; i_1 < _kurse[what].kurse.length; i_1++)
                            if (kurs.fach === _kurse[what].kurse[i_1].fach)
                                orig = i_1;
                        if (orig === null) {
                            _kurse[what].kurse.push({
                                fach: kurs.fach,
                                lehrer: kurs.lehrer,
                                title: kurs.title
                            });
                        }
                    });
                    var objz = {
                        type: 'kurs',
                        fach: fach_1,
                        isBig: isBig,
                        raeume: raeume_1
                    };
                    stunde.push(objz);
                }
            });
            arr.push(stunde);
        });
        var final = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].length !== 0) {
                var tval = true;
                if (tval)
                    final.push(arr[i]);
            }
        }

        var tt = { days: [[], [], [], [], []] };
        final.forEach(function (stunden, eins) {
            stunden.forEach(function (tage, zwei) {
                // @ts-ignore
                var back = {};
                var tag = zwei;
                var stunde = eins;
                var ob = tt.days[tag][stunde];
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
                    }
                    else if (tage.type === 'kurs') {
                        back = {
                            type: tage.type,
                            fach: tage.fach,
                            raeume: tage.raeume
                        };
                    }
                }
                tt.days[tag][stunde] = back;
                if (tage.isBig)
                    tt.days[tag][stunde + 1] = back;
            });
        });
        for (var i = 0; i < 5; i++) {
            // @ts-ignore
            tt.days[i].splice(6, 0, {});
        }
        var b = true;
        tempTTs.forEach(function (val, i) {
            if (val.stufe === stufe) {
                val.tt[what] = (tt);
                b = false;
            }
        });
        if (b)
            tempTTs.push({
                stufe: stufe,
                tt: (what === 0) ? [tt] : [, tt]
            });
    }