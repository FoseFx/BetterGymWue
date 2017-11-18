$("#termsaccept").on("click", function (e) {
    e.preventDefault();
    document.cookie = "a=true;expires=Fri, 31 Dec 9999 23:59:59 GMT";
    $("#terms").css("display", "none");
    moveInLogin();
});

$("#login-form").submit(function (e) {
    e.preventDefault();

    $.ajax({
        type: "GET",
        headers:{"Authorization": "Basic " + btoa($("#select").val() + ":" + $("#psw").val())},
        url: 'https://www.fosefx.de/betterGymWue/mirror.php?url=https://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/45/c/c00020.htm',
        crossDomain: true,
        statusCode: {
            401: function (r) {
                unAuth();
            },
            304: function (r) {
                onTrue();
            },
            500: function (r) {
                console.log("500");
            },
            301: function (r) {
                console.log("301");
            }
        },
        success: function (r) {
            onTrue();
        },
        error: function (e, r, t) {
            console.log(e.getAllResponseHeaders());
            unAuth();
        }
    });

});

function onTrue() {
    document.cookie = "user=" + $("#select").val() + ";expires=Fri, 31 Dec 9999 23:59:59 GMT";
    document.cookie = "psw=" + $("#psw").val() + ";expires=Fri, 31 Dec 9999 23:59:59 GMT";
    Auth();
}