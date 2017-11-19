const CLICK = 0;

$("#termsaccept").on("click", function (e) {
    e.preventDefault();
    document.cookie = "a=true;expires=Fri, 31 Dec 9999 23:59:59 GMT";
    $("#terms").css("display", "none");
    checkLoginCookie();
});

$("#login-form").submit(function (e) {
    e.preventDefault();
    var key = btoa($("#select").val() + ":" + $("#psw").val());

    login(key, CLICK);
});

function login(key, i) {
    $.ajax({
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Basic " + key);
        },
        url: 'https://www.fosefx.de/betterGymWue/mirror.php?url=gymnasium-wuerselen.de/untis/Schueler-Stundenplan/45/c/c00020.htm',
        success: function (r) {
            Auth(key);
        },
        error: function (e, r, t) {
            if(i === CLICK){
                unAuth();
            }else {
                moveInLogin();
                setTimeout(function () {
                    unAuth();
                }, 1500)
            }
        }
    });
}

$("#stufe-form").submit(function (e) {
    e.preventDefault();
    if($("#stufe").val() !== ""){
        moveOutLogin();
        Gstufe = $("#stufe").val();
        for(var i = 0; i < GStufeA.length; i++){
            if(GStufeA[i] === Gstufe) GStufeid = i + 1;
        }
        document.cookie = "stufe="+Gstufe+EXP;
        document.cookie = "stufeid="+GStufeid+EXP;
    }
});