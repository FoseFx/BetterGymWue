$(document).ready(function () {
    var a = false;
    document.cookie.split(";").forEach(function (t) {if(t == "a=true") a = true;});
    stopSpinner();
    if(!a) showAGB();
    if(a) checkLoginCookie();

    var l = checkCookie("key");
    if(l !== null) Gkey = l;

    var ptt = JSON.parse(checkCookie("tt"));
    if(ptt !== null){
        GTimeTable = ptt;
    }
    var kl = checkCookie("kl");
    if(kl !== null){
        var k = "";
        for(var i = 0; i < kl; i++) k = k + checkCookie("k" + i);
        GMyKurse = JSON.parse(k).a;
    }

});
function splitter(str, l){
    var strs = [];
    while(str.length > l){
        var pos = str.substring(0, l).lastIndexOf(' ');
        pos = pos <= 0 ? l : pos;
        strs.push(str.substring(0, pos));
        var i = str.indexOf(' ', pos)+1;
        if(i < pos || i > pos+l)
            i = pos;
        str = str.substring(i);
    }
    strs.push(str);
    return strs;
}


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
    $("#login-wrapper").css("box-shadow", "0px 0px 12px 0px rgba(255,36,36,1)");
        $("#page-wraper").addClass("shake shake-constant");
    setTimeout(function () {
        $("#page-wraper").removeClass("shake shake-constant");
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

var Scrawled = 0;
var Scbase = GURL + "Schueler/";
var Scmid = "f1/";
var Scurl = "subst_001.htm";
var Scfiles = [];
var Scbodys = [];
var Scbody1 = null;
var Scbody2 = null;
var allowed = true;

function scrawl(){
    if(!allowed) return;
    allowed = false;
    startSpinner();
    var theurl = Scbase + Scmid + Scurl;
    $.ajax({
        cache: false,
        url: theurl,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + Gkey);
        },
        success: function (c) {
            Scfiles.push(Scurl);
            Scurl = c.split("<meta http-equiv=\"refresh\" content=\"10; URL=")[1].split("\">")[0];
            Scbodys.push(c.split("<body bgcolor=\"#F0F0F0\">")[1].split("</body>")[0]);
            c = null;
            allowed = true;
            if(Scfiles.indexOf(Scurl) === -1) scrawl();
            else evaScrawl();
        }
    });
}
function evaScrawl() {
    Scrawled++;
    if(Scrawled === 1){
        //Heute
        Scbody1 = Scbodys;
        //Morgen
        Scmid = "f2/";
        Scurl = "subst_001.htm";
        Scfiles = [];
        Scbodys = [];
        scrawl();
    }if(Scrawled !== 2) return;
    Scbody2 = Scbodys;

    var cInfo = [];
    var cVertretung = [];

    Scbody1.forEach(function (seite) {
        seite = $(seite);
        /*  Informationskasten  */
        var info = seite.find("td.info");
        if(info.length === 0) info = null;
        if(info !== null){
            var g = [];
            info.each(function () {g.push($(this).html());});
            g.forEach(function (t) {
                if(cInfo.indexOf(t) === -1)  cInfo.push(t);
            });
        }


        /*  Vertretungsdaten  */
        var table = [];
        $(seite.find("table.mon_list")[0]).children("tbody").children().each(function (i) {
            if(i === 0) return;
            if($(this).children().length === 1) table.push({
                klasse: $(this).children(".inline_header").html(),
                ctnd: []
            });
            else {

                var ch = $(this).children();
                var st = [,$(ch[1]).html()];

                if(st[1].indexOf(" - ") !== -1){
                    st = st[1].split(" - ");
                    table[table.length - 1].ctnd.push({
                        date: $(ch[0]).html(),
                        stunde : st[0],
                        kurs: $(ch[2]).html(),
                        type: $(ch[3]).children("b").html(),
                        nraum: $(ch[5]).html(),
                        info : $(ch[6]).html()
                    });
                }
                table[table.length - 1].ctnd.push({
                    date: $(ch[0]).html(),
                    stunde : st[1],
                    kurs: $(ch[2]).html(),
                    type: $(ch[3]).children("b").html(),
                    nraum: $(ch[5]).html(),
                    info : $(ch[6]).html()
                });
            }

        });
        table.forEach(function (t) {
            var set = false;
            cVertretung.forEach(function (t2) {
                if(t2.klasse === t.klasse){
                    set = true;
                    t.ctnd.forEach(function (t3) {
                        t2.ctnd.push(t3);
                    });
                }
            });

            if(!set) cVertretung.push(t);
        });
    });

    cInfo = [[],cInfo];
    cVertretung = [[], cVertretung];

    Scbody2.forEach(function (seite) {
        seite = $(seite);
        /*  Informationskasten  */
        var info = seite.find("td.info");
        if(info.length === 0) info = null;
        if(info !== null){
            var g = [];
            info.each(function () {g.push($(this).html());});
            g.forEach(function (t) {
                if(cInfo[0].indexOf(t) === -1)  cInfo[0].push(t);
            });
        }


        /*  Vertretungsdaten  */
        var table = [];
        $(seite.find("table.mon_list")[0]).children("tbody").children().each(function (i) {
            if(i === 0) return;
            if($(this).children().length === 1) table.push({
                klasse: $(this).children(".inline_header").html(),
                ctnd: []
            });
            else {

                var ch = $(this).children();
                var st = [,$(ch[1]).html()];

                if(st[1].indexOf(" - ") !== -1){
                    st = st[1].split(" - ");
                    table[table.length - 1].ctnd.push({
                        date: $(ch[0]).html(),
                        stunde : st[0],
                        kurs: $(ch[2]).html(),
                        type: $(ch[3]).children("b").html(),
                        nraum: $(ch[5]).html(),
                        info : $(ch[6]).html()
                    });
                }
                table[table.length - 1].ctnd.push({
                    date: $(ch[0]).html(),
                    stunde : st[1],
                    kurs: $(ch[2]).html(),
                    type: $(ch[3]).children("b").html(),
                    nraum: $(ch[5]).html(),
                    info : $(ch[6]).html()
                });
            }

        });
        table.forEach(function (t) {
            var set = false;
            cVertretung[0].forEach(function (t2) {
                if(t2.klasse === t.klasse){
                    set = true;
                    t.ctnd.forEach(function (t3) {
                        t2.ctnd.push(t3);
                    });
                }
            });

            if(!set) cVertretung[0].push(t);
        });
    });

    cVertretung.reverse();

    console.log(cVertretung);
    console.log(cInfo);
    stopSpinner();

    var date1;

    cVertretung.forEach(function (t, woche) {
        var date = new Date();
        var tagesNamen = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

        if(woche === 1) date.setDate(date.getDate() + 1);
        while(date.getDay() === 0 || date.getDay() === 6)
            date.setDate(date.getDate() + 1);
        if(woche === 0) date1 = date;
        if(woche === 1 && date1.getDate() == date.getDate()) date.setDate(date.getDate() + 1);

        var d = date.getDate() + "." + (date.getMonth() + 1) + ".";
        console.log(date);
        var str = "<div class=\"tag scrollbar\">\n" +
            "                    <h1>" + tagesNamen[date.getDay()] + " " + d +"</h1>\n" +
            "                    <hr>\n" +
            "                    <table>\n" +
            "                        <tbody class='lul'>\n" +
            "                            <tr><td><b>Std.</b></td><td><b>Fach</b></td><td><b>Raum</b></td><td><b>Lehrer</b></td></td><td></td></tr>\n" +
            "                        </tbody>\n" +
            "                    </table>\n" +
            "                </div>";

        var ret = $(str);
        var obj = $(ret).find("tbody.lul")[0];

        var week = (date.getWeek() % 2 === 0)? 0:1;

        var ttobj = GTimeTable[week].days[date.getDay() - 1];
        ttobj.forEach(function (t2, i) {
            var s = "";
            if(t2 === {}) s = "<tr><td colspan='5'>Pause</td></tr>";
            else if(t2.type === "klasse"){
                s = "<tr><td>" + (i + 1) + "</td><td>" + t2.fach + "</td><td>" + t2.raum + "</td><td>" + t2.lehrer + "</td></tr>";
            }
            else if(t2.type === "kurs"){
                GMyKurse.forEach(function (t3) {
                    if(t3.title !== t2.fach)return;
                    var raum = null;
                    t2.raeume.forEach(function (value) { if(value.kurs === t3.fach) raum = value.raum; });
                    raum = (raum === null)? "- - -":raum;
                    s = "<tr><td>" + (i + 1) + "</td><td>" + t3.fach + "</td><td>" + raum + "</td><td>" + t3.lehrer + "</td></tr>";
                });
            }
            s = s.replace("undefined", "?");
            s = s.replace("null", "");
            $(obj).append(s);
        });

        var important = [];
        cVertretung.forEach(function (tag) {
            tag.forEach(function (header) {
                if(header.klasse.indexOf(Gstufe) === -1) return;
                header.ctnd.forEach(function (ctnd) {
                    if(ctnd.date !== d) return;
                    GMyKurse.forEach(function (t2) { if(t2.fach === ctnd.kurs || ctnd.kurs === "&nbsp;")important.push(ctnd); });
                    GTimeTable[week].days.forEach(function (t2) { t2.forEach(function (t3) {
                        if(t3 === {}) return;
                        if (t3 === null) return;
                        if(t3.type !== "klasse") return;
                        if(t3.fach === ctnd.kurs) important.push(ctnd);
                    });});
                });
            });
        });
        console.log(important);

        important.forEach(function (t2) {
            var stunde = t2.stunde;
            $(obj).children().each(function () {
                if($($(this).children()[0]).html() !== stunde) return;
                if(t2.type === "Vertretung") $(this).append("<b id='moveto" + stunde + "'></b>");
                
                $(this).children("td").each(function () {
                    $(this).appendTo("moveto" + stunde);
                });
            });
        });

        //Header tabelle
        var headtab = $("<h3>Info</h3>\n" +
            "<table class='hi'>\n" +
            "    <tbody class=\"headerTab\">\n" +
            "        \n" +
            "    </tbody>\n" +
            "</table>");
        cInfo.forEach(function (value, i) {
            if (cVertretung[i][0].ctnd[0].date !== d) return;
            if(value === [] || value[0] === undefined || value[1] === undefined) return;
            headtab.find(".headerTab").append("<tr><td>" + value[0] + "</td><td>" + value[1] + "</td></tr>");
        });
        if($(headtab).find("tbody").children().length !== 0)
            ret.append($(headtab));

        //Vertretungsinfo für Stufe

        var vertInfo = $("<h3>" + Gstufe +"</h3>\n" +
            "<table class='hi'>\n" +
            "   <tbody>\n" +
            "       \n" +
            "   </tbody>\n" +
            "</table>");
        cVertretung.forEach(function (value, j) {
            value.forEach(function (value2, j2) {
                if(value2.klasse.indexOf(Gstufe) !== -1){
                    value2.ctnd.forEach(function (value3) {
                        var ty = value3.type;
                        if (ty === "Vertretung") ty = "V";

                        var inf = value3.info;
                        if(inf === "Selbstst�ndiges Arbeiten") inf = "Selbst. Arb.";

                        var stunde = "<tr><td>" + value3.stunde +"</td>";
                        var oldstunde = "<tr><td>" + value3.stunde - 1 + "</td>";
                        var toAppend = "<td>" +value3.kurs + "</td><td>" + ty + "</td><td>" + value3.nraum + "</td><td>" + inf + "</td></tr>";

                        //TODO
                        if(value3.date === d){
                            if(vertInfo.find("tbody").html().indexOf( oldstunde + toAppend) === -1)
                               vertInfo.find("tbody").append(stunde + toAppend);
                            else{
                                vertInfo.find("tbody").find("tr").each(function () {
                                    if ($(this).html() === oldstunde.substr(3) + toAppend.substr(0, toAppend.length - 1)) $(this).html("<td>" + $(this).children[0] + "/" + ($(this).children[0] + 1) + "</td>" + toAppend);
                                });
                            }
                        }
                        ///Todo
                    });
                }
            });
        });
        if(vertInfo.find("tbody").children().length !== 0)
            ret.append(vertInfo);

        $("#inner-tag-wrapper").append(ret);
    });
    $("#anzeigen-wrapper").removeClass("hidden");

}