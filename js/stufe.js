function getStufen() {
    $.ajax({
        url: "https://www.fosefx.de/betterGymWue/mirror.php?url=http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/frames/navbar.htm",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + Gkey);
        },
        type: "GET",
        success: function (r) {
            var a = r.split("var classes = ")[1].split(";")[0].replace(/(")|(\[)|(])|( )/g, '').split(",");
            a.forEach(function (t) {
                $("#stufe").append("<option>" + t +"</option>");
            });
        },
        error: function (r) {
            alert("Serververbindung fehlgeschlagen");
        }
    });
}