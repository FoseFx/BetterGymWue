$(document).ready(function () {
    var a = false;
    document.cookie.split(";").forEach(function (t) {if(t == "a=true") a = true;});
    stopSpinner();
    if(!a) showAGB();
    if(a) checkLoginCookie();

    GTimeTable = checkCookie("tt");

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
        Gstufe = r;
        GStufeid = checkCookie("stufeid");
        accessStufe();
    }else {
        moveInStufe();
        getStufen();
    }

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

function moveInStufe() {
    $("#stufe-wrapper").removeClass("hidden").css("transform", "translate(-50%, -50%)");
}

function Auth(key) {
    document.cookie = "key=" + key + ";expires=Fri, 31 Dec 9999 23:59:59 GMT";
    Gkey = key;

    $("#login-wrapper").css("opacity", "0");
    setTimeout(function () {
        $("#login-wrapper").css("display", "none");
        checkStufeCookie();
    }, 500);
}

function checkCookie(c) {
    var r = null;
    document.cookie.split(";").forEach(function (t) {var l = t.split("="); if(l[0].replace(/\s/g, '') === c) r = l[1]});
    return r;
}

function moveOutStufe() {
    $("#stufe-wrapper").css("transform", "translate(-1000%, -50%)");
    setTimeout(function () {
        $("#login-wrapper").hide();
    }, 500);
}

function getWeekOfYear(d) {
    return(d.getWeek());
}
/**
 * Returns the week number for this date.
 * the week returned is the ISO 8601 week number.
 * source: http://techblog.procurios.nl/k/news/view/33796/14863/calculate-iso-8601-week-and-year-in-javascript.html
 * @return int
 */
Date.prototype.getWeek = function () {
    // Create a copy of this date object
    var target = new Date(this.valueOf());

    // ISO week date weeks start on monday
    // so correct the day number
    var dayNr = (this.getDay() + 6) % 7;

    // ISO 8601 states that week 1 is the week
    // with the first thursday of that year.
    // Set the target date to the thursday in the target week
    target.setDate(target.getDate() - dayNr + 3);

    // Store the millisecond value of the target date
    var firstThursday = target.valueOf();

    // Set the target to the first thursday of the year
    // First set the target to january first
    target.setMonth(0, 1);
    // Not a thursday? Correct the date to the next thursday
    if (target.getDay() != 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }

    // The weeknumber is the number of weeks between the
    // first thursday of the year and the thursday in the target week
    return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000
};

function to5erString(i) {
    var l = i;
    while (l.length !== 5){
        l = "0" + l;
    }
    return l;
}


