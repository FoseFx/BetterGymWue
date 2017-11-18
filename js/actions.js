$("#termsaccept").on("click", function (e) {
    e.preventDefault();
    document.cookie = "a=true;expires=Fri, 31 Dec 9999 23:59:59 GMT";
    $("#terms").css("display", "none");
    moveInLogin();
});

$("#login-form").submit(function (e) {
    e.preventDefault();
    var key = btoa($("#select").val() + ":" + $("#psw").val());
    console.log(key);
    $.ajax({
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Basic " + key);
        },
        url: 'https://www.fosefx.de/betterGymWue/mirror.php?url=gymnasium-wuerselen.de/untis/Schueler-Stundenplan/45/c/c00020.htm',
        success: function (r) {
            onTrue(key);
        },
        error: function (e, r, t) {
            console.log(e.getAllResponseHeaders());
            unAuth();
        }
    });

});

function onTrue(key) {
    document.cookie = "key=" + key + ";expires=Fri, 31 Dec 9999 23:59:59 GMT";
    Auth();
}