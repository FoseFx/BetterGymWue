const CLICK = 0;

$("#termsaccept").on("click", function (e) {
    e.preventDefault();
    document.cookie = "a=true;expires=Fri, 31 Dec 9999 23:59:59 GMT";
    $("#terms").css("display", "none");
    checkLoginCookie();
});

$("#login-form").submit(function (e) {
    e.preventDefault();
    console.log($("#select").val() + ":" + $("#psw").val());
    var key = btoa($("#select").val() + ":" + $("#psw").val());

    login(key, CLICK);
});

var selectedKurse = [];
var avTitles = [];
var layedKurse = [];
//{title: "TITLE", used: 9, span: $()}
$("#selectkurs-inner-wrapper").on("click", ".kurs-select", function () {
    if(!$(this).hasClass("selected")){
        $(this).addClass("selected");
        const fach = $(this).find("span").html();
        const title = $(this).find("h6").html();
        avTitles.forEach(function (o) {
            if(o.title === title){
                o.used++;
                if(o.used > 1){
                    o.span.css("color", "red").css("font-weight", "600").css("font-style", "italic");
                }else if(o.used === 1){
                    o.span.css("color", "green").css("font-weight", "300").css("font-style", "normal");
                }
            }
        });
        selectedKurse.push(fach);

    }else{
        $(this).removeClass("selected");
        const fach = $(this).find("span").html();
        const title = $(this).find("h6").html();
        avTitles.forEach(function (o) {
            if(o.title === title){
                o.used--;
                if(o.used > 1){
                    o.span.css("color", "red").css("font-weight", "600").css("font-style", "italic");
                }else if(o.used === 1){
                    o.span.css("color", "green").css("font-weight", "300").css("font-style", "normal");
                }else{
                    o.span.css("color", "black").css("font-weight", "600").css("font-style", "normal");
                }
            }
        });
        selectedKurse.push(fach);
    }
});

function login(key, i) {
    $.ajax({
        type: "GET",
        contentType: 'Content-type: text/html; charset=iso-8859-1',
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Basic " + key);
            xhr.overrideMimeType('text/html;charset=iso-8859-1');
        },
        url: GURL + 'Schueler-Stundenplan/default.htm',
        success: function (r) {
            Auth(key);
        },
        error: function (e, r, t) {
            console.log(t);
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

// noinspection SpellCheckingInspection
$('#stufe-form').submit(function (e) {
    e.preventDefault();
    if($("#stufe").val() !== "") {
        Gstufe = $("#stufe").val();
        for(var i = 0; i < GStufeA.length; i++){
            if(GStufeA[i] === Gstufe) GStufeid = i + 1;
        }
        document.cookie = "stufe="+Gstufe+EXP;
        document.cookie = "stufeid="+GStufeid+EXP;
        accessStufe();
    }
});

function accessStufe() {
    moveOutStufe();
    if(checkCookie("kl") === null || checkCookie("tt") === null){
        startSpinner();
        getKurse("a");
        getKurse("b");
    }else {
        scrawl();
    }
}

function TTLoaded() {
    document.cookie = "tt=" + JSON.stringify(GTimeTable) + EXP;
    if(checkCookie("kl") !== null) {
        stopSpinner();
        scrawl();
        return;
    }
    $("#selectkurs-wrapper").removeClass("hidden");
    GKURSE.forEach(function (t) {
        var prevTitle = null;
        t.kurse.forEach(function (o) {
            var inn = false;
            layedKurse.forEach(function (test) {if(test === o.fach) inn = true;});
            if(inn) return;
            layedKurse.push(o.fach);
            if(prevTitle !== o.title) $("#selectkurs-inner-wrapper").append("<div class=\"kurs-select\"><div class=\"kurs-select-inner\"><div><span>Frei</span></div><h6>" + o.title + "</h6></div></div>");
            prevTitle = o.title;
            $("#selectkurs-inner-wrapper").append("<div class=\"kurs-select\"><div class=\"kurs-select-inner\"><div><span>" + o.fach + "</span></div><h6>" + o.title + "</h6></div></div>");

            var dk = $("<span>" + o.title + "</span>");
            var innn = false;
            avTitles.forEach(function (t2) {
               if(t2.title === o.title) innn = true;
            });
            if(!innn)
                dk.appendTo("#kurse-title-container");
                avTitles.push({
                    title: o.title,
                    used: 0,
                    span: dk
                });
        });
    });
    stopSpinner();
}

$("#kurseSelected").click(function (e) {
    e.preventDefault();
    var gueltig = true;
    avTitles.forEach(function (t) { if(t.used !== 1) gueltig = false; });
    if(!gueltig) {
        $("#selectkurs-inner-wrapper").addClass("shake shake-constant");
        setTimeout(function () {
            $("#selectkurs-inner-wrapper").removeClass("shake shake-constant");
        }, 200);
        return;
    }
    selectedKurse.forEach(function (t) {GKURSE.forEach(function (t2, w) {
        t2.kurse.forEach(function (e) {
            if(t === e.fach) {
                var posi = null;
                GMyKurse.forEach(function (t3, i) { if(t3.fach === e.fach) posi = i; });
                if(posi === null){
                    GMyKurse.push(e);

                }
            }
        });
    });});

    var c = {a: GMyKurse};
    var cc = JSON.stringify(c);
    var ccc = splitter(cc, 3500);

    ccc.forEach(function (t, i) {
        document.cookie = "k" + i + "=" + t + EXP;
    });
    document.cookie = "kl=" + ccc.length + EXP;

    $("#selectkurs-wrapper").addClass("hidden");
    scrawl();
});
function slide(left) {
    var tage = $(".tag").toArray();
    $(tage[(left)? 0 : 1]).show();
    $(tage[(left)? 1 : 0]).hide();
}
$("#leftarrow, #leftbig").click(function () {
    slide(true);
});
$("#rightarrow, #rightbig").click(function () {
    slide(false);
});