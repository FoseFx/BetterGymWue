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

function orderGKURSE() {
    GKURSE.forEach(function (w) {

        var titles = [];
        w.kurse.forEach(function (value) {
            var dosth = true;
            titles.forEach(function (value2) {
                if (titles.length === 0)
                    return true;
                if(value2[0] === value.title) dosth = false;
            });
            if(dosth)
                titles.push([value.title, [value]]);
            else
                titles.forEach(function (value2, i) {
                    if(value2[0] === value.title) titles[i][1].push(value);
                });
        });
        w.kurse = [];
        titles.forEach(function (value) {
            value[1].forEach(function (value2) {
                w.kurse.push(value2);
            });
        });
    });
}

function TTLoaded() {
    //document.cookie = "tt=" + JSON.stringify(GTimeTable) + EXP;
    if(checkCookie("kl") !== null) {
        scrawl();
        return;
    }
    $("#selectkurs-wrapper").removeClass("hidden");
    orderGKURSE();
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
    if($("#kurs-cloud-cb").is(":checked")){
        $.ajax({
            url: "https://www.fosefx.com/betterGymWue/kursAPI.php",
            type: "GET",
            data: "k=" + JSON.stringify(GMyKurse),
            success: function (e) {
                doAfterKursClick();
                $("body").append("<div id='bigIDBox'><p>Dein Kurs Code:</p><span class='bigKursNumber'>" + e + "</span><br><a onclick='$(\"#bigIDBox\").remove()'>Ok</a></div>");
            },
            error: function (e) {
                alert("Verbindung zur Datenbank fehlgeschlagen: " + e);
            }

        });


    }else doAfterKursClick();


});

$("#getKurseWithID").click(function (e) {
    e.preventDefault();
    $("body").append("<div id='diff' onclick='$(\"#diff, #bigIDBox\").remove()'></div><div id='bigIDBox'><p>Kurs-ID eingeben:</p><br><input id='KursIDBox' type='tel' maxlength='4' minlength='4'><br><br><button class='yes' onclick='loadWIthID()'><span>Ok</span></button><br><br><a onclick='$(\"#diff, #bigIDBox\").remove()'>Schließen</a></div>");
    $("#KursIDBox").focus();
});

var allowLoad = true;
function loadWIthID() {
    if(!allowLoad) return;
    
    allowLoad = false;
    var $box = $("#KursIDBox");
    var id = $box.val();
    $box.prop("disabled", true);
    
    $.ajax({
        url: "https://www.fosefx.com/betterGymWue/kursAPI.php",
        type: "get",
        data: "get=" + id,
        success: function (e) {
            e = $.parseJSON(e);
            if(e.result === false){
                $box.prop("disabled", false).val("");
                allowLoad = true;
                $("#bigIDBox").addClass("shake shake-constant");
                setTimeout(function () {
                    $("#bigIDBox").removeClass("shake shake-constant");
                }, 200);
                return;
            }
            GMyKurse = e.kurse;
            $("#diff, #bigIDBox").remove();
            doAfterKursClick();
        },
        error: function (e) {
            console.log(e);
            alert("Verbindung mit Datenbank fehlgeschlagen");
            allowLoad = true;
            $box.prop("disabled", false);
        }
    });
}

function doAfterKursClick() {
    var c = {a: GMyKurse};
    var cc = JSON.stringify(c);
    var ccc = splitter(cc, 3500);

    ccc.forEach(function (t, i) {
        document.cookie = "k" + i + "=" + t + EXP;
    });
    document.cookie = "kl=" + ccc.length + EXP;

    $("#selectkurs-wrapper").addClass("hidden");
    scrawl();
}

function slide(left) {
    var tage = $(".tag").toArray();
    $(tage[(left)? 0 : 1]).show();
    $(tage[(left)? 1 : 0]).hide();
    if(left){
        $("#rightarrow").css("opacity", "0.75");
        $("#leftarrow").css("opacity", "0");
    }else{
        $("#leftarrow").css("opacity", "0.75");
        $("#rightarrow").css("opacity", "0");
    }

}
$("#leftarrow, #leftbig").click(function () {
    slide(true);
});
$("#rightarrow, #rightbig").click(function () {
    slide(false);
});
$(window).keydown(function (e) {
    if(e.key == "ArrowRight")slide(false);
    if(e.key == "ArrowLeft")slide(true);
});

function controls(someVar) {
    if(someVar)$("#controls").addClass("active");
    else $("#controls").removeClass("active");
}
function kursChange() {
    for(var i = 0; i < checkCookie("kl"); i++)
        delete_cookie("k" + i);
    delete_cookie("kl");
    location.reload();
}
function stufeChange() {
    delete_cookie("stufe");
    delete_cookie("stufeid");
    kursChange();
}

var wasHere = false;
function ttClicked() {
    if(typeof GTTUrls[0] === "undefined") return;


    $("#page-wraper").css("opacity", "0");
    setTimeout(function () {
        $("#page-wraper").css("display", 'none');
        $("#ttDispl").css("display", "flex");
        setTimeout(function () { $("#ttDispl").css("opacity", "1") }, 300);
    }, 300);

    if(wasHere) return;
    wasHere = true;
    var right;
    GTTUrls.forEach(function (value) { if(value[1] === (getWeekOfYear(new Date) % 2 === 0)) right = value[0] });
    $.ajax({
        contentType: 'Content-type: text/html; charset=iso-8859-1',
        url: right,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + Gkey);
            xhr.overrideMimeType('text/html;charset=iso-8859-1');
        },
        type: "GET",
        error: function () {
            $("page-wraper").css("display", "block");
            setTimeout(function (args) { $("#page-wraper").css("opacity", "1") }, 100);
        },
        success: function (e) {
            var test = $(e).children("table")[0];
            var q = "";
            $(test).addClass("ttTable");
            var t = [];
            GMyKurse.forEach(function (value) { q += "font:contains('" + value.fach + "'),"; t.push(value.fach);});
            q = q.substr(0, q.length - 1);
            console.log(q);
            $(test).find(q).each(function () {
                var $self = $(this);
                var ctnd = $self.html().replace(new RegExp("\n", "g"), "").replace(new RegExp(" ", "g"), "");
                if($self.parent().index() === 0 && t.indexOf(ctnd) !== -1) $self.parent().parent().css("background-color", "yellow");
            });
            $("#ttDispl").append(test);
        }
    });
}

function closeTT() {
    $("#ttDispl").css("display", "none");
    setTimeout(function () {
        $("#ttDispl").css("opacity", "0");
        setTimeout(function () {
            $("#page-wraper").css("display", 'block');
            setTimeout(function (args) {
                $("#page-wraper").css("opacity", "1");
            }, 300);
        }, 300);
    }, 300);

}

function delete_cookie( name ) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}