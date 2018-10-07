"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
function evaKurse(html, stufe, tempTTs, kurse) {
    var dom = new JSDOM(html);
    var doc = dom.window.document;
    var woche = (doc.querySelectorAll('font[size="3"][face="Arial"]')[1]).textContent.split(/(?:\d+\.){2}\d{4} /)[1][0].toLowerCase() === "a" ? 0 : 1;
    var wholeTable = doc.getElementsByTagName('tbody')[0];
    // remove header
    wholeTable.firstChild.remove();
    var data = [];
    var tri = 0;
    Array.from(wholeTable.children).forEach(function (tr) {
        if (tr.textContent.trim() === "") {
            // tr is Empty
            return;
        }
        tri++;
        var stunde = [];
        Array.from(tr.children).forEach(function (td, tag) {
            if (tag === 0)
                return; // Exclude number
            // Tag: 1: Mo, 2: Di, ...
            if (/^\npause\n/i.test(td.textContent) || td.textContent === "") {
                // @ts-ignore
                stunde.push({ isUsed: true });
                return;
            }
            var doppelStunde = (td.getAttribute('rowspan') === "4");
            var info = Array.from(td.getElementsByTagName('tr'));
            var isUsed = false;
            if (!doppelStunde) {
                var indexOfFirstSmallSlotBefore = data[data.length - 1].findIndex(function (e) { return !e.isBig && !e.isUsed; });
                tag = indexOfFirstSmallSlotBefore === -1 ? tag : indexOfFirstSmallSlotBefore + 1;
                if (indexOfFirstSmallSlotBefore !== -1) {
                    data[data.length - 1][indexOfFirstSmallSlotBefore].isUsed = true;
                    isUsed = true;
                }
                // +1 to counter following -1, which is needed because of the exclusion
            }
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
                    tag: tag - 1,
                    isUsed: isUsed
                });
            }
            else {
                //
                // Kursstunde
                //
                // GK01, ...
                var title_1 = td.getElementsByTagName('b')[0].textContent;
                var raeume_1 = [];
                info.forEach(function (infos, infoi) {
                    if (infoi === 0)
                        return;
                    var spaltenRaw = Array.from(infos.getElementsByTagName('font'));
                    var spalten = spaltenRaw.map(function (x) { return x.textContent.replace(/\n/g, ""); });
                    var fach = spalten[0]; // GE3, E1, ...
                    var lehrer = spalten[1];
                    var raum = spalten[2];
                    raeume_1.push({
                        kurs: fach,
                        raum: raum
                    });
                    //
                    // test for existence in other week
                    //
                    var exists = false;
                    kurse[woche].kurse.forEach(function (kurs) {
                        if (fach === kurs.fach)
                            exists = true;
                    });
                    if (!exists)
                        kurse[woche].kurse.push({
                            title: title_1,
                            fach: fach,
                            lehrer: lehrer
                        });
                }); // info
                stunde.push({
                    type: 'kurs',
                    fach: title_1,
                    isBig: doppelStunde,
                    raeume: raeume_1,
                    tag: tag - 1,
                    isUsed: isUsed
                });
            }
        }); // td
        if (stunde.length !== 0)
            data.push(stunde);
    }); // tr
    umdrehen(data, tempTTs, woche, stufe);
}
exports.evaKurse = evaKurse;
function umdrehen(data, tempTTs, woche, stufe) {
    var tt = { days: [[], [], [], [], []] };
    data.forEach(function (stundeE, stunde) {
        stundeE.forEach(function (timetableslot, untrustedtag) {
            var tts;
            var tag = timetableslot.tag;
            tag = (tag === undefined || tag === -1) ? untrustedtag : tag;
            // get a free timetable slot
            while (typeof tt.days[tag][stunde] !== "undefined") {
                stunde++;
            }
            if (timetableslot.fach !== undefined) {
                tts = Object.assign({}, timetableslot);
                delete tts.isBig;
            }
            // add to TT
            // @ts-ignore
            if (tts === undefined)
                tts = {};
            tt.days[tag][stunde] = tts;
            // two times in case of isBig
            if (timetableslot.isBig)
                tt.days[tag][stunde + 1] = tts;
        });
    });
    tt.days.forEach(function (day, i) {
        var length = tt.days[i].length;
        for (var sub = 0; sub < length; sub++) {
            if (!tt.days[i][length - sub])
                delete tt.days[i][length - sub];
            else if (!tt.days[i][length - sub].type)
                delete tt.days[i][length - sub];
            else
                break;
        }
        // Pause vor 10/11 löschen
        if (tt.days[i][9])
            if (!tt.days[i][9].type)
                delete tt.days[i][9];
        tt.days[i] = day.filter(function (e) { return e !== undefined; });
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
