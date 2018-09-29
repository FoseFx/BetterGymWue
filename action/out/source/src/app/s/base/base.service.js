"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var conf_1 = require("../../conf");
var AppMeta = require("./appMeta.base");
var BaseService = /** @class */ (function () {
    function BaseService(router, httpClient, alertService) {
        var _this = this;
        this.router = router;
        this.httpClient = httpClient;
        this.alertService = alertService;
        this.VERSION = "1.4.5 Beta";
        this.noswipe = false;
        this.milchglas = false;
        this.selectedTab = 0;
        this.dead = false;
        this.ferien = false;
        this.ferienEndsOn = "";
        this.justResetted = false;
        this.deadTested = false;
        this.needsUpdate = function () { return AppMeta.needsUpdate(_this); };
        this.getResetHeader = function () { return AppMeta.getResetHeader(_this); };
        this.getResetMessage = function () { return AppMeta.getResetMessage(_this); };
        this._ws = [];
        if (typeof (Storage) === 'undefined') {
            this.allowedBrowser = false;
            this.router.navigate(['error'], { queryParams: { 'oldBrowser': 'true' } });
            return;
        }
        localStorage.VERSION = this.VERSION;
        try {
            eval("gtag('event', 'startup', {'bgw_version_in_use': localStorage.VERSION})");
        }
        catch (e) {
            console.error("Tracking Failed");
        }
        this.dead = (!!localStorage.dead) ? (localStorage.dead === 'true') : false;
        this.acceptedAGB = (!!localStorage.acceptedAGB2) ? (localStorage.acceptedAGB2 === 'true') : false;
        this.credentials = (!!localStorage.credentials) ? JSON.parse(localStorage.credentials) : undefined;
        this.myKurse = (!!localStorage.myKurse) ? JSON.parse(localStorage.myKurse) : undefined;
        this.myStufe = (!!localStorage.myStufe) ? localStorage.myStufe : undefined;
        this.myStufeID = (!!localStorage.myStufeID) ? localStorage.myStufeID : undefined;
        this.TT = (!!localStorage.TT) ? JSON.parse(localStorage.TT) : undefined;
        this.KlassenKurse = (!!localStorage.KlassenKurse) ? JSON.parse(localStorage.KlassenKurse) : undefined;
        this.kursID = (!!localStorage.kursID) ? localStorage.kursID : undefined;
        this._preLehrer = (!!localStorage.preLehrer) ? (localStorage.preLehrer == 'true') : true;
        this._notificationsEnabled = (!!localStorage.notificationsEnabled) ? localStorage.notificationsEnabled == "true" : undefined;
        this.justResetted = (!!localStorage.justResetted) ? (localStorage.justResetted == "true") : false;
        localStorage.justResetted = false;
        AppMeta.checkFerien(this);
        AppMeta.needsReset(this.httpClient);
    }
    Object.defineProperty(BaseService.prototype, "preLehrer", {
        get: function () {
            return this._preLehrer;
        },
        set: function (val) {
            this._preLehrer = val;
            localStorage.preLehrer = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseService.prototype, "MyKurse", {
        set: function (val) {
            this.myKurse = val;
            localStorage.myKurse = JSON.stringify(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseService.prototype, "MyStufe", {
        set: function (val) {
            this.myStufe = val[0];
            this.myStufeID = val[1];
            localStorage.myStufe = val[0];
            localStorage.myStufeID = val[1];
        },
        enumerable: true,
        configurable: true
    });
    BaseService.prototype.setTT = function (val) {
        this.TT = val;
        localStorage.TT = JSON.stringify(val);
        var a = [];
        console.log(val);
        val.forEach(function (wocheV) {
            wocheV.days.forEach(function (tag) {
                tag.forEach(function (stunde) {
                    if (stunde.type == "klasse" && a.indexOf(stunde.fach) === -1)
                        a.push(stunde.fach);
                });
            });
        });
        this.KlassenKurse = a;
        localStorage.KlassenKurse = JSON.stringify(a);
    };
    BaseService.prototype.acceptAGB = function () {
        this.acceptedAGB = true;
        localStorage.acceptedAGB2 = true;
        this.install();
        this.router.navigate(['/'], { queryParams: { ua: '' } });
    };
    BaseService.prototype.checkCredentials = function (u, p, lehrer) {
        var _this = this;
        lehrer = lehrer || false;
        return new Promise(function (resolve) {
            _this.httpClient.get((lehrer) ? conf_1.CONFIG.credentialsCheckLehrerUrl : conf_1.CONFIG.credentialsCheckUrl, {
                headers: new http_1.HttpHeaders({ 'Authorization': 'Basic ' + btoa(u + ':' + p) }),
                responseType: 'text'
            }).subscribe(function (value) {
                if (value && !lehrer) {
                    localStorage.credentials = JSON.stringify({ u: u, p: p });
                    _this.credentials = { u: u, p: p };
                    resolve(true);
                }
                else if (value && lehrer) {
                    var obj = JSON.parse(localStorage.credentials);
                    obj.l = { u: u, p: p };
                    console.log(obj);
                    localStorage.credentials = JSON.stringify(obj);
                    _this.credentials = obj;
                    resolve(true);
                }
            }, function (err) {
                if (!lehrer) {
                    delete localStorage.credentials;
                    _this.credentials = undefined;
                }
                resolve(false);
            });
        });
    };
    BaseService.prototype.makeConnections = function (url, lehrer) {
        if (lehrer === void 0) { lehrer = false; }
        var cred = this.credentials;
        if (!cred)
            return null;
        var ext = "?" + (Math.random() * 10000).toFixed(0);
        var p = new Promise(function (resolve, reject) {
            fetch(url + ext, {
                headers: {
                    "Authorization": "Basic " + ((!lehrer) ? btoa(cred.u + ':' + cred.p) : btoa(cred.l.u + ':' + cred.l.p))
                },
                method: "get",
                redirect: "follow",
                cache: "no-cache"
            })
                .then(function (response) {
                if (response.ok) {
                    response.arrayBuffer().then(function (buffer) {
                        //@ts-ignore
                        var txt = new TextDecoder("iso-8859-1").decode(buffer);
                        resolve(txt);
                    });
                }
                else {
                    reject({
                        statusText: response.status + " " + response.statusText
                    });
                }
            })
                .catch(function (err) {
                reject({ statusText: "Netzwerkfehler" });
            });
        });
        return rxjs_1.from(p);
    };
    BaseService.prototype.install = function () {
        var _this = this;
        // @ts-ignore
        if (!!window.installpromptevent) {
            // @ts-ignore
            window.installpromptevent.prompt();
            // @ts-ignore
            window.installpromptevent.userChoice.then(function (choice) {
                console.log('choice', choice);
                if (choice.outcome === "accepted") {
                    // @ts-ignore
                    delete window.installpromptevent;
                    _this.alertService.alert("Installiert! Du kannst die App jetzt öffnen");
                }
                else if (choice.outcome === "dismissed") {
                    _this.alertService.alert("Installation fehlgeschlagen. Probiere es über das Menü erneut", _this.alertService.DANGER);
                }
            });
        }
    };
    BaseService.prototype.setLastVD = function (index, w, lehrer) {
        delete localStorage.lastVD;
        console.log("setLastVD: " + index + ", " + lehrer);
        this._ws[index] = w;
        localStorage.lastVD = JSON.stringify({ d: new Date(), w: this._ws, lehrer: lehrer });
    };
    BaseService = __decorate([
        core_1.Injectable()
    ], BaseService);
    return BaseService;
}());
exports.BaseService = BaseService;
