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

function getKurse() {
    var week = getWeekOfYear(new Date());
    var url = "https://www.fosefx.de/betterGymWue/mirror.php?url=http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/" + "45" + "/c/c" + to5erString(GStufeid) + ".htm";
    console.log(url);
    $.ajax({
        url: url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + Gkey);
        },
        success: function (r) {
            evaKurse(r);
        },
        error: function (r) {
            alert("Serververbindung fehlgeschlagen");
        }
    });
}
function evaKurse(r) {
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

    $(main).children("tr").each(function (i) {
        var row = $(this);
        if(row.is("#pause")) return true;
        var stunde = [];

        if(row.html() === "") {
            row.remove();
            return true;
        }

        row.children("td").each(function (i) {
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
                    raum: raum
                };
                stunde.push(objz);
            }else{
                var fach = rowz.find("font").children("b").html();



                var objz = {
                    type: "kurs",
                    fach: fach,
                    isBig: isBig
                };

                stunde.push(objz);
            }
        });
        arr.push(stunde);
    });
    var final = [];
    for (var i = 0; i < arr.length; i++)if(arr[i].length !== 0) final.push(arr[i]);
    arr = final;
    console.log(arr);

}
function addKurs(kurs) {

}