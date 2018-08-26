function evaKurse(html, stufe, tempTTs, kurse) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        var woche = (doc.querySelectorAll('font[size="3"][face="Arial"]')[1]).textContent.split(/(?:\d+\.){2}\d{4} /)[1][0].toLowerCase() === "a" ? 0 : 1;
        var wholeTable = doc.getElementsByTagName('tbody')[0];
        // remove header
        wholeTable.firstElementChild.remove();
        var data = [];
        var tri = 0;
        Array.from(wholeTable.children).forEach(function (tr) {
            if (tr.innerText === "") {
                // tr is Empty
                tr.remove(); // TODO, necessary?
                return;
            }
            if (tr.textContent.toLowerCase().includes('pause'))
                return;
            tri++;
            var stunde = [];
            Array.from(tr.children).forEach(function (td, tag) {
                if (tag === 0)
                    return; // Exclude number
                // Tag: 1: Mo, 2: Di, ...
                var doppelStunde = (td.getAttribute('rowspan') === "4");
                var info = Array.from(td.getElementsByTagName('tr'));
                //
                // Klassenstunde
                //
                if (info.length === 1) {
                    var spaltenRaw = Array.from(info[0].getElementsByTagName('font'));
                    var spalten = spaltenRaw.map(function (x) { return x.textContent.replace(/\n/g, ""); });
                    stunde.push({
                        type: 'klasse',
                        isBig: doppelStunde,
                        fach: spalten[0],
                        lehrer: spalten[1],
                        raum: spalten[2],
                        pos: [tri + 1, tag - 1] // [index + 1, 0:Mo; 1:Di ...]
                    });
                }
                else {
                    //
                    // Kursstunde
                    //
                    var fach_1 = td.getElementsByTagName('b')[0].textContent;
                    var raeume_1 = [];
                    info.forEach(function (infos, infoi) {
                        if (infoi === 0)
                            return;
                        var spaltenRaw = Array.from(infos.getElementsByTagName('font'));
                        var spalten = spaltenRaw.map(function (x) { return x.textContent.replace(/\n/g, ""); });
                        var title = spalten[0];
                        var lehrer = spalten[1];
                        var raum = spalten[2];
                        raeume_1.push({
                            kurs: title.toUpperCase(),
                            raum: raum.toUpperCase()
                        });
                        //
                        // test for existence in other week
                        //
                        var exists = false;
                        kurse[woche].kurse.forEach(function (kurs) {
                            if (fach_1 === kurs.fach)
                                exists = true;
                        });
                        var kurs = {
                            title: title,
                            fach: fach_1,
                            lehrer: lehrer
                        };
                        if (!exists)
                            kurse[woche].kurse.push(kurs);
                    }); // info
                    stunde.push({
                        type: 'kurs',
                        fach: fach_1,
                        isBig: doppelStunde,
                        raeume: raeume_1
                    });
                }
            }); // td
            data.push(stunde);
        }); // tr
        data = data.filter(function (stunde) { return stunde.length !== 0; });

        console.log('new DATA', JSON.parse(JSON.stringify(data)));

        var tt = { days: [[], [], [], [], []] };
        data.forEach(function (stundeE, stunde) {
            stundeE.forEach(function (timetableslot, tag) {
                var tts;
                // get a free timetable slot
                while (typeof tt.days[tag][stunde] !== "undefined")
                    stunde++;

                if(timetableslot.fach !== undefined){
                    // tts = JSON.parse(JSON.stringify(timetableslot));
                    tts = Object.assign({}, timetableslot);
                    delete tts.isBig;
                }
                // add to TT
                if(tts === undefined) tts = {};
                tt.days[tag][stunde] = tts;
                // two times in case of isBig
                if (timetableslot.isBig)
                    tt.days[tag][stunde + 1] = tts;
            });
        });
        // Add Pausen
        tt.days.forEach(function (day, i) {
            // @ts-ignore
            day.splice(6, 0, {});
            tt.days[i] = day.filter(e=>e !== undefined);
        });
        // Add tt to TempTTs
        var setYet = false;
        tempTTs.forEach(function (val) {
            if (val.stufe !== stufe)
                return;
            val.tt[woche] = tt;
            setYet = true;
        });
        if (!setYet)
            tempTTs.push({
                stufe: stufe,
                tt: (woche === 0) ? [tt] : [undefined, tt]
            });
    }