function getStufen() {
    $.ajax({
        url: "https://www.fosefx.de/betterGymWue/mirror.php?url=http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/frames/navbar.htm",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + Gkey);
        },
        type: "GET",
        success: function (r) {
            var a = r.split("var classes = ")[1].split(";")[0].replace(/(")|(\[)|(])|( )/g, '').split(",");
            GStufeA = a;
            a.forEach(function (t) {
                $("#stufe").append("<option>" + t +"</option>");
            });
        },
        error: function (r) {
            alert("Serververbindung fehlgeschlagen");
        }
    });
}

function getKurse(woche) {
    var week = getWeekOfYear(new Date());

    if(woche === "a") week = "46";
    if(woche === "b") week = "45";

    var url = "https://www.fosefx.de/betterGymWue/mirror.php?url=http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/" + week + "/c/c" + to5erString(GStufeid) + ".htm";
    console.log(url);
    $.ajax({
        url: url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + Gkey);
        },
        success: function (r) {
            evaKurse(r, woche);
        },
        error: function (r) {
            alert("Serververbindung fehlgeschlagen");
        }
    });
}
function evaKurse(r, ABwoche) {
    var arr = [];
    var orig = $(r.replace(/\r?\n|\r/g, '').toUpperCase());

    var main = orig.children("table")[0];

    $(main).children("tbody").children("tr")[0].remove();
    main = $(main).children("tbody")[0];

    $(main).find("b").each(function () {
        if ($(this).html() === "PAUSE") {
            $(this).parents().eq(6).attr("id", "pause").html(" ");
        }
    });
    var subtractor = 1;
    $(main).children("tr").each(function (welcheRow) {
        var row = $(this);
        if(row.is("#pause")) return true;
        var stunde = [];

        if(row.html() === "") {
            subtractor++;
            row.remove();
            return true;
        }

        row.children("td").each(function (i) {
            var TAG = i;
            if(i === 0) return true;
            var isBig = false;
            if($(this).attr("rowspan") === "4") isBig = true;

            var data = $(this).children("table").children("tbody");
            var rowz = data.children("tr");

            if(rowz.length  === 1){
                var vars = rowz.find("font");
                if(vars.length === 1) {
                    if(vars.html() !== "") return true;
                }
                var fach = $(vars[0]).children("b").html();
                var lehrer = $(vars[1]).html();
                var raum = $(vars[2]).html();
                var objz = {
                    type: "klasse",
                    isBig: isBig,
                    fach: fach,
                    lehrer: lehrer,
                    raum: raum,
                    pos: [welcheRow - subtractor + 1, TAG - 1]
                };
                stunde.push(objz);
            }else{
                var fach = rowz.find("font").children("b").html();

                rowz.each(function (i) {
                    if(i === 0) return true;
                    var ffach = $($(this).children("td")[0]).children("font").html();
                    var lehrer = $($(this).children("td")[1]).children("font").html();
                    var raum = $($(this).children("td")[2]).children("font").html();

                    addKurs({
                        title: fach,
                        fach: ffach,
                        lehrer: lehrer,
                        pos: [welcheRow, TAG - 1],
                        raum: raum
                    }, ABwoche);
                });
                var objz = {
                    type: "kurs",
                    fach: fach,
                    isBig: isBig,
                    pos: [welcheRow - subtractor + 1, TAG - 1]
                };
                stunde.push(objz);
            }
        });
        arr.push(stunde);
    });
    var final = [];

    for (var i = 0; i < arr.length; i++){
        if(arr[i].length !== 0){
            final.push(arr[i]);
            var global = (ABwoche === "a")? 0:1;

            for(var ii = 0; ii < GKURSE[global].kurse.length; ii++)
                for(var iii = 0; iii< GKURSE[global].kurse[ii].raeume.length; iii++)
                    if(GKURSE[global].kurse[ii].raeume[iii].pos[0] === i) GKURSE[global].kurse[ii].raeume[iii].pos[0] = final.length - 1;
        }
    }

    var tt = { days: [[],[],[],[],[]]};


    final.forEach(function (stunden) {
        stunden.forEach(function (tage) {
            var back = {};
            var tag = tage.pos[1];
            var stunde = tage.pos[0];
            if(tt.days[tag][stunde] !== undefined) return;

            if(tage.fach !== undefined) {
                if(tage.type === "klasse"){
                    back = {
                        type: tage.type,
                        fach: tage.fach,
                        lehrer: tage.lehrer,
                        raum: tage.raum
                    };
                }else if(tage.type === "kurs"){
                    back = {
                        type: tage.type,
                        fach: tage.fach
                    };
                }
            }
            tt.days[tage.pos[1]][tage.pos[0]] = back;
            if(tage.isBig) tt.days[tage.pos[1]][tage.pos[0] + 1] = back;
        });
    });

    //PAUSEN FÜllen
    for(var i = 0; i < 5; i++){
        tt.days[i][6] = {};
    }

    GTimeTable[global] = tt;
    document.cookie = "tt=" + JSON.stringify(GTimeTable) + EXP;

    TTLoaded();

}
function addKurs(kurs, ABWOCHE) {
    var orig = null;

    var what = (ABWOCHE === "a")? 0:1;

    for(var i = 0; i < GKURSE[what].kurse.length; i++)
        if(kurs.fach === GKURSE[what].kurse[i].fach) orig = i;

    if(orig === null){

        GKURSE[what].kurse.push({
            raeume: [
                {
                    pos: kurs.pos,
                    raum: kurs.raum
                }
            ],
            fach: kurs.fach,
            lehrer: kurs.lehrer,
            title: kurs.title
        });
    }else{
        GKURSE[what].kurse[orig].raeume.push({
            pos: kurs.pos,
            raum: kurs.raum,
            title: kurs.title
        });
    }

}