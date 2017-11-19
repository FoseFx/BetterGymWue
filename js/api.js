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
    console.log(r);
}