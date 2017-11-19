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

    var url = "https://www.fosefx.de/betterGymWue/mirror.php?url=http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/" + getWeekOfYear(new Date()) + "/c/c" + to5erString(GStufeid) + ".htm";
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

    var orig = $(r.replace(/\r?\n|\r/g, ''));
     orig.children("table").each(function (t) {
         if ($(this).children("tbody").children("tr").children("td").children("font").html() === "") $(this).remove();
    });
    var main = orig.children("table");
    $(main).children("tbody").children("tr")[0].remove();


    $(main).children("tbody").children("tr").each(function () {

        $(this).children("td").each(function () {
            var val = $(this).children("table").children("tbody").children("tr").children("td").children("font").children("b").html();
            if(/^\d+$/.test(val)) $(this).html("");
        });

        if ($(this).html() === "") $(this).remove();
        if($(this).children().length === 1) $(this).remove();

    });


    console.log($(main).children("tbody").html());

}