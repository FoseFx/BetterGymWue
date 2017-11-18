$(document).ready(function () {
    var a = false;
    document.cookie.split(";").forEach(function (t) {if(t == "a=true") a = true;});
    stopSpinner();
    if(!a) showAGB();
    else moveInLogin();
});

function stopSpinner() {
    $("#spinner").css("opacity", "0");
    setTimeout(function () {
        $("#spinner").css("display", "none");
        $("#page-wraper").css("display", "flex");
        setTimeout(function () {
            $("#page-wraper").css("opacity", "1");
        }, 10);

    }, 200);

}
function startSpinner() {
    $("#page-wraper").css("opacity", "0");
    setTimeout(function () {
        $("#page-wraper").css("display", "none");
        $("#spinner").css("display", "flex");
        setTimeout(function () {
            $("#spinner").css("opacity", "1");
        },10);
    }, 200);
}

function showAGB() {
    $("#terms").css("display", "flex");
}

function moveInLogin() {
    setTimeout(function () {
        $("#login-wrapper").css("transform", "translate(0px,0)");
    }, 700);
}
function unAuth() {
    $("#login-wrapper").css("box-shadow", "0px 0px 12px 0px rgba(255,36,36,1)")
        .addClass("shake shake-constant");
    setTimeout(function () {
        $("#login-wrapper").removeClass("shake shake-constant");
    }, 100);
}
function Auth() {
    $("#login-wrapper").css("opacity", "0");
    setTimeout(function () {
        $("#login-wrapper").css("display", "none");
    }, 500);
}