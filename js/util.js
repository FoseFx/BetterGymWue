$(document).ready(function () {
    var a = false;
    document.cookie.split(";").forEach(function (t) {if(t == "a=true") a = true;});
    stopSpinner();
    if(!a) showAGB();
    if(a) checkLoginCookie();
});

function stopSpinner() {
    $("#spinner").css("opacity", "0");
    setTimeout(function () {
        $("#spinner").css("display", "none");
        $("#page-wraper").css("display", "block");
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

function checkLoginCookie() {
    var c = checkCookie("key");
    if(c !== null)
        login(c, 1);
    else moveInLogin();
}

function checkStufeCookie() {
    startSpinner();
    var r = checkCookie("stufe");
    if(r !== null){
        stufe = r;
    }else getStufen();

    stopSpinner();
    $(".nointeract").removeClass("nointeract");
}

function moveInLogin() {
    setTimeout(function () {
        $("#login-wrapper").css("transform", "translate(-50%,-50%)");
    }, 700);
}

function unAuth() {
    $("#login-wrapper").css("box-shadow", "0px 0px 12px 0px rgba(255,36,36,1)")
        .addClass("shake shake-constant");
    setTimeout(function () {
        $("#login-wrapper").removeClass("shake shake-constant");
        $("#psw").val("");
    }, 200);
}

function Auth(key) {
    document.cookie = "key=" + key + ";expires=Fri, 31 Dec 9999 23:59:59 GMT";
    Gkey = key;

    $("#login-wrapper").css("opacity", "0");
    setTimeout(function () {
        $("#login-wrapper").css("display", "none");
        $("#stufe-wrapper").removeClass("hidden").css("transform", "translate(-50%, -50%)");
        checkStufeCookie();
    }, 500);
}

function checkCookie(c) {
    var r = null;
    document.cookie.split(";").forEach(function (t) {var l = t.split("="); if(l[0].replace(/\s/g, '') === c) r = l[1]});
    return r;
}

function moveOutLogin() {
    $("#stufe-wrapper").css("transform", "translate(-1000%, -50%)");
    setTimeout(function () {
        $("#login-wrapper").hide();
    }, 500);
}