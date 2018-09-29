"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conf_1 = require("../../conf");
function needsReset(httpClient) {
    httpClient.get(conf_1.CONFIG.resets).subscribe(function (resets) {
        if (!localStorage.resets)
            localStorage.resets = resets;
        else {
            if (+localStorage.resets < resets) {
                localStorage.resets = resets;
                localStorage.justResetted = true;
                delete localStorage.stufen;
                delete localStorage.myStufeID;
                delete localStorage.myStufe;
                delete localStorage.myKurse;
                delete localStorage.kursID;
                delete localStorage.TT;
                delete localStorage.KlassenKurse;
                location.reload();
            }
        }
    }, function (err) {
        console.error('needsReset', err);
    });
}
exports.needsReset = needsReset;
function checkFerien(baseService) {
    baseService.httpClient.get(conf_1.CONFIG.ferienUrl).subscribe(function (bool) {
        baseService.ferien = bool;
        if (baseService.ferien) {
            baseService.httpClient.get(conf_1.CONFIG.ferienEndsUrl).subscribe(function (ends) {
                baseService.ferienEndsOn = ends;
            }, function (e) {
                console.error('getFerienEndError', e);
            });
        }
    }, function (e) {
        console.error('checkFerienError', e);
    });
}
exports.checkFerien = checkFerien;
function needsUpdate(baseService) {
    if (!baseService.deadTested) {
        baseService.httpClient.get(conf_1.CONFIG.databaseURL + 'killswitch.json').subscribe(function (isdead) {
            baseService.dead = isdead;
            console.log('dead? ', isdead);
            localStorage.dead = isdead;
            if (isdead)
                baseService.router.navigate(['/error'], { queryParams: { 'dead': true } });
        });
    }
    return new Promise(function (resolve, reject) {
        var upDATE;
        var msg;
        var up;
        baseService.httpClient.get("https://api.github.com/repos/FoseFx/BetterGymWue/branches/master").subscribe(function (branch) {
            var c = branch.commit;
            upDATE = c.commit.author.date;
            msg = c.commit.message;
            if (!msg.match(baseService.VERSION))
                up = true;
            if (up)
                resolve([upDATE, msg]);
            else
                reject();
        });
    });
}
exports.needsUpdate = needsUpdate;
function getResetHeader(baseService) {
    return baseService.httpClient.get(conf_1.CONFIG.resetHeader);
}
exports.getResetHeader = getResetHeader;
function getResetMessage(baseService) {
    return baseService.httpClient.get(conf_1.CONFIG.resetMsg);
}
exports.getResetMessage = getResetMessage;
