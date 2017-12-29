const EXP = ";expires=Fri, 31 Dec 9999 23:59:59 GMT";
// */untis/*
var GURLS = [
    "https://www.fosefx.de/betterGymWue/mirror.php?url=http://gymnasium-wuerselen.de/untis/"
];
var GURL = GURLS[Math.floor(Math.random() * (GURLS.length - 1))];

var Gstufe;
var GStufeid;
var GStufeA;
var Gkey;
var GKURSE = [{kurse: []},{kurse: []}];
var GTimeTable = [];
var GMyKurse = [];



function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}