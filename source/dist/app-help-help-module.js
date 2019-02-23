(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-help-help-module"],{

/***/ "./src/app/help/help-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/help/help-routing.module.ts ***!
  \*********************************************/
/*! exports provided: HelpRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelpRoutingModule", function() { return HelpRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _help_help_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./help/help.component */ "./src/app/help/help/help.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [{
        path: '', component: _help_help_component__WEBPACK_IMPORTED_MODULE_2__["HelpComponent"]
    }];
var HelpRoutingModule = /** @class */ (function () {
    function HelpRoutingModule() {
    }
    HelpRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], HelpRoutingModule);
    return HelpRoutingModule;
}());



/***/ }),

/***/ "./src/app/help/help.module.ts":
/*!*************************************!*\
  !*** ./src/app/help/help.module.ts ***!
  \*************************************/
/*! exports provided: HelpModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelpModule", function() { return HelpModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _help_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./help-routing.module */ "./src/app/help/help-routing.module.ts");
/* harmony import */ var _help_help_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./help/help.component */ "./src/app/help/help/help.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var HelpModule = /** @class */ (function () {
    function HelpModule() {
    }
    HelpModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _help_routing_module__WEBPACK_IMPORTED_MODULE_2__["HelpRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
            ],
            declarations: [_help_help_component__WEBPACK_IMPORTED_MODULE_3__["HelpComponent"]]
        })
    ], HelpModule);
    return HelpModule;
}());



/***/ }),

/***/ "./src/app/help/help/help.component.css":
/*!**********************************************!*\
  !*** ./src/app/help/help/help.component.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".fixed{\n  -webkit-text-decoration-line: line-through;\n          text-decoration-line: line-through;\n  font-style: italic;\n  color: green;\n}\nbutton{\n  text-align: center;\n  margin: 0 auto;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGVscC9oZWxwL2hlbHAuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDBDQUFrQztVQUFsQyxrQ0FBa0M7RUFDbEMsa0JBQWtCO0VBQ2xCLFlBQVk7QUFDZDtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLGNBQWM7QUFDaEIiLCJmaWxlIjoic3JjL2FwcC9oZWxwL2hlbHAvaGVscC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZpeGVke1xuICB0ZXh0LWRlY29yYXRpb24tbGluZTogbGluZS10aHJvdWdoO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGNvbG9yOiBncmVlbjtcbn1cbmJ1dHRvbntcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW46IDAgYXV0bztcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/help/help/help.component.html":
/*!***********************************************!*\
  !*** ./src/app/help/help/help.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"center\" style=\"margin-bottom: 50px!important; margin-top: 10px!important;\">\n\n  <h4 mat-card-title=\"\">Hilfe</h4>\n  <div class=\"card mb-3\" style=\"max-width: 100%;margin-top: 10px\">\n    <div class=\"card-body\">\n\n\n\n      <form #supportForm=\"ngForm\" (submit)=\"submitted()\" style=\"width: 100%\">\n\n        <mat-form-field style=\"width: 100%\">\n          <input matInput ngModel required name=\"subject\" placeholder=\"Überschrift\">\n        </mat-form-field>\n        <mat-form-field style=\"width: 100%\">\n          <textarea style=\"width: 100%!important;word-wrap: normal!important;\" matInput ngModel required name=\"text\" placeholder=\"Frage / Bug Report\"></textarea>\n        </mat-form-field>\n\n        <mat-form-field style=\"width: 100%\">\n          <input matInput ngModel name=\"email\" placeholder=\"eMail\" required>\n        </mat-form-field>\n\n        <mat-slide-toggle ngModel name=\"anonym\">Lokale Daten nicht mitsenden</mat-slide-toggle><br><br>\n\n        <div style=\"width: 100%\">\n          <button mat-raised-button>Senden</button>\n        </div>\n\n      </form>\n\n    </div>\n  </div>\n\n  <div>\n    <br>\n    <h3>Bekannte Bugs</h3>\n    <ul *ngIf=\"bugs\">\n      <li *ngFor=\"let bug of bugs\" [ngClass]=\"{'fixed': bug.substr(0, 1) === '+'}\">{{bug.substr(1)}}</li>\n    </ul>\n    <p *ngIf=\"bugs\"><span class=\"fixed\">Wird mit nächster Version behoben</span> - <span>Noch offen</span></p>\n    <button mat-raised-button color=\"accent\" *ngIf=\"!bugs\" (click)=\"ladeBugs()\">Zeige Bugs</button>\n    <br><br>\n  </div>\n\n</mat-card>\n"

/***/ }),

/***/ "./src/app/help/help/help.component.ts":
/*!*********************************************!*\
  !*** ./src/app/help/help/help.component.ts ***!
  \*********************************************/
/*! exports provided: HelpComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelpComponent", function() { return HelpComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _main_s_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../main/s/alert.service */ "./src/app/main/s/alert.service.ts");
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../conf */ "./src/app/conf.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HelpComponent = /** @class */ (function () {
    function HelpComponent(http, router, alert) {
        this.http = http;
        this.router = router;
        this.alert = alert;
        this.used = false;
        this.antispam = true;
    }
    HelpComponent.prototype.ngOnInit = function () {
    };
    HelpComponent.prototype.submitted = function () {
        var _this = this;
        if (this.used)
            return;
        console.log(this.form);
        if (!this.form.valid)
            return;
        this.used = true;
        var local;
        if (!this.form.value.anonym) {
            local = localStorage;
        }
        var req = {
            email: this.form.value.email,
            subject: this.form.value.subject,
            text: this.form.value.text,
            local: local
        };
        var r = Math.floor(100000 + Math.random() * 900000);
        this.http.put(_conf__WEBPACK_IMPORTED_MODULE_5__["CONFIG"].databaseURL + "support/" + r + ".json", req).subscribe(function () {
            _this.router.navigate(['/']);
        }, function (err) {
            _this.alert.alert(err.statusText, _this.alert.DANGER);
        });
    };
    HelpComponent.prototype.ladeBugs = function () {
        var _this = this;
        if (!this.antispam)
            return;
        this.antispam = false;
        this.http.get(_conf__WEBPACK_IMPORTED_MODULE_5__["CONFIG"].databaseURL + "bugs.json").subscribe(function (c) {
            _this.bugs = c;
        }, function (err) {
            _this.alert.alert(err.statusText, _this.alert.DANGER);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('supportForm'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgForm"])
    ], HelpComponent.prototype, "form", void 0);
    HelpComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-help',
            template: __webpack_require__(/*! ./help.component.html */ "./src/app/help/help/help.component.html"),
            styles: [__webpack_require__(/*! ./help.component.css */ "./src/app/help/help/help.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _main_s_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"]])
    ], HelpComponent);
    return HelpComponent;
}());



/***/ })

}]);
//# sourceMappingURL=app-help-help-module.js.map