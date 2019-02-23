(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"app/help/help.module": [
		"./src/app/help/help.module.ts",
		"app-help-help-module"
	],
	"app/verifynotkurse/verifynotkurse.module": [
		"./src/app/verifynotkurse/verifynotkurse.module.ts"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/Classes.ts":
/*!****************************!*\
  !*** ./src/app/Classes.ts ***!
  \****************************/
/*! exports provided: VertretungsReihe, Kurs, TimeTable, TimeTableSlot, NetworkError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VertretungsReihe", function() { return VertretungsReihe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Kurs", function() { return Kurs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeTable", function() { return TimeTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeTableSlot", function() { return TimeTableSlot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkError", function() { return NetworkError; });
var VertretungsReihe = /** @class */ (function () {
    function VertretungsReihe() {
    }
    return VertretungsReihe;
}());

var Kurs = /** @class */ (function () {
    function Kurs() {
    }
    return Kurs;
}());

var TimeTable = /** @class */ (function () {
    function TimeTable() {
    }
    return TimeTable;
}());

var TimeTableSlot = /** @class */ (function () {
    function TimeTableSlot() {
    }
    return TimeTableSlot;
}());

var NetworkError = /** @class */ (function () {
    function NetworkError() {
    }
    return NetworkError;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _main_c_login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main/c/login/login.component */ "./src/app/main/c/login/login.component.ts");
/* harmony import */ var _main_s_guard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main/s/guard.service */ "./src/app/main/s/guard.service.ts");
/* harmony import */ var _main_c_agb_agb_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./main/c/agb/agb.component */ "./src/app/main/c/agb/agb.component.ts");
/* harmony import */ var _main_c_select_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./main/c/select/select.component */ "./src/app/main/c/select/select.component.ts");
/* harmony import */ var _main_c_show_show_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./main/c/show/show.component */ "./src/app/main/c/show/show.component.ts");
/* harmony import */ var _main_c_cloud_cloud_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./main/c/cloud/cloud.component */ "./src/app/main/c/cloud/cloud.component.ts");
/* harmony import */ var _main_c_about_about_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./main/c/about/about.component */ "./src/app/main/c/about/about.component.ts");
/* harmony import */ var _main_c_stundenplan_stundenplan_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./main/c/stundenplan/stundenplan.component */ "./src/app/main/c/stundenplan/stundenplan.component.ts");
/* harmony import */ var _main_c_error_error_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./main/c/error/error.component */ "./src/app/main/c/error/error.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var routes = [
    { path: '', component: _main_c_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"], canActivate: [_main_s_guard_service__WEBPACK_IMPORTED_MODULE_3__["GuardService"]] },
    { path: 'agb', component: _main_c_agb_agb_component__WEBPACK_IMPORTED_MODULE_4__["AgbComponent"] },
    { path: 'select', component: _main_c_select_select_component__WEBPACK_IMPORTED_MODULE_5__["SelectComponent"], canActivate: [_main_s_guard_service__WEBPACK_IMPORTED_MODULE_3__["GuardService"]] },
    {
        path: 'show',
        canActivate: [_main_s_guard_service__WEBPACK_IMPORTED_MODULE_3__["GuardService"]],
        children: [
            { path: '', component: _main_c_show_show_component__WEBPACK_IMPORTED_MODULE_6__["ShowComponent"] },
            { path: 'non-kurse', loadChildren: "app/verifynotkurse/verifynotkurse.module#VerifynotkurseModule" }
        ]
    },
    { path: 'cloud', component: _main_c_cloud_cloud_component__WEBPACK_IMPORTED_MODULE_7__["CloudComponent"], canActivate: [_main_s_guard_service__WEBPACK_IMPORTED_MODULE_3__["GuardService"]] },
    { path: 'about', component: _main_c_about_about_component__WEBPACK_IMPORTED_MODULE_8__["AboutComponent"] },
    { path: 'stundenplan', component: _main_c_stundenplan_stundenplan_component__WEBPACK_IMPORTED_MODULE_9__["StundenplanComponent"], canActivate: [_main_s_guard_service__WEBPACK_IMPORTED_MODULE_3__["GuardService"]] },
    { path: 'help', loadChildren: "app/help/help.module#HelpModule" },
    { path: '**', component: _main_c_error_error_component__WEBPACK_IMPORTED_MODULE_10__["ErrorComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: MyHammerConfig, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyHammerConfig", function() { return MyHammerConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _main_c_A_root_app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main/c/A_root/app.component */ "./src/app/main/c/A_root/app.component.ts");
/* harmony import */ var _main_c_agb_agb_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./main/c/agb/agb.component */ "./src/app/main/c/agb/agb.component.ts");
/* harmony import */ var _main_c_login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./main/c/login/login.component */ "./src/app/main/c/login/login.component.ts");
/* harmony import */ var _main_s_guard_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./main/s/guard.service */ "./src/app/main/s/guard.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _main_c_select_select_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./main/c/select/select.component */ "./src/app/main/c/select/select.component.ts");
/* harmony import */ var _main_c_select_stufe_stufe_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./main/c/select/stufe/stufe.component */ "./src/app/main/c/select/stufe/stufe.component.ts");
/* harmony import */ var _main_s_network_netw_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./main/s/network/netw.service */ "./src/app/main/s/network/netw.service.ts");
/* harmony import */ var _main_s_alert_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./main/s/alert.service */ "./src/app/main/s/alert.service.ts");
/* harmony import */ var _main_c_select_kurse_kurse_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./main/c/select/kurse/kurse.component */ "./src/app/main/c/select/kurse/kurse.component.ts");
/* harmony import */ var _main_c_show_show_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./main/c/show/show.component */ "./src/app/main/c/show/show.component.ts");
/* harmony import */ var _main_c_show_ttcontainer_ttcontainer_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./main/c/show/ttcontainer/ttcontainer.component */ "./src/app/main/c/show/ttcontainer/ttcontainer.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _main_c_cloud_cloud_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./main/c/cloud/cloud.component */ "./src/app/main/c/cloud/cloud.component.ts");
/* harmony import */ var _main_c_about_about_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./main/c/about/about.component */ "./src/app/main/c/about/about.component.ts");
/* harmony import */ var _main_c_stundenplan_stundenplan_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./main/c/stundenplan/stundenplan.component */ "./src/app/main/c/stundenplan/stundenplan.component.ts");
/* harmony import */ var _main_c_error_error_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./main/c/error/error.component */ "./src/app/main/c/error/error.component.ts");
/* harmony import */ var _main_s_refreshtt_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./main/s/refreshtt.service */ "./src/app/main/s/refreshtt.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _main_s_base_base_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./main/s/base/base.service */ "./src/app/main/s/base/base.service.ts");
/* harmony import */ var _main_c_select_kurse_get_from_kurse_modal_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./main/c/select/kurse/get-from-kurse-modal.component */ "./src/app/main/c/select/kurse/get-from-kurse-modal.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _main_sure_sure_dialog_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./main/sure/sure.dialog.component */ "./src/app/main/sure/sure.dialog.component.ts");
/* harmony import */ var _verifynotkurse_verifynotkurse_module__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./verifynotkurse/verifynotkurse.module */ "./src/app/verifynotkurse/verifynotkurse.module.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




























var MyHammerConfig = /** @class */ (function (_super) {
    __extends(MyHammerConfig, _super);
    function MyHammerConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyHammerConfig.prototype.buildHammer = function (element) {
        return new Hammer(element, {
            touchAction: 'auto',
            inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
            recognizers: [
                [Hammer.Swipe, {
                        direction: Hammer.DIRECTION_HORIZONTAL
                    }]
            ]
        });
    };
    return MyHammerConfig;
}(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["HammerGestureConfig"]));

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _main_c_A_root_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _main_c_agb_agb_component__WEBPACK_IMPORTED_MODULE_4__["AgbComponent"],
                _main_c_login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"],
                _main_c_select_select_component__WEBPACK_IMPORTED_MODULE_8__["SelectComponent"],
                _main_c_select_stufe_stufe_component__WEBPACK_IMPORTED_MODULE_9__["StufeComponent"],
                _main_c_select_kurse_kurse_component__WEBPACK_IMPORTED_MODULE_12__["KurseComponent"],
                _main_c_show_show_component__WEBPACK_IMPORTED_MODULE_13__["ShowComponent"],
                _main_c_show_ttcontainer_ttcontainer_component__WEBPACK_IMPORTED_MODULE_14__["TtcontainerComponent"],
                _main_c_cloud_cloud_component__WEBPACK_IMPORTED_MODULE_17__["CloudComponent"],
                _main_c_about_about_component__WEBPACK_IMPORTED_MODULE_18__["AboutComponent"],
                _main_c_stundenplan_stundenplan_component__WEBPACK_IMPORTED_MODULE_19__["StundenplanComponent"],
                _main_c_error_error_component__WEBPACK_IMPORTED_MODULE_20__["ErrorComponent"],
                _main_c_select_kurse_get_from_kurse_modal_component__WEBPACK_IMPORTED_MODULE_24__["GetFromKurseModalComponent"],
                _main_sure_sure_dialog_component__WEBPACK_IMPORTED_MODULE_26__["SureDialogComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatDialogModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_25__["AppRoutingModule"],
                _verifynotkurse_verifynotkurse_module__WEBPACK_IMPORTED_MODULE_27__["VerifynotkurseModule"]
            ],
            providers: [
                _main_s_base_base_service__WEBPACK_IMPORTED_MODULE_23__["BaseService"],
                { provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["LOCALE_ID"], useValue: "de" },
                _main_s_guard_service__WEBPACK_IMPORTED_MODULE_6__["GuardService"],
                _main_s_network_netw_service__WEBPACK_IMPORTED_MODULE_10__["NetwService"],
                _main_s_alert_service__WEBPACK_IMPORTED_MODULE_11__["AlertService"],
                _main_s_refreshtt_service__WEBPACK_IMPORTED_MODULE_21__["RefreshttService"],
                {
                    provide: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["HAMMER_GESTURE_CONFIG"],
                    useClass: MyHammerConfig
                },
                { provide: _angular_common__WEBPACK_IMPORTED_MODULE_22__["APP_BASE_HREF"], useValue: '/' }
            ],
            bootstrap: [_main_c_A_root_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
            entryComponents: [_main_c_select_kurse_get_from_kurse_modal_component__WEBPACK_IMPORTED_MODULE_24__["GetFromKurseModalComponent"], _main_sure_sure_dialog_component__WEBPACK_IMPORTED_MODULE_26__["SureDialogComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/conf.ts":
/*!*************************!*\
  !*** ./src/app/conf.ts ***!
  \*************************/
/*! exports provided: CONFIG, APP_VERSION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONFIG", function() { return CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_VERSION", function() { return APP_VERSION; });
var domain = "https://proxy.fosefx.com";
var baseUrl = domain + '/v2/http://gymnasium-wuerselen.de/untis/';
var dd = "https://bettergymwue.firebaseio.com/";
var CONFIG = {
    baseURL: baseUrl,
    credentialsCheckUrl: baseUrl + 'Schueler-Stundenplan/frames/navbar.htm',
    credentialsCheckLehrerUrl: baseUrl + 'Lehrer-Stundenplan/frames/navbar.htm',
    baseKursURL: baseUrl + 'Schueler-Stundenplan/',
    dbUrl: dd + 'kurse/',
    vertURL: baseUrl + 'Schueler/',
    lehrerURL: baseUrl + 'Lehrer/',
    databaseURL: dd,
    ferienUrl: dd + "ferien/ferien.json",
    ferienEndsUrl: dd + "ferien/ends.json",
    resets: dd + "resets.json",
    resetHeader: dd + "resetMsg/header.json",
    resetMsg: dd + "resetMsg/message.json",
    message: dd + "header.json",
    hashURL: domain + "/v2/hash",
    versionURL: domain + "/v2/version"
};
var APP_VERSION = "1.6.3 Beta";


/***/ }),

/***/ "./src/app/main/c/A_root/app.component.css":
/*!*************************************************!*\
  !*** ./src/app/main/c/A_root/app.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".hamnav{\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  display: block;\n  height: 100%;\n  background: whitesmoke;\n  z-index: 100;\n}\n.hamnav *{\n  position: relative;\n  z-index: 101;\n}\nmat-toolbar{\n  z-index: 100;\n}\n.head{\n  background: url('nav.jpg') no-repeat right top;\n  color: white;\n  padding: 65px 5px 5px 15px;\n}\n.head *{\n   font-weight: lighter!important;\n }\nsmall{\n  color: lightgrey!important;\n}\nmat-nav-list{\n  color: #444444;\n}\ni{\n  color: rgba(0, 0, 0, 0.7);\n}\n.notToolbar{\n  top: 56px;\n  height: calc(100vh - 56px);\n}\n@media (max-width: 300px){\n  .title{\n    display: none ;\n  }\n}\nhr{\n  margin-top: 0!important;\n  margin-bottom: 0!important;\n  width: 90%!important;\n  opacity: 0.3;\n}\n#cntnd{\n  overflow-y: visible;\n}\n@media (max-width: 345px) {\n  #idekam{\n    padding: 0;\n  }\n}\nmat-nav-list{\n  padding-bottom: 1em;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWFpbi9jL0Ffcm9vdC9hcHAuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlEQUFpRDtFQUNqRCxjQUFjO0VBQ2QsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QixZQUFZO0FBQ2Q7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQixZQUFZO0FBQ2Q7QUFDQTtFQUNFLFlBQVk7QUFDZDtBQUVBO0VBQ0UsOENBQWlFO0VBQ2pFLFlBQVk7RUFDWiwwQkFBMEI7QUFDNUI7QUFBQztHQUNFLDhCQUE4QjtDQUNoQztBQUNEO0VBQ0UsMEJBQTBCO0FBQzVCO0FBQ0E7RUFDRSxjQUFjO0FBQ2hCO0FBQ0E7RUFDRSx5QkFBeUI7QUFDM0I7QUFFQTtFQUNFLFNBQVM7RUFDVCwwQkFBMEI7QUFDNUI7QUFDQTtFQUNFO0lBQ0UsY0FBYztFQUNoQjtBQUNGO0FBQ0E7RUFDRSx1QkFBdUI7RUFDdkIsMEJBQTBCO0VBQzFCLG9CQUFvQjtFQUNwQixZQUFZO0FBQ2Q7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0U7SUFDRSxVQUFVO0VBQ1o7QUFDRjtBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCIiwiZmlsZSI6InNyYy9hcHAvbWFpbi9jL0Ffcm9vdC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oYW1uYXZ7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZDogd2hpdGVzbW9rZTtcbiAgei1pbmRleDogMTAwO1xufVxuLmhhbW5hdiAqe1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDEwMTtcbn1cbm1hdC10b29sYmFye1xuICB6LWluZGV4OiAxMDA7XG59XG5cbi5oZWFke1xuICBiYWNrZ3JvdW5kOiB1cmwoXCIuLi8uLi8uLi8uLi9hc3NldHMvbmF2LmpwZ1wiKSBuby1yZXBlYXQgcmlnaHQgdG9wO1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDY1cHggNXB4IDVweCAxNXB4O1xufS5oZWFkICp7XG4gICBmb250LXdlaWdodDogbGlnaHRlciFpbXBvcnRhbnQ7XG4gfVxuc21hbGx7XG4gIGNvbG9yOiBsaWdodGdyZXkhaW1wb3J0YW50O1xufVxubWF0LW5hdi1saXN0e1xuICBjb2xvcjogIzQ0NDQ0NDtcbn1cbml7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNyk7XG59XG5cbi5ub3RUb29sYmFye1xuICB0b3A6IDU2cHg7XG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDU2cHgpO1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDMwMHB4KXtcbiAgLnRpdGxle1xuICAgIGRpc3BsYXk6IG5vbmUgO1xuICB9XG59XG5ocntcbiAgbWFyZ2luLXRvcDogMCFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1ib3R0b206IDAhaW1wb3J0YW50O1xuICB3aWR0aDogOTAlIWltcG9ydGFudDtcbiAgb3BhY2l0eTogMC4zO1xufVxuXG4jY250bmR7XG4gIG92ZXJmbG93LXk6IHZpc2libGU7XG59XG5AbWVkaWEgKG1heC13aWR0aDogMzQ1cHgpIHtcbiAgI2lkZWthbXtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG59XG5cbm1hdC1uYXYtbGlzdHtcbiAgcGFkZGluZy1ib3R0b206IDFlbTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/main/c/A_root/app.component.html":
/*!**************************************************!*\
  !*** ./src/app/main/c/A_root/app.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-drawer-container autosize style=\"width: 100%; height: 100%; overflow-x: hidden;overflow-y: visible!important;\">\n\n  <mat-drawer #hamNav mode=\"over\" class=\"hamnav\">\n    <div class=\"head\">\n      <h2>Better Gym Wue</h2>\n      <h3><small class=\"text-muted\">Made by @FoseFx</small></h3>\n    </div>\n    <mat-nav-list>\n      <ng-container *ngIf=\"!!win.installpromptevent\">\n        <hr><br>\n        <a mat-list-item (click)=\"install()\"><b><i class=\"material-icons\">get_app</i>&nbsp; Installieren</b></a>\n        <br><hr>\n      </ng-container>\n      <a mat-list-item routerLink=\"/\" (click)=\"hamNav.close()\"><i class=\"material-icons\">home</i>&nbsp; Home</a>\n      <a mat-list-item routerLink=\"cloud\" (click)=\"hamNav.close()\"><i class=\"material-icons\">cloud</i>&nbsp; Kurs-Cloud</a>\n      <hr>\n\n      <a [ngClass]=\"{'disabled': !credentialsLiegen}\" mat-list-item routerLink='/' [queryParams]=\"{'force': true}\" (click)=\"hamNav.close()\"><i class=\"material-icons\">school</i>&nbsp; Lehrer Zugang hinzufügen</a>\n      <a mat-list-item [ngClass]=\"{'disabled': !baseService.myKurse}\" routerLink=\"stundenplan\" (click)=\"hamNav.close()\"><i class=\"material-icons\">assignment</i>&nbsp;Stundenplan</a>\n      <hr>\n      <a mat-list-item [ngClass]=\"{'disabled': !baseService.myKurse}\" (click)=\"removeKurse()\"><i class=\"material-icons\">delete</i>&nbsp; Kurse löschen</a>\n      <a mat-list-item [ngClass]=\"{'disabled': !baseService.KlassenKurse}\" (click)=\"hamNav.close()\" routerLink=\"/show/non-kurse\"><i class=\"material-icons\">swap_horiz</i>&nbsp; Nicht-Kurse ändern</a>\n      <a mat-list-item [ngClass]=\"{'disabled': !baseService.myKurse}\" (click)=\"refreshTT()\"><i class=\"material-icons\">refresh</i>&nbsp; Stundenplan aktualisieren</a>\n      <hr>\n      <a mat-list-item routerLink=\"agb\" (click)=\"hamNav.close()\"><i class=\"material-icons\">gavel</i>&nbsp; Wichtige Hinweise</a>\n      <a mat-list-item routerLink=\"about\" (click)=\"hamNav.close()\"><i class=\"material-icons\">account_circle</i>&nbsp; Über</a>\n      <hr>\n      <a mat-list-item routerLink=\"help\" (click)=\"hamNav.close()\"><i class=\"material-icons\">live_help</i>&nbsp; Hilfe & Feedback</a>\n    </mat-nav-list>\n\n  </mat-drawer>\n\n  <div id=\"cntnd\" #cntnd (swiperight)=\"swipe('r', $event)\" (swipeleft)=\"swipe('l', $event)\" style=\"height: 100%;min-height: 100vh; width: 100%; overflow-x: hidden\">\n\n    <mat-toolbar style=\"position:relative;z-index: 100;\" color=\"primary\">\n      <button mat-icon-button name=\"Open/Close Menu\" (click)=\"hamNav.toggle()\">\n        <mat-icon >menu</mat-icon>\n      </button>\n      <span class=\"title\">&nbsp; Better Gym Wue</span>\n    </mat-toolbar>\n    <div class=\"pulseing\"\n\t\t\t\t *ngIf=\"updateAv && !win.location.href.includes('about')\"\n\t\t\t\t style=\"width: 100%!important; height: 26px; text-align: center; padding-top: 4px\">\n\t\t\t<p style=\"color: black; margin: 3px 0 0 0!important;\">Zum Updaten neuladen (Infos s. \"Über\")</p>\n\t\t</div>\n\n\t\t<div class=\"pulseing\"\n\t\t\t\t style=\"width: 100%!important; height: 26px; text-align: center; padding-top: 4px\"\n\t\t\t\t\t*ngIf=\"needsRefresh\">\n\t\t\t<p style=\"color: black; margin: 3px 0 0 0!important;\">BGW hat einen neuen Stundenplan erkannt.</p>\n\t\t</div>\n\n    <mat-card *ngIf=\"baseService.justResetted\" class=\"center\" style=\"position:relative; text-align: left!important; padding-bottom: 50px; margin-bottom: 10px!important;\">\n      <mat-card-header>\n        <mat-icon mat-card-avatar>announcement</mat-icon>\n        <mat-card-title>{{reset.header | async }}</mat-card-title><span style=\"clear: both\"></span>\n        <mat-card-subtitle>{{ reset.message  | async }}</mat-card-subtitle>\n      </mat-card-header>\n    </mat-card>\n\n    <mat-card *ngIf=\"(message.message$ | async)?.count > message.count\"\n      style=\"position:relative; text-align: left!important; padding-bottom: 50px; margin-bottom: 10px!important;\" class=\"center\">\n      <mat-card-header>\n        <mat-icon mat-card-avatar>announcement</mat-icon>\n        <mat-card-title>{{(message.message$ | async)?.title }}</mat-card-title><span style=\"clear: both\"></span>\n        <mat-card-subtitle [innerHTML]=\"(message.message$  | async)?.msg\"></mat-card-subtitle>\n      </mat-card-header>\n      <button mat-button style=\"display: block; position:absolute; right: 10px\" (click)=\"message.resetCount()\">Schließen</button>\n    </mat-card>\n\n    <div *ngIf=\"baseService.milchglas\" style=\"width: 100%; height: 100vh; position:fixed; z-index: 2; top: 0; left: 0; opacity: 0.7; background: white; display: flex; justify-content: center; align-items: center\">\n      <div class=\"spinner center\">\n        <div class=\"dot1\"></div>\n        <div class=\"dot2\"></div>\n      </div>\n    </div>\n    <div class=\"container notToolbar\" style=\"width: 100%!important;\">\n      <div class=\"col-xl-8 col-lg-10 col-sm-12 col-md-12 center\" id=\"idekam\" style=\"overflow-y: auto\">\n        <router-outlet *ngIf=\"done\" style=\"z-index: 0!important; width: 100%\" id=\"rootRoute\"></router-outlet>\n      </div>\n    </div>\n  </div>\n</mat-drawer-container>\n"

/***/ }),

/***/ "./src/app/main/c/A_root/app.component.ts":
/*!************************************************!*\
  !*** ./src/app/main/c/A_root/app.component.ts ***!
  \************************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _s_base_base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../s/base/base.service */ "./src/app/main/s/base/base.service.ts");
/* harmony import */ var _s_network_netw_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../s/network/netw.service */ "./src/app/main/s/network/netw.service.ts");
/* harmony import */ var _s_refreshtt_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../s/refreshtt.service */ "./src/app/main/s/refreshtt.service.ts");
/* harmony import */ var _angular_common_locales_de__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/locales/de */ "./node_modules/@angular/common/locales/de.js");
/* harmony import */ var _angular_common_locales_de__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_de__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _s_message_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../s/message.service */ "./src/app/main/s/message.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _sure_sure_dialog_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../sure/sure.dialog.component */ "./src/app/main/sure/sure.dialog.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["registerLocaleData"])(_angular_common_locales_de__WEBPACK_IMPORTED_MODULE_4___default.a);
var AppComponent = /** @class */ (function () {
    function AppComponent(baseService, netwService, refresh, message, dialog) {
        this.baseService = baseService;
        this.netwService = netwService;
        this.refresh = refresh;
        this.message = message;
        this.dialog = dialog;
        this.done = true;
        this.updateAv = false;
        this.needsRefresh = false;
        this.reset = { header: undefined, message: undefined };
    }
    ;
    Object.defineProperty(AppComponent.prototype, "win", {
        get: function () {
            return window;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.install = function () {
        this.baseService.install();
        this.hamnav.close();
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.baseService.myKurse)
            this.refresh.needsRefresh().then(function (r) { return _this.needsRefresh = r; });
        this.baseService.needsUpdate().then(function () { _this.updateAv = true; }).catch();
        if (this.baseService.justResetted) {
            this.reset.header = this.baseService.getResetHeader();
            this.reset.message = this.baseService.getResetMessage();
        }
    };
    AppComponent.prototype.swipe = function (type, e) {
        if (document.getElementsByClassName("fuckYou")[0].contains(e.target))
            return;
        if (type === 'r' && this.hamnav.opened === false) {
            this.hamnav.open();
        }
        if (type === 'l') {
            this.hamnav.close();
        }
    };
    AppComponent.prototype.removeKurse = function () {
        var _this = this;
        this.hamnav.close();
        var dialogRef = this.dialog.open(_sure_sure_dialog_component__WEBPACK_IMPORTED_MODULE_8__["SureDialogComponent"]);
        dialogRef.afterClosed().subscribe(function (v) {
            if (v) {
                _this.refresh.removeKurse();
                rl();
            }
        });
    };
    AppComponent.prototype.refreshTT = function () {
        var _this = this;
        this.hamnav.close();
        var dialogRef = this.dialog.open(_sure_sure_dialog_component__WEBPACK_IMPORTED_MODULE_8__["SureDialogComponent"]);
        dialogRef.afterClosed().subscribe(function (v) {
            if (v)
                _this.refresh.refreshTT().then(function () {
                    rl();
                });
        });
    };
    Object.defineProperty(AppComponent.prototype, "credentialsLiegen", {
        get: function () {
            if (!this.baseService.credentials)
                return false;
            return !this.baseService.credentials.l;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('hamNav'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "hamnav", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('cntnd'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "content", void 0);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/main/c/A_root/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/main/c/A_root/app.component.css")]
        }),
        __metadata("design:paramtypes", [_s_base_base_service__WEBPACK_IMPORTED_MODULE_1__["BaseService"], _s_network_netw_service__WEBPACK_IMPORTED_MODULE_2__["NetwService"],
            _s_refreshtt_service__WEBPACK_IMPORTED_MODULE_3__["RefreshttService"], _s_message_service__WEBPACK_IMPORTED_MODULE_6__["MessageService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialog"]])
    ], AppComponent);
    return AppComponent;
}());

function rl() {
    setTimeout(function () {
        location.reload();
    }, 500);
}


/***/ }),

/***/ "./src/app/main/c/about/about.component.css":
/*!**************************************************!*\
  !*** ./src/app/main/c/about/about.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21haW4vYy9hYm91dC9hYm91dC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/main/c/about/about.component.html":
/*!***************************************************!*\
  !*** ./src/app/main/c/about/about.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"center\" style=\"margin-bottom: 50px!important; margin-top: 10px!important;\">\n  <br>\n  <h1>Better Gym Wue <span class=\"text-muted\">v. {{version}}</span></h1>\n  <p>Dieser Service wird nicht von dem Gymnasium der Stadt Würselen unterstützt oder gesponsert und ist ein alleiniges Projekt von FoseFx </p>\n\n  <div *ngIf=\"up\">\n    <div class=\"pulseing\" style=\"width: 100%; height: 2px;\"></div><br>\n    <h2 class=\"text-muted\">Update:</h2>\n\t\t<ul class=\"text-muted\" style=\"margin-left: 10px\"><li *ngFor=\"let m of msg;\"><b>{{m}}</b></li></ul>\n    <p>Für Updates musst du BGW einfach aktualisieren. D.h. im Browser z.B. <b>F5</b> oder <b>Shift + F5</b>. Oder einfach auf den Button klicken:</p>\n    <div style=\"width: 100%; height: 150px; display: flex; align-items: center; justify-content: center;\">\n      <button mat-raised-button onclick=\"location.reload()\" style=\"height:44px!important;\">\n        <mat-icon class=\"pulseing-color\" style=\"transform: rotate(40deg) scale(-1, 1)\">replay</mat-icon>\n      </button>\n    </div>\n    <p>Das musst du ggf. mehmals machen, wenn es nicht funktioniert, versuch es später nochmal.</p>\n    <div class=\"pulseing\" style=\"width: 100%; height: 2px;\"></div>\n    <br>\n  </div>\n\n\n  <hr *ngIf=\"!up\">\n  <h2>Legende:</h2>\n  <mat-card>\n    <h2><small class=\"text-muted\">Info-Box:</small></h2>\n    <table style=\"width: 80%; text-align: center; margin: 0 auto;\" class=\"table table-sm\">\n      <tbody>\n      <tr><td class=\"bold\">Überschrift</td></tr>\n      <tr><td>Normale Informationen</td></tr>\n      <tr><td class=\"schulplaner\">Informationen aus dem Schulplaner</td></tr>\n      </tbody>\n    </table>\n    <br>\n    <h2><small class=\"text-muted\">Vertretungsdaten:</small></h2>\n    <br>\n    <table class=\"table table-hover\" style=\"width: 80%; margin: 0 auto; text-align: center\">\n      <tbody>\n      <tr><td>Normaler Unterricht</td></tr>\n      <tr><td class=\"vertretung\">Vertretung</td></tr>\n      <tr><td class=\"entfall\">Entfall (oder Selbst. Arbeiten)</td></tr>\n      <tr><td class=\"raumV\">Raumvertretung</td></tr>\n      <tr><td class=\"klausur\">Klausur</td></tr>\n      <tr><td class=\"uncertain\">Lehrer fehlt, keine weiteren Informationen</td></tr>\n      </tbody>\n    </table>\n  </mat-card>\n  <br>\n  <hr>\n  <br>\n  <mat-card>\n    <h2>Source Code</h2>\n    <p>Der Code ist <a href=\"https://github.com/FoseFx/BetterGymWue\">in diesem GitHub Repo</a> zu finden</p>\n    <br>\n    <h2>Spenden?</h2>\n    <p>BTC Adresse: <a href=\"bitcoin:1KN1mKBuacfZaDgPAzd3U78uthSjSY41uQ\">1KN1mKBuacfZaDgPAzd3U78uthSjSY41uQ</a><br>\n        Paysafecard Restguthaben:\n        <a href=\"mailto:fosefx@pm.me?subject=BGW%20Paysafecard%20Spende&body=Hier%20eine%20Paysafecard%20Spende%3A%20%0A%0AHIER%20DEN%20PSC%20CODE%20EINF%C3%9CGEN%0A%0AMfg%0ADEIN%20NAME\">\n          fosefx@pm.me\n        </a>\n      <br>\n      <b>Vielen Dank, dass du das Projekt unterstützt!</b>\n    </p>\n    <br>\n  </mat-card>\n\n<hr>\n  <br><br><br>\n  <mat-card>\n\n    <h2>FAQ</h2>\n    <h3>Wer hat das gemacht?</h3>\n    <p><a href=\"http://fosefx.com/\">Ich.</a></p>\n    <div style=\"clear: left\"></div>\n\n    <h3>Gibt es irgendetwas was ich wissen muss?</h3>\n    <p> Die Kurs Cloud wir zu jedem Halbjahr zurückgesetzt.</p>\n    <div style=\"clear: left\"></div>\n\n    <h3>Wie viel mobile Daten werden verbraucht?</h3>\n    <p>Beim ersten laden (inklusive Setup von Kursen etc.) werden in etwa <span class=\"text-muted\">1.6 MB</span> verbraucht. Danach sollten nur etwa <span class=\"text-muted\">40 KB</span> anfallen!</p>\n\n    <div style=\"clear: left\"></div>\n    <h3> Brauch ich ständig internet?</h3>\n    <p>Nein. Für eine Verbindung zu den Vertretungsdaten natürlich schon.</p>\n    <div style=\"clear: left\"></div>\n\n    <h3>Warum nicht die <a>App</a>?</h3>\n    <ul style=\"margin-left: 3em; margin-right: 3em;\">\n      <li>Keine Sicherheitsprobleme (wie hart gecodete Passwörter)</li>\n      <li>Bessere Visuals</li>\n      <li>Multiplatform Support (iOS, Android, Windows[Phones], OsX, Linux, sogar dein f*cking Fernseher)</li>\n      <li>Kurs Cloud</li>\n    </ul>\n    <div style=\"clear: left\"></div>\n\n    <h3>Sind meine Daten sicher?</h3>\n    <p>Ja. Um <a href=\"https://de.wikipedia.org/wiki/Cross-Origin_Resource_Sharing\">CORS</a> Verbote zu umgehen verwende ich ein Proxy Script, welches die angefragten Daten kurz zwischengespeichert. Der Code dafür ist ebenfalls im  <a href=\"https://github.com/FoseFx/BetterGymWue\">Github Repo</a>. <b>Deine in der Kurscloud angegebenen Daten sind es nicht!</b> Das System ist autorisierungsfrei aufgebaut, keine Nutzer, keine Passwörter. Das löschen dieser ist nicht mehr möglich, da es keine Möglichkeit gibt zu Beweisen, dass du die ID registriert hast. (Das überschreiben aber auch nicht).</p>\n\n    <div style=\"clear: left\"></div>\n\n    <h3>Wo werden meine Daten gespeichert?</h3>\n    <p>Ich verwende Firebase Realtime DB um die Kursdaten zu speichern. <b>Ist das nicht unsicher?</b> Nein. Google sagt da: <span class=\"text-muted\">\"Neither party will use or disclose the other party's Confidential Information without the other's prior written consent except for the purpose of performing its obligations under this Agreement or if required by law, regulation or court order; in which case, the party being compelled to disclose Confidential Information will give the other party as much notice as is reasonably practicable prior to disclosing the Confidential Information if permitted by law\"</span></p>\n    <div style=\"clear: left\"></div>\n  </mat-card>\n\n  <br><br>\n</mat-card>\n\n"

/***/ }),

/***/ "./src/app/main/c/about/about.component.ts":
/*!*************************************************!*\
  !*** ./src/app/main/c/about/about.component.ts ***!
  \*************************************************/
/*! exports provided: AboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutComponent", function() { return AboutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _s_base_base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../s/base/base.service */ "./src/app/main/s/base/base.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutComponent = /** @class */ (function () {
    function AboutComponent(base) {
        this.base = base;
        this.up = false;
        this.version = this.base.VERSION;
    }
    AboutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.base.needsUpdate()
            .then(function (arr) {
            _this.msg = arr;
            _this.up = true;
        })
            .catch();
    };
    AboutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-about',
            template: __webpack_require__(/*! ./about.component.html */ "./src/app/main/c/about/about.component.html"),
            styles: [__webpack_require__(/*! ./about.component.css */ "./src/app/main/c/about/about.component.css"), __webpack_require__(/*! ../show/ttcontainer/ttcontainer.component.css */ "./src/app/main/c/show/ttcontainer/ttcontainer.component.css")]
        }),
        __metadata("design:paramtypes", [_s_base_base_service__WEBPACK_IMPORTED_MODULE_1__["BaseService"]])
    ], AboutComponent);
    return AboutComponent;
}());



/***/ }),

/***/ "./src/app/main/c/agb/agb.component.html":
/*!***********************************************!*\
  !*** ./src/app/main/c/agb/agb.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card id=\"agb\" class=\"center\">\n  <h1 >Wichtige Hinweise</h1>\n  <h4 >Diese Version ist im Beta-Stadium, Fehler sind nicht ausgeschlossen</h4>\n  <hr>\n  <h3>Bedingungen</h3>\n  <p>\n\t\tDer Nutzer muss Schüler oder Angehöriger eines Schülers des Gymnasiums der Stadt Würselen sein.\n\t\tAusgeschlossen sind automatisierte Systeme.\n\t</p>\n\t<h3>Haftung</h3>\n\t<p>\n\t\tFür keine der Angezeigten Informationen wird Haftung übernommen. BGW soll zusätzlich zum normalen Vertetungs- und Stundenplan\n\t\tverwendet werden.\n\t</p>\n  <hr>\n  <h3>Datenschutzerklärung</h3>\n  <button  mat-raised-button *ngIf=\"!sdse\" (click)=\"sdse = true\">Zeige Datenschutzerklärung</button>\n  <div *ngIf=\"sdse\">\n\t\t<p>\n\t\t\tDiese Bestimmung gilt für die Domains \"bgw.fosefx.com\", \"bgw.fosefx.de\" und dazugehörig \"proxy.fosefx.com\" NICHT\n\t\t\t\"fosefx.com\" oder \"www.fosefx.com\".\n\t\t</p>\n    <strong>TL;DR</strong>\n\t\t<ul>\n\t\t\t<li>Ich habe Logdaten (IPs, User-Agents, URL etc.)</li>\n\t\t\t<li>Ich habe von dir ausgewählte Daten (Cloud)</li>\n\t\t\t<li>Und oben genanntes hat auch Google und Cloudflare</li>\n\t\t\t<li>Keine Cookies, keine Tracker, keine Werbung</li>\n\t\t</ul>\n\t\t<p>Warum und was genau? Weiter lesen!</p>\n\n\n\t\t<strong>Welche Informationen werden gesammelt? Und warum?</strong>\n\n\t\t<p>\n\t\t\tJede Anfrage, die auf einen Server von mir getätigt wird schickt dein Browser deine angefragte URL\n\t\t\t(bspw. \"https://proxy.fosefx.com/v2\") gesetzte Cookies (es werden keine Cookies gesetzt) den \"User-Agent\" und andere Http-Header mit.\n\t\t\tLetzterer ist ein Kurzer Text, der deinen Browser identifiziert\n\t\t\t(bspw. \"Mozilla/5.0 (Windows NT 6.1; rv:60.0) Gecko/20100101 Firefox/60.0\") (\"Logdaten\"). Bevor die Anfrage an meinem Server ankommt\n\t\t\tdurchläuft sie Cloudflare (Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA) Server.\n\t\t\tAll diese Daten werden von mir und Cloudflare analysiert um Risiken für den Server zu erkennen und zu blockieren.\n\t\t\tFür mehr Informationen zu Cloudflare:\n\t\t\t<a href=\"https://www.cloudflare.com/privacypolicy/\">https://www.cloudflare.com/privacypolicy/</a>. Für dich relevant\n\t\t\tsind die \"End User\" betreffenden Punkte.<br>\n\n\t\t\tDarüber hinaus werden, wenn du zustimmst (Normalfall), Informationen über deine Kurse auf den Servern von\n\t\t\tGoogle (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA ) für ein Halbjahr gespeichert um\n\t\t\tdie Kurs Cloud zu realisieren.<br>\n\n\t\t\tDiese Seite verwendet Google Fonts, ein Service von Google für Schriftarten. Dafür fragt der Browser bei Servern\n\t\t\tvon Google an und schickt Logdaten mit.<br>\n\n\t\t\tSolltest du das Hilfe Formular verwenden, werden auch diese Daten auf Google Servern gepeichert um sie später dort\n\t\t\taubrufen und verarbeiten zu können.<br>\n\n\t\t\tNebenbei: Bei Kontakt direkt an eine fosefx.com Adresse (\"max@fosefx.com\", \"info@fosefx.com\") wird deine Email verschlüsselt\n\t\t\tauf den Servern der Proton Technologies AG (Chemin du Pré-Fleuri, 3 CH-1228 Plan-les-Ouates, Genv, Schweiz)\n\t\t\tgespeichert. Vermutlich auch unverschlüsselt auf Servern deines Email Anbieters.\n\n\t\t</p>\n\n\t\t<strong>Welche Informationen werden NICHT gesammelt?</strong>\n\t\t<p>\n\t\t\t<b>Alles</b> andere.\n\t\t</p>\n\n\t\t<strong>Wie werden diese Daten and dritte weitergegeben?</strong>\n\t\t<p>\n\t\t\tDie oben genannten Anbieter erhalten die Informationen auf sicherem Weg (https/TLS verschlüsselte Verbindung).\n\t\t\tDabei werden die Daten nicht verkauft, sondern dienen nur den oben beschriebenen Gründen.\n\t\t</p>\n\n\t\t<strong>Welche Kontrolle hat ein Nutzer über seine Daten?</strong>\n\t\t<p>\n\t\t\tWenig. Da es keine Mölichkeit gibt zu beweisen, dass jemand zu seinen Daten gehört ist es nicht möglich Daten auf\n\t\t\tAnfrage zu löschen.\n\t\t</p>\n\n\t\t<strong>Wie sicher sind die Daten?</strong>\n\t\t<p>\n\t\t\tAlle bei Google gespeicherten Daten liegen auf Servern, die\n\t\t\t<a href=\"https://firebase.google.com/downloads/gdpr/2018_Firebase_ISO_27001.pdf\">ISO 27001</a>,\n\t\t\t<a href=\"https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc1report.html\">SOC 1</a>,\n\t\t\t<a href=\"https://www.aicpa.org/InterestAreas/FRC/AssuranceAdvisoryServices/Pages/AICPASOC2Report.aspx\">SOC 2</a>, und\n\t\t\t<a href=\"https://firebase.google.com/downloads/gdpr/2017_Firebase_SOC3_Report.pdf\">SOC 3</a> beständigt sind.\n\n\t\t\tDaten stehen im Falle von Nutzung US-amerikanischer Servern unter dem Schutz des\n\t\t\t<a href=\"https://www.privacyshield.gov/welcome\">Privacyshield Frameworks</a>.\n\t\t\tDies gilt sowohl für Cloudflare als auch Google.\n\n\t\t\tMein Server gehört zu einem Rechenzentrum in Limburg, Deutschland.\n\t\t</p>\n\n\t\t<strong>Änderungen dieser Bedingungen müssen erneut akzeptiert werden.</strong>\n\n\t\t<strong>Ansprechpartner</strong>\n\t\t<p>\n\t\t\tMax Baumann<br><a href=\"mailto:legal@fosefx.com\">legal@fosefx.com</a>\n\t\t</p>\n\n\t</div>\n<hr>\n\n  <p *ngIf=\"!redirected\">\n    <button mat-raised-button (click)=\"baseService.acceptAGB()\" class=\"big-btn green-btn\">Ich akzeptiere</button>\n  </p>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/main/c/agb/agb.component.scss":
/*!***********************************************!*\
  !*** ./src/app/main/c/agb/agb.component.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#agb {\n  margin-top: 10px !important;\n  margin-bottom: 50px !important; }\n\np, ul {\n  width: 80%;\n  margin: 0 auto;\n  text-align: justify; }\n\nh1, h2, h3, h4, strong {\n  text-align: center;\n  width: 100%;\n  display: block; }\n\nstrong {\n  padding-top: 10px;\n  padding-bottom: 10px; }\n\nbutton {\n  display: block;\n  margin: 0 auto !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL21heC9Eb2t1bWVudGUvV2ViIFByZ2N0cy9CZXR0ZXJHeW1XdWUvc291cmNlL3NyYy9hcHAvbWFpbi9jL2FnYi9hZ2IuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSwyQkFBMEI7RUFDMUIsOEJBQTZCLEVBQUE7O0FBRy9CO0VBQ0UsVUFBVTtFQUNWLGNBQWM7RUFDZCxtQkFBbUIsRUFBQTs7QUFFckI7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLGNBQWMsRUFBQTs7QUFHaEI7RUFDRSxpQkFBaUI7RUFDakIsb0JBQW9CLEVBQUE7O0FBR3RCO0VBQ0UsY0FBYztFQUNkLHlCQUF3QixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbWFpbi9jL2FnYi9hZ2IuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjYWdie1xuICBtYXJnaW4tdG9wOiAxMHB4IWltcG9ydGFudDtcbiAgbWFyZ2luLWJvdHRvbTogNTBweCFpbXBvcnRhbnQ7XG59XG5cbnAsIHVse1xuICB3aWR0aDogODAlO1xuICBtYXJnaW46IDAgYXV0bztcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcbn1cbmgxLCBoMiwgaDMsIGg0LCBzdHJvbmcge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuc3Ryb25ne1xuICBwYWRkaW5nLXRvcDogMTBweDtcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XG59XG5cbmJ1dHRvbntcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogMCBhdXRvIWltcG9ydGFudDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/main/c/agb/agb.component.ts":
/*!*********************************************!*\
  !*** ./src/app/main/c/agb/agb.component.ts ***!
  \*********************************************/
/*! exports provided: AgbComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgbComponent", function() { return AgbComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _s_base_base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../s/base/base.service */ "./src/app/main/s/base/base.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AgbComponent = /** @class */ (function () {
    function AgbComponent(baseService) {
        this.baseService = baseService;
        this.sdse = false;
    }
    AgbComponent.prototype.ngOnInit = function () {
        this.redirected = this.baseService.acceptedAGB;
    };
    AgbComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-agb',
            template: __webpack_require__(/*! ./agb.component.html */ "./src/app/main/c/agb/agb.component.html"),
            styles: [__webpack_require__(/*! ./agb.component.scss */ "./src/app/main/c/agb/agb.component.scss")]
        }),
        __metadata("design:paramtypes", [_s_base_base_service__WEBPACK_IMPORTED_MODULE_1__["BaseService"]])
    ], AgbComponent);
    return AgbComponent;
}());



/***/ }),

/***/ "./src/app/main/c/cloud/cloud.component.css":
/*!**************************************************!*\
  !*** ./src/app/main/c/cloud/cloud.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container{\n  width: 80%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWFpbi9jL2Nsb3VkL2Nsb3VkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxVQUFVO0FBQ1oiLCJmaWxlIjoic3JjL2FwcC9tYWluL2MvY2xvdWQvY2xvdWQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXJ7XG4gIHdpZHRoOiA4MCU7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/main/c/cloud/cloud.component.html":
/*!***************************************************!*\
  !*** ./src/app/main/c/cloud/cloud.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card *ngIf=\"baseService.kursID\" class=\"center\" style=\"margin-top: 10px!important; margin-bottom: 50px!important;\">\n  <br><br>\n  <h1 class=\"center\">Dein Kurs-Cloud Code:</h1>\n  <h2 class=\"text-muted center\">{{baseService.kursID}}</h2>\n  <br>\n  <p><a [href]=\"'https://bettergymwue.firebaseio.com/kurse/' + baseService.kursID + '.json?print=pretty'\">API-Link</a></p>\n  <div style=\"text-align: left\">\n    <h3>Konfiguration:</h3>\n    <h3><small class=\"text-muted\">Stufe/Klasse: </small>{{baseService.myStufe}}</h3><br>\n    <table *ngIf=\"baseService.myKurse.length > 0\" class=\"table table-hover table-sm\" style=\"width: 75%;margin: 0 auto; text-align: center\">\n      <tbody>\n      <tr><th>Slot</th><th>Kurs</th><th>Lehrer</th></tr>\n      <tr *ngFor=\"let kurs of baseService.myKurse\">\n        <td>{{kurs.title}}</td>\n        <td>{{kurs.fach}}</td>\n        <td>{{kurs.lehrer}}</td>\n      </tr>\n      </tbody>\n    </table><br>\n    <h2>Wie kann ich das ändern?</h2>\n    <i class=\"material-icons\" style=\"color: #444; font-size: 40px;float: left;\">format_quote</i><p>Gar nicht. Das System ist so aufgebaut, dass jede ID genau einmal gesetzt werden kann und dann nicht mehr bearbeitet werden kann. Dies hat den Vorteil, dass man keine Verifizierung (User/Psw) benötigt. Um dir eine neue ID zu generieren, kannst du deine Kurse löschen und neu eingeben.</p>\n  </div>\n  <a routerLink=\"/\" class=\"btn btn-link\">Home</a>\n  <br>\n  <br>\n  <br>\n</mat-card>\n\n<mat-card *ngIf=\"!baseService.kursID\" class=\"center\" style=\"margin-top: 10px!important; margin-bottom: 50px!important;\">\n  <br>\n  <h1>Kurs Cloud</h1>\n  <p>So wie es aussieht, verwendest du die Kurs-Cloud nicht. Sollte das falsch sein, lösche deine Kurse und gibt deine Kurs Cloud ID\n  im Konfigurationsprozess ein. Wenn du die Kurs Cloud mit deiner aktuellen Konfiguration aktivieren möchtest, kannst du das mit nur einem Klick.\n  Du bekommst dann einen Code, welchen du überall (iOs, Android, Windows, sprich X-Platform) verwenden kannst, um deine Kurse nicht immer neu\n  eingeben zu müssen. Die Kurs-Cloud wird jedes Halbjahr zurückgesetzt.</p>\n\n  <button mat-raised-button color=\"primary\" [ngClass]=\"{'disabled': clicked}\" (click)=\"activateCloud()\">Aktiviere Kurs Cloud</button>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/main/c/cloud/cloud.component.ts":
/*!*************************************************!*\
  !*** ./src/app/main/c/cloud/cloud.component.ts ***!
  \*************************************************/
/*! exports provided: CloudComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudComponent", function() { return CloudComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _s_base_base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../s/base/base.service */ "./src/app/main/s/base/base.service.ts");
/* harmony import */ var _s_network_netw_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../s/network/netw.service */ "./src/app/main/s/network/netw.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CloudComponent = /** @class */ (function () {
    function CloudComponent(baseService, ntwrkService, ref) {
        this.baseService = baseService;
        this.ntwrkService = ntwrkService;
        this.ref = ref;
        this.clicked = false;
    }
    CloudComponent.prototype.ngOnInit = function () {
    };
    CloudComponent.prototype.activateCloud = function () {
        var _this = this;
        if (this.clicked)
            return;
        this.clicked = true;
        this.ntwrkService.saveKurse(this.baseService.myKurse).then(function (code) { console.log(code); _this.ref.detectChanges(); });
    };
    CloudComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-cloud',
            template: __webpack_require__(/*! ./cloud.component.html */ "./src/app/main/c/cloud/cloud.component.html"),
            styles: [__webpack_require__(/*! ./cloud.component.css */ "./src/app/main/c/cloud/cloud.component.css")]
        }),
        __metadata("design:paramtypes", [_s_base_base_service__WEBPACK_IMPORTED_MODULE_1__["BaseService"], _s_network_netw_service__WEBPACK_IMPORTED_MODULE_2__["NetwService"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], CloudComponent);
    return CloudComponent;
}());



/***/ }),

/***/ "./src/app/main/c/error/error.component.css":
/*!**************************************************!*\
  !*** ./src/app/main/c/error/error.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21haW4vYy9lcnJvci9lcnJvci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/main/c/error/error.component.html":
/*!***************************************************!*\
  !*** ./src/app/main/c/error/error.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<br>\n<div class=\"container\" *ngIf=\"lenght == 0\">\n  <h1>Hier ist nichts!</h1>\n  <h2><small class=\"text-muted\">Warum auch immer, aber hier ist nichts!</small></h2>\n  <p><a routerLink=\"/\">Zurück</a></p>\n</div>\n<div class=\"container\" *ngIf=\"!!route.snapshot.queryParams.oldBrowser\">\n  <h1>Dein Browser wird nicht unterstützt!</h1>\n  <h2><small class=\"text-muted\"><a href=\"https://chrome.google.com\">Google Chrome</a></small></h2>\n</div>\n<div class=\"container\" *ngIf=\"route.snapshot.queryParams.dead\">\n  <h1>Diese Version ist Tot.</h1>\n  <h2><small class=\"text-muted\">Diese BGW Version ist funktioniert nicht länger.\n    <br><a style=\"color: blue\" onclick=\"location.reload()\">F5 drücken (oder halt hier, ggf. mehrmals)</a></small></h2>\n</div>\n"

/***/ }),

/***/ "./src/app/main/c/error/error.component.ts":
/*!*************************************************!*\
  !*** ./src/app/main/c/error/error.component.ts ***!
  \*************************************************/
/*! exports provided: ErrorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorComponent", function() { return ErrorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ErrorComponent = /** @class */ (function () {
    function ErrorComponent(route) {
        this.route = route;
    }
    Object.defineProperty(ErrorComponent.prototype, "lenght", {
        get: function () {
            return Object.keys(this.route.snapshot.queryParams).length;
        },
        enumerable: true,
        configurable: true
    });
    ErrorComponent.prototype.ngOnInit = function () {
        console.log(this.route.snapshot.queryParams);
    };
    ErrorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-error',
            template: __webpack_require__(/*! ./error.component.html */ "./src/app/main/c/error/error.component.html"),
            styles: [__webpack_require__(/*! ./error.component.css */ "./src/app/main/c/error/error.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], ErrorComponent);
    return ErrorComponent;
}());



/***/ }),

/***/ "./src/app/main/c/login/login.component.css":
/*!**************************************************!*\
  !*** ./src/app/main/c/login/login.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-form-field{\n  width: 100%;\n}\nmat-card{\n  width: 95%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWFpbi9jL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0FBQ2I7QUFDQTtFQUNFLFVBQVU7QUFDWiIsImZpbGUiOiJzcmMvYXBwL21haW4vYy9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LWZvcm0tZmllbGR7XG4gIHdpZHRoOiAxMDAlO1xufVxubWF0LWNhcmR7XG4gIHdpZHRoOiA5NSU7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/main/c/login/login.component.html":
/*!***************************************************!*\
  !*** ./src/app/main/c/login/login.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"height: calc(100vh - 64px); display: flex; align-items: center; justify-content: center; overflow: hidden\" *ngIf=\"show\">\n   <mat-card>\n    <mat-card-header>\n      <div mat-card-avatar><mat-icon style=\"font-size: 3em; color: #444\">account_circle</mat-icon></div>\n      <mat-card-title style=\"text-align: left; margin-left: 15px!important;\">Login</mat-card-title>\n      <mat-card-subtitle style=\"margin-left: 15px!important;\">(GymWue Daten)</mat-card-subtitle>\n    </mat-card-header>\n    <mat-card-content>\n\n      <form #loginForm=\"ngForm\" (submit)=\"formSubmitted()\">\n        <p style=\"width: 20rem\" class=\"text-danger\" *ngIf=\"select.value == 'lehrer'\">Der Lehrer Zugang erweitert den Schüler Zugang und ist nicht eigenständig!</p>\n        <p style=\"width: 20rem\" class=\"text-danger\" *ngIf=\"select.value == 'lehrer' && falseLehrerLogin\">Kein Schüler Zugang gesetzt!</p>\n        <mat-form-field>\n          <mat-select placeholder=\"Nutzer\" ngModel name=\"nutzer\" required #select>\n            <mat-option value=\"schueler\" [disabled]=\"!!baseService.credentials\">schueler</mat-option>\n            <mat-option value=\"lehrer\" [disabled]=\"!baseService.credentials\">lehrer</mat-option>\n          </mat-select>\n        </mat-form-field><br>\n\n        <mat-form-field\n                        floatLabel=\"auto\">\n          <input matInput type=\"password\" autocomplete=\"new-password\" placeholder=\"Passwort\" style=\"box-shadow: none\" ngModel name=\"psw\" required> <!--style=\"width: 20rem\"-->\n        </mat-form-field>\n        <br>\n        <button mat-raised-button color=\"accent\" [ngClass]=\"{'disabled': !loginForm.valid}\">Login</button><span style=\"color: red\" *ngIf=\"!fine\">&nbsp;&nbsp;&nbsp;Das ist nicht richtig.</span>\n      </form>\n\n    </mat-card-content>\n  </mat-card>\n</div>\n"

/***/ }),

/***/ "./src/app/main/c/login/login.component.ts":
/*!*************************************************!*\
  !*** ./src/app/main/c/login/login.component.ts ***!
  \*************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _s_base_base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../s/base/base.service */ "./src/app/main/s/base/base.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = /** @class */ (function () {
    function LoginComponent(baseService, router, route) {
        this.baseService = baseService;
        this.router = router;
        this.route = route;
        this.fine = true;
        this.show = false;
        this.falseLehrerLogin = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var lcr;
        try {
            lcr = !!this.baseService.credentials.l;
        }
        catch (e) {
            lcr = false;
        }
        if ((this.baseService.credentials && !this.route.snapshot.queryParams['force']) ||
            (this.route.snapshot.queryParams['force'] && lcr)) {
            this.router.navigate(['/select']);
        }
        else
            this.show = true;
    };
    LoginComponent.prototype.formSubmitted = function () {
        if (!this.form.valid)
            return;
        var u = this.form.value.nutzer;
        var p = this.form.value.psw;
        if (u == "lehrer") {
            if (!this.baseService.credentials)
                this.falseLehrerLogin = true;
            else
                this.verifyLehrer(u, p);
        }
        else if (u == "schueler")
            this.verify(u, p);
    };
    LoginComponent.prototype.verify = function (u, p) {
        var _this = this;
        this.baseService.milchglas = true;
        this.baseService.checkCredentials(u, p).then((function (value) {
            _this.baseService.milchglas = false;
            if (value) {
                _this.router.navigate(['/select']);
            }
            else {
                _this.fine = false;
            }
        })).catch(function () {
            _this.baseService.milchglas = false;
        });
    };
    LoginComponent.prototype.verifyLehrer = function (u, p) {
        var _this = this;
        this.baseService.milchglas = true;
        this.baseService.checkCredentials(u, p, true).then(function (val) {
            _this.baseService.milchglas = false;
            if (val == true) {
                _this.router.navigate(['/select']);
            }
            else {
                _this.fine = false;
            }
        })
            .catch(function () {
            _this.baseService.milchglas = false;
        });
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('loginForm'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgForm"])
    ], LoginComponent.prototype, "form", void 0);
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/main/c/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/main/c/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [_s_base_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/main/c/select/kurse/get-from-kurse-modal.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/main/c/select/kurse/get-from-kurse-modal.component.ts ***!
  \***********************************************************************/
/*! exports provided: GetFromKurseModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetFromKurseModalComponent", function() { return GetFromKurseModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var GetFromKurseModalComponent = /** @class */ (function () {
    function GetFromKurseModalComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.valid = false;
    }
    GetFromKurseModalComponent.prototype.onCancelClick = function () {
        this.dialogRef.close();
    };
    GetFromKurseModalComponent.prototype.onChange = function (e) {
        this.valid = !this.data.id ? false : this.data.id.toString().length === 4 && !isNaN(+this.data.id);
        if (e.key === "Enter" && this.valid)
            this.dialogRef.close(this.data);
    };
    GetFromKurseModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-get-from-kurse-modal',
            template: "\n    <style>\n      .center { display: block; margin: 0 auto;}\n    </style>\n    <h1 mat-dialog-title class=\"center\">Kurs Cloud</h1>\n    <div mat-dialog-content class=\"center\" style=\"padding: 10px 0 0 0\">\n      <p *ngIf=\"!!data.failMsg\" class=\"text-danger\"><b>{{data.failMsg}}</b></p>\n      <mat-form-field style=\"width: 100%; overflow-x: hidden\">\n        <input \n          (keyup)=\"onChange($event)\" \n          cdkFocusInitial \n          type=\"tel\" \n          minlength=\"4\" \n          maxlength=\"4\" \n          placeholder=\"Kurs-Cloud ID\" \n          matInput\n          [(ngModel)]=\"data.id\">\n        \n      </mat-form-field>\n    </div>\n    <div mat-dialog-actions class=\"center\" style=\"text-align: right; padding-bottom: 2px\">\n      <button mat-button (click)=\"onCancelClick()\">Schlie\u00DFen</button>\n      <button mat-button [mat-dialog-close]=\"data\" [disabled]=\"!valid\">Ok</button>\n    </div>\n\n  "
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], GetFromKurseModalComponent);
    return GetFromKurseModalComponent;
}());



/***/ }),

/***/ "./src/app/main/c/select/kurse/kurse.component.css":
/*!*********************************************************!*\
  !*** ./src/app/main/c/select/kurse/kurse.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".kurs{\n  width: 7em;\n  height: 7em;\n  overflow: hidden;\n  margin: 2px;\n}\n.top{\n  position: absolute;\n  top: 2px;\n  left: 10px;\n}\n.btm{\n  position: absolute;\n  bottom: 2px;\n  right: 10px;\n}\n.mdl {\n  font-weight: bold;\n}\n.btn > span {\n  display: block;\n  width: 4rem;\n}\n.btn{\n  transition: background 0.5s ease!important;\n}\n.kurs-container{\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.newLineBefore{\n  flex-basis: 100%;\n  opacity: 0;\n  cursor: initial!important;\n  display: block;\n  height: 4em;\n}\n.btn-success{\n  color: white!important;\n  background-color: green;\n}\n.ok{\n  color: green;\n  font-weight: normal;\n}\n.tooMuch{\n  color: red;\n  font-weight: bold;\n}\n.notSelected{\n  color: #444;\n  font-style: italic;\n}\n.form-check-label{\n  cursor: pointer;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWFpbi9jL3NlbGVjdC9rdXJzZS9rdXJzZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsVUFBVTtFQUNWLFdBQVc7RUFDWCxnQkFBZ0I7RUFDaEIsV0FBVztBQUNiO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLFVBQVU7QUFDWjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxXQUFXO0FBQ2I7QUFDQTtFQUNFLGlCQUFpQjtBQUNuQjtBQUNBO0VBQ0UsY0FBYztFQUNkLFdBQVc7QUFDYjtBQUNBO0VBQ0UsMENBQTBDO0FBQzVDO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLHVCQUF1QjtBQUN6QjtBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFVBQVU7RUFDVix5QkFBeUI7RUFDekIsY0FBYztFQUNkLFdBQVc7QUFDYjtBQUNBO0VBQ0Usc0JBQXNCO0VBQ3RCLHVCQUF1QjtBQUN6QjtBQUNBO0VBQ0UsWUFBWTtFQUNaLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsVUFBVTtFQUNWLGlCQUFpQjtBQUNuQjtBQUNBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsZUFBZTtBQUNqQiIsImZpbGUiOiJzcmMvYXBwL21haW4vYy9zZWxlY3Qva3Vyc2Uva3Vyc2UuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5rdXJze1xuICB3aWR0aDogN2VtO1xuICBoZWlnaHQ6IDdlbTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbWFyZ2luOiAycHg7XG59XG4udG9we1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMnB4O1xuICBsZWZ0OiAxMHB4O1xufVxuLmJ0bXtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDJweDtcbiAgcmlnaHQ6IDEwcHg7XG59XG4ubWRsIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4uYnRuID4gc3BhbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogNHJlbTtcbn1cbi5idG57XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC41cyBlYXNlIWltcG9ydGFudDtcbn1cbi5rdXJzLWNvbnRhaW5lcntcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cbi5uZXdMaW5lQmVmb3Jle1xuICBmbGV4LWJhc2lzOiAxMDAlO1xuICBvcGFjaXR5OiAwO1xuICBjdXJzb3I6IGluaXRpYWwhaW1wb3J0YW50O1xuICBkaXNwbGF5OiBibG9jaztcbiAgaGVpZ2h0OiA0ZW07XG59XG4uYnRuLXN1Y2Nlc3N7XG4gIGNvbG9yOiB3aGl0ZSFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xufVxuLm9re1xuICBjb2xvcjogZ3JlZW47XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG4udG9vTXVjaHtcbiAgY29sb3I6IHJlZDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4ubm90U2VsZWN0ZWR7XG4gIGNvbG9yOiAjNDQ0O1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG4uZm9ybS1jaGVjay1sYWJlbHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/main/c/select/kurse/kurse.component.html":
/*!**********************************************************!*\
  !*** ./src/app/main/c/select/kurse/kurse.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"center\"\n     [ngClass]=\"{'border-primary': !valid, 'border-success': valid}\"\n     style=\"max-width: 55em; margin-top: 10px; padding-bottom: 150px\">\n  <h1 mat-card-title>Kurse für <b>{{_stufe }}</b></h1>\n  <h4 mat-card-subtitle>Wähle deine Kurse:</h4>\n\n  <div mat-card-content>\n    <hr>\n    <button mat-raised-button (click)=\"openGetFromKurseModal()\">\n      Von Cloud laden\n    </button>\n    <hr>\n\n    <div class=\"kurs-container\">\n        <button mat-raised-button class=\"btn kurs\"\n                *ngFor=\"let k of stufeKurse; let i = index;\"\n                [ngClass]=\"{'btn-light': !k.selected, 'btn-success': k.selected, 'newLineBefore': k.ph === true}\"\n                (click)=\"kursSelected(k)\"\n        >\n          <span class=\"top\">{{k.title}}</span>\n          <span class=\"mdl\">{{k.fach}}</span>\n          <span class=\"btm\">{{k.lehrer}}</span>\n        </button>\n\n    </div>\n    <hr>\n\n    <h5 style=\"text-align: center;\">\n      <span *ngFor=\"let t of titles; let i = index;\"\n            [ngClass]=\"{'notSelected': t.state < 1,'ok': t.state === 1,'tooMuch': t.state > 1}\"\n            style=\"margin-right: 5px; display: inline-block;\">{{t.t}}</span>\n    </h5>\n\n    <mat-slide-toggle style=\"text-align: center!important; display: block!important; margin: 0 auto!important; width: 230px\" [(ngModel)]=\"cloud\">Auf Kurs Cloud speichern</mat-slide-toggle>\n\n    <br>\n    <button mat-raised-button color=\"primary\"\n            [ngClass]=\"{'disabled': !valid, 'center': true}\"\n            (click)=\"kursSubmit()\">Fertig!</button><br>\n\n\n  </div>\n</mat-card>\n\n"

/***/ }),

/***/ "./src/app/main/c/select/kurse/kurse.component.ts":
/*!********************************************************!*\
  !*** ./src/app/main/c/select/kurse/kurse.component.ts ***!
  \********************************************************/
/*! exports provided: KurseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KurseComponent", function() { return KurseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _s_network_netw_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../s/network/netw.service */ "./src/app/main/s/network/netw.service.ts");
/* harmony import */ var _s_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../s/alert.service */ "./src/app/main/s/alert.service.ts");
/* harmony import */ var _s_base_base_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../s/base/base.service */ "./src/app/main/s/base/base.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _get_from_kurse_modal_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./get-from-kurse-modal.component */ "./src/app/main/c/select/kurse/get-from-kurse-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var KurseComponent = /** @class */ (function () {
    function KurseComponent(netwService, alert, baseService, route, router, dialog) {
        this.netwService = netwService;
        this.alert = alert;
        this.baseService = baseService;
        this.route = route;
        this.router = router;
        this.dialog = dialog;
        this.titles = [];
        this.valid = false;
        this._cloud = true;
    }
    Object.defineProperty(KurseComponent.prototype, "cloud", {
        get: function () {
            return this._cloud;
        },
        set: function (val) {
            this._cloud = val;
            console.log(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KurseComponent.prototype, "stufe", {
        set: function (val) {
            var _this = this;
            this._stufe = val;
            if (!val)
                return;
            this.stufeKurse = undefined;
            // Is already downloaded?
            if (!this.kurse)
                this.kurse = [];
            this.kurse.forEach(function (kurs) {
                if (kurs.stufe === val) {
                    _this.stufeKurse = kurs.kurse;
                    _this.titles = kurs.titles;
                }
            });
            if (this.stufeKurse)
                return;
            // no, it isn't
            this.baseService.milchglas = true;
            this.netwService.stufen.then(function (st) {
                var i = st.findIndex(function (val) { return val === _this._stufe; });
                _this.netwService.getkurse(_this._stufe, i + 1)
                    .then(function (val) {
                    // data enhancement
                    var v = JSON.parse(JSON.stringify(val));
                    v.sort(function (a, b) {
                        if (a.title > b.title)
                            return 1;
                        if (a.title < b.title)
                            return -1;
                        return 0;
                    });
                    var titles = [];
                    var istosplice = [];
                    v.forEach(function (value, i) {
                        if (titles.indexOf(value.title) === -1) {
                            titles.push(value.title);
                            istosplice.push([i, { title: value.title, fach: value.title, lehrer: '', ph: true }]);
                            istosplice.push([i, { title: value.title, fach: 'FREI', lehrer: '' }]);
                        }
                    });
                    istosplice.forEach(function (val) {
                        v.splice(val[0], 0, val[1]);
                        istosplice.forEach(function (valueu) { valueu[0]++; });
                    });
                    _this.titles = titles.map(function (val) { return { t: val, state: 0 }; });
                    _this.kurse.push({ stufe: _this._stufe, kurse: v, titles: _this.titles });
                    _this.stufeKurse = v;
                    _this.baseService.milchglas = false;
                }).catch(function (err) {
                    _this.baseService.milchglas = false;
                    _this.alert.alert(err, _this.alert.DANGER);
                });
            });
        },
        enumerable: true,
        configurable: true
    });
    KurseComponent.prototype.kursSelected = function (k) {
        if (k.ph)
            return;
        k.selected = !k.selected;
        var valid = 0;
        this.titles.forEach(function (val) {
            if (val.t === k.title) {
                if (k.selected) {
                    val.state++;
                }
                else {
                    val.state--;
                }
            }
            if (val.state === 1)
                valid++;
        });
        this.valid = valid === this.titles.length;
    };
    KurseComponent.prototype.kursSubmit = function () {
        var _this = this;
        if (!this.valid)
            return;
        this.baseService.milchglas = true;
        var mykurse = [];
        this.stufeKurse.forEach(function (val) {
            if (val.selected && !val.ph)
                mykurse.push({ title: val.title, fach: val.fach, lehrer: val.lehrer });
        });
        this.baseService.MyKurse = mykurse;
        console.log(mykurse);
        if (this._cloud === true) {
            this.netwService.saveKurse(mykurse)
                .then(function (id) { _this.alert.alert('Dein Kurs-Cloud Code: ' + id + '. Merken!', _this.alert.OK, 10000); }).catch(function (err) {
                console.log(err.statusText);
            });
        }
        this.baseService.setTT(this.netwService.getTT(this._stufe));
        this.baseService.milchglas = false;
        this.router.navigate(['show']);
    };
    KurseComponent.prototype.loadFromCloud = function (id) {
        var _this = this;
        if (!id)
            return this.openGetFromKurseModal({ failMsg: "Keine ID eingegeben" });
        this.baseService.milchglas = true;
        this.netwService.fetchCloud(id)
            .then(function (kurse) {
            _this.baseService.MyKurse = kurse;
            _this.baseService.setTT(_this.netwService.getTT(_this._stufe));
            _this.baseService.kursID = id;
            _this.baseService.milchglas = false;
            _this.router.navigate(['show']);
        })
            .catch(function (err) {
            _this.baseService.milchglas = false;
            _this.openGetFromKurseModal({ failMsg: err.statusText });
        });
    };
    KurseComponent.prototype.openGetFromKurseModal = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        var dialogRef = this.dialog.open(_get_from_kurse_modal_component__WEBPACK_IMPORTED_MODULE_6__["GetFromKurseModalComponent"], {
            width: "90%",
            maxWidth: "400px",
            data: data
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (!res)
                return;
            _this.loadFromCloud(data.id);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], KurseComponent.prototype, "stufe", null);
    KurseComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-kurse',
            template: __webpack_require__(/*! ./kurse.component.html */ "./src/app/main/c/select/kurse/kurse.component.html"),
            styles: [__webpack_require__(/*! ./kurse.component.css */ "./src/app/main/c/select/kurse/kurse.component.css")]
        }),
        __metadata("design:paramtypes", [_s_network_netw_service__WEBPACK_IMPORTED_MODULE_1__["NetwService"],
            _s_alert_service__WEBPACK_IMPORTED_MODULE_2__["AlertService"],
            _s_base_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"]])
    ], KurseComponent);
    return KurseComponent;
}());



/***/ }),

/***/ "./src/app/main/c/select/select.component.ts":
/*!***************************************************!*\
  !*** ./src/app/main/c/select/select.component.ts ***!
  \***************************************************/
/*! exports provided: SelectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectComponent", function() { return SelectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _s_base_base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../s/base/base.service */ "./src/app/main/s/base/base.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SelectComponent = /** @class */ (function () {
    function SelectComponent(route, baseService, router) {
        this.route = route;
        this.baseService = baseService;
        this.router = router;
        this.show = false;
    }
    SelectComponent.prototype.ngOnInit = function () {
        if (!this.route.snapshot.queryParams['force']) {
            if (this.baseService.myKurse && this.baseService.myStufe && this.baseService.myStufeID)
                this.router.navigate(['show']);
            else
                this.show = true;
        }
        else {
            this.show = true;
        }
    };
    SelectComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-select',
            template: "<app-stufe *ngIf=\"show\"></app-stufe>"
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _s_base_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], SelectComponent);
    return SelectComponent;
}());



/***/ }),

/***/ "./src/app/main/c/select/stufe/stufe.component.css":
/*!*********************************************************!*\
  !*** ./src/app/main/c/select/stufe/stufe.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21haW4vYy9zZWxlY3Qvc3R1ZmUvc3R1ZmUuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/main/c/select/stufe/stufe.component.html":
/*!**********************************************************!*\
  !*** ./src/app/main/c/select/stufe/stufe.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card style=\"max-width: 50em; margin: 0 auto; margin-top: 50px;\"\n      [ngClass]=\"{'border-light': selectedValue !== tempSelectedValue}\">\n  <div class=\"card-header\">Stufe</div>\n  <div class=\"card-body\">\n    <h4 class=\"card-title\">Wähle deine Stufe/Klasse aus:</h4>\n    <p class=\"card-text\">\n\n      <mat-form-field style=\"width: 100%\">\n        <mat-select [(ngModel)]=\"tempSelectedValue\">\n          <mat-option *ngFor=\"let s of stufen; let i = index;\" [value]=\"s\">{{s}}</mat-option>\n        </mat-select>\n      </mat-form-field>\n      <button style=\"margin-top: 5px\" mat-raised-button [color]=\"tempSelectedValue === selectedValue? '': 'primary'\"\n              [ngClass]=\"{'disabled': tempSelectedValue.length === 0}\"\n              (click)=\"setValue()\">Weiter</button>\n    </p>\n  </div>\n</mat-card>\n<app-kurse [stufe]=\"selectedValue\"\n           style=\"width: 100%; transition: opacity 0.5s ease;\"\n           [ngClass]=\"{'invisible': !selectedValue}\"\n></app-kurse>\n"

/***/ }),

/***/ "./src/app/main/c/select/stufe/stufe.component.ts":
/*!********************************************************!*\
  !*** ./src/app/main/c/select/stufe/stufe.component.ts ***!
  \********************************************************/
/*! exports provided: StufeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StufeComponent", function() { return StufeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _s_network_netw_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../s/network/netw.service */ "./src/app/main/s/network/netw.service.ts");
/* harmony import */ var _s_base_base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../s/base/base.service */ "./src/app/main/s/base/base.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StufeComponent = /** @class */ (function () {
    function StufeComponent(netwService, baseService) {
        this.netwService = netwService;
        this.baseService = baseService;
        this.stufen = [];
        this.tempSelectedValue = '';
    }
    StufeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.netwService.stufen.then(function (wert) { _this.stufen = wert; });
        console.log(this.stufen);
    };
    StufeComponent.prototype.setValue = function () {
        this.selectedValue = this.tempSelectedValue;
        this.baseService.MyStufe = [this.selectedValue, (this.stufen.indexOf(this.selectedValue) + 1).toString()];
    };
    StufeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-stufe',
            template: __webpack_require__(/*! ./stufe.component.html */ "./src/app/main/c/select/stufe/stufe.component.html"),
            styles: [__webpack_require__(/*! ./stufe.component.css */ "./src/app/main/c/select/stufe/stufe.component.css")]
        }),
        __metadata("design:paramtypes", [_s_network_netw_service__WEBPACK_IMPORTED_MODULE_1__["NetwService"], _s_base_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], StufeComponent);
    return StufeComponent;
}());



/***/ }),

/***/ "./src/app/main/c/show/show.component.css":
/*!************************************************!*\
  !*** ./src/app/main/c/show/show.component.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".full{\n  width: 100%;\n  display: block;\n  overflow: auto;\n}\n.hidden{\n  display: none;\n}\n.container{\n  width: 90%!important;\n  max-width: 750px!important;\n  margin: 1% auto 0;\n}\n@media (max-width: 350px){\n  .container{\n    width: 100%!important;\n  }\n}\n.buttons{\n  font-size: 100px;\n  position: fixed;\n  bottom: 10px;\n  cursor: pointer;\n  transition: opacity;\n}\n.fuckYou{\n  min-height: calc(100vh - 66px);\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWFpbi9jL3Nob3cvc2hvdy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztFQUNYLGNBQWM7RUFDZCxjQUFjO0FBQ2hCO0FBQ0E7RUFDRSxhQUFhO0FBQ2Y7QUFDQTtFQUNFLG9CQUFvQjtFQUNwQiwwQkFBMEI7RUFDMUIsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRTtJQUNFLHFCQUFxQjtFQUN2QjtBQUNGO0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLFlBQVk7RUFDWixlQUFlO0VBQ2YsbUJBQW1CO0FBQ3JCO0FBQ0E7RUFDRSw4QkFBOEI7QUFDaEMiLCJmaWxlIjoic3JjL2FwcC9tYWluL2Mvc2hvdy9zaG93LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZnVsbHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBvdmVyZmxvdzogYXV0bztcbn1cbi5oaWRkZW57XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uY29udGFpbmVye1xuICB3aWR0aDogOTAlIWltcG9ydGFudDtcbiAgbWF4LXdpZHRoOiA3NTBweCFpbXBvcnRhbnQ7XG4gIG1hcmdpbjogMSUgYXV0byAwO1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDM1MHB4KXtcbiAgLmNvbnRhaW5lcntcbiAgICB3aWR0aDogMTAwJSFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuLmJ1dHRvbnN7XG4gIGZvbnQtc2l6ZTogMTAwcHg7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgYm90dG9tOiAxMHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IG9wYWNpdHk7XG59XG4uZnVja1lvdXtcbiAgbWluLWhlaWdodDogY2FsYygxMDB2aCAtIDY2cHgpO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/main/c/show/show.component.html":
/*!*************************************************!*\
  !*** ./src/app/main/c/show/show.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"full\">\n\n  <div class=\"container\">\n\n    <div *ngIf=\"baseService.ferien\">\n      <br><br><br>\n      <h1>Es sind Ferien, was tust du hier?</h1>\n      <h2><small class=\"text-muted\">Der Unterricht beginnt wieder am {{baseService.ferienEndsOn}}.</small></h2>\n      <h3><small class=\"text-muted\">Die Kurs Cloud wird am Tag davor zurückgesetzt.</small></h3>\n    </div>\n\n    <mat-tab-group *ngIf=\"!baseService.ferien\" class=\"fuckYou\" [selectedIndex]=\"baseService.selectedTab\"\n                   (swipeleft)=\"swipe($event)\"\n                   (swiperight)=\"swipe($event)\"\n                   (selectChange)=\"change($event)\">\n      <mat-tab *ngFor=\"let tt of tts; let i = index;\" [label]=\"tt.date | date: 'E' : 'de' \">\n        <show-ttcontainer [tt]=\"tt\" [index]=\"i\"></show-ttcontainer>\n      </mat-tab>\n    </mat-tab-group>\n\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/main/c/show/show.component.ts":
/*!***********************************************!*\
  !*** ./src/app/main/c/show/show.component.ts ***!
  \***********************************************/
/*! exports provided: ShowComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowComponent", function() { return ShowComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _s_base_base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../s/base/base.service */ "./src/app/main/s/base/base.service.ts");
/* harmony import */ var _s_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../s/alert.service */ "./src/app/main/s/alert.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ShowComponent = /** @class */ (function () {
    function ShowComponent(baseService, alert) {
        this.baseService = baseService;
        this.alert = alert;
        this.tts = [];
        this.tab_num = 0;
        this.SWIPE_ACTION = {
            LEFT: 'swipeleft',
            RIGHT: 'swiperight'
        };
    }
    ShowComponent.prototype.ngAfterViewInit = function () {
        this.baseService.noswipe = true;
        this.tab_num = this.tabs.length;
        if (!localStorage.firstVisit) {
            localStorage.firstVisit = "false";
            location.reload();
        }
    };
    ShowComponent.prototype.swipe = function (e) {
        var eType = e.type;
        if (eType === this.SWIPE_ACTION.RIGHT && this.baseService.selectedTab > 0) {
            this.baseService.selectedTab--;
        }
        else if (eType === this.SWIPE_ACTION.LEFT && this.baseService.selectedTab < this.tab_num - 1) {
            this.baseService.selectedTab++;
        }
    };
    ShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        var tt = this.baseService.TT;
        if (!tt) {
            this.alert.alert("Kein Stundenplan gesetzt", this.alert.DANGER);
            return;
        }
        var firstDate;
        [0, 1].forEach(function (val, i) {
            var date = new Date();
            if (i === 1)
                date.setDate(date.getDate() + 1);
            while (date.getDay() === 0 || date.getDay() === 6)
                date.setDate(date.getDate() + 1);
            if (i == 0)
                firstDate = date;
            if (i === 1 && firstDate.getDate() == date.getDate())
                date.setDate(date.getDate() + 1);
            var weeksTT = tt[(getWeekNumber(date) % 2 == 0) ? 0 : 1];
            _this.tts.push({ tag: weeksTT.days[date.getDay() - 1], date: date });
        });
    };
    ShowComponent.prototype.change = function (val) {
        this.baseService.selectedTab = val.index;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTabGroup"]),
        __metadata("design:type", Object)
    ], ShowComponent.prototype, "group", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTab"]),
        __metadata("design:type", Object)
    ], ShowComponent.prototype, "tabs", void 0);
    ShowComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-show',
            template: __webpack_require__(/*! ./show.component.html */ "./src/app/main/c/show/show.component.html"),
            styles: [__webpack_require__(/*! ./show.component.css */ "./src/app/main/c/show/show.component.css")]
        }),
        __metadata("design:paramtypes", [_s_base_base_service__WEBPACK_IMPORTED_MODULE_1__["BaseService"], _s_alert_service__WEBPACK_IMPORTED_MODULE_2__["AlertService"]])
    ], ShowComponent);
    return ShowComponent;
}());

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}


/***/ }),

/***/ "./src/app/main/c/show/ttcontainer/ttcontainer.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/main/c/show/ttcontainer/ttcontainer.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".table{\n  text-align: center!important;\n}\n.entfall{\n  color: red;\n  font-weight: bold;\n}\n.vertretung{\n  color: lightgreen;\n  font-weight: bold;\n}\n.raumV{\n  color: goldenrod;\n}\n.btmtbl{\n  margin-bottom: 30px;\n}\n.klausur{\n  color: blue!important;\n  font-style: oblique!important;\n}\n.uncertain{\n  color: grey;\n  font-style: italic;\n}\n.bold{\n  font-weight: bold;\n}\n.schulplaner{\n  font-style: italic;\n  background: rgba(255, 255, 0, 0.2);\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWFpbi9jL3Nob3cvdHRjb250YWluZXIvdHRjb250YWluZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDRCQUE0QjtBQUM5QjtBQUNBO0VBQ0UsVUFBVTtFQUNWLGlCQUFpQjtBQUNuQjtBQUNBO0VBQ0UsaUJBQWlCO0VBQ2pCLGlCQUFpQjtBQUNuQjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxtQkFBbUI7QUFDckI7QUFDQTtFQUNFLHFCQUFxQjtFQUNyQiw2QkFBNkI7QUFDL0I7QUFDQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLGtDQUFrQztBQUNwQyIsImZpbGUiOiJzcmMvYXBwL21haW4vYy9zaG93L3R0Y29udGFpbmVyL3R0Y29udGFpbmVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGFibGV7XG4gIHRleHQtYWxpZ246IGNlbnRlciFpbXBvcnRhbnQ7XG59XG4uZW50ZmFsbHtcbiAgY29sb3I6IHJlZDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4udmVydHJldHVuZ3tcbiAgY29sb3I6IGxpZ2h0Z3JlZW47XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLnJhdW1We1xuICBjb2xvcjogZ29sZGVucm9kO1xufVxuLmJ0bXRibHtcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcbn1cbi5rbGF1c3Vye1xuICBjb2xvcjogYmx1ZSFpbXBvcnRhbnQ7XG4gIGZvbnQtc3R5bGU6IG9ibGlxdWUhaW1wb3J0YW50O1xufVxuLnVuY2VydGFpbntcbiAgY29sb3I6IGdyZXk7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbn1cblxuLmJvbGR7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLnNjaHVscGxhbmVye1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDAsIDAuMik7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/main/c/show/ttcontainer/ttcontainer.component.html":
/*!********************************************************************!*\
  !*** ./src/app/main/c/show/ttcontainer/ttcontainer.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"text-align: left;\">\n  <h1 class=\"text-right\">{{(_tt.date | date: 'E dd.M.yy')}}</h1>\n  <p class=\"lead text-right\">{{woche(_tt.date | date: 'w')}}-Woche</p>\n  <button mat-button (click)=\"reload()\"><i class=\"material-icons\">refresh</i></button>\n  <table class=\"table table-hover\">\n    <tbody>\n\n    <ng-container *ngFor=\"let stunde of displayArray; let i = index\">\n      <tr *ngIf=\"stunde != undefined && !stunde.nd\" [ngClass]=\"{\n        'entfall': (!!stunde.VD.type) ? stunde.VD.type[0] === 'e': false,\n        'vertretung': stunde.VD.type === 'v',\n        'raumV': stunde.VD.type === 'r',\n        'klausur': stunde.VD.type === 'k',\n        'uncertain': stunde.VD.type === 'fehlt'\n      }\">\n\n        <td>{{i + 1}}</td>\n\n        <td *ngIf=\"stunde.isFreistunde\" colspan=\"3\">Frei</td>\n\n        <ng-container *ngIf=\"!stunde.isFreistunde\">\n          <td>{{stunde.fach}}</td>\n          <td [ngClass]=\"{'bold': !!stunde.VD.newRaum}\">{{ !!stunde.VD.newRaum? stunde.VD.newRaum: stunde.raum}}</td>\n          <td [ngClass]=\"{'bold': !!stunde.VD.lehrer}\">{{stunde.VD.lehrer? stunde.VD.lehrer: stunde.lehrer}}</td>\n        </ng-container>\n\n\n      </tr>\n    </ng-container>\n\n\n    </tbody>\n  </table>\n  <br>\n  <h2><small class=\"text-muted\" *ngIf=\"!(online | async) && backUpVdSet\">{{'Alte Version von ' + (offlineDate | date: 'HH:mm') + ' Uhr am ' + (offlineDate | date: 'dd.MM.')}}</small></h2>\n  <h3 *ngIf=\"info.length > 0\">Info:</h3>\n  <table *ngIf=\"info.length > 0\" class=\"table table-sm\">\n    <tbody>\n    <tr *ngFor=\"let inf of info\">\n      <td [ngClass]=\"{'bold':inf.toLowerCase().indexOf('<b>') != -1,'schulplaner': inf.indexOf('SCHULPLANER_INFO') != -1}\">\n        {{ unHTML(inf.replace(\"SCHULPLANER_INFO\", \"\")) }}\n      </td>\n    </tr>\n    </tbody>\n  </table>\n\n  <br>\n\n    <h2 style=\"display: inline-block\">{{baseService.myStufe + \": \"}} &nbsp; </h2>\n    <h4 style=\"display: inline-block\">\n      <span><mat-slide-toggle *ngIf=\"baseService.credentials.l && (online | async)\" [(ngModel)]=\"preLehrer\">Lehrer</mat-slide-toggle></span>\n      <span><mat-slide-toggle *ngIf=\"baseService.credentials.l && !(online | async)\" disabled [checked]=\"offlinepreLehrer\">Lehrer</mat-slide-toggle></span>\n    </h4>\n  <h2 *ngIf=\"VDStufe.length == 0\" class=\"light center\"><small>Leider nichts</small></h2>\n\n  <table *ngIf=\"VDStufe.length > 0\" class=\"table table-sm btmtbl\">\n    <tbody>\n    <tr><th>St.</th><th>Kurs</th><th>Typ</th><th>Raum</th><th *ngIf=\"(baseService.credentials.l && baseService.preLehrer)\">Lehrer</th><th>Info</th></tr>\n    <tr *ngFor=\"let v of VDStufe;\">\n      <td *ngIf=\"v.nd\"><b>{{v.stunde}}</b></td>\n      <td *ngIf=\"v.nd\">{{v.fach}}</td>\n\n      <td *ngIf=\"v.nd\">\n        <b>{{v.type.toUpperCase()}}</b>\n      </td>\n\n      <td *ngIf=\"v.nd\">{{v.newRaum}}</td>\n      <td *ngIf=\"v.nd && (baseService.credentials.l && baseService.preLehrer)\">{{v.lehrer}}</td>\n      <td *ngIf=\"v.nd\">{{v.info}}</td>\n    </tr>\n    </tbody>\n\n  </table>\n  <br>\n</div>\n"

/***/ }),

/***/ "./src/app/main/c/show/ttcontainer/ttcontainer.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/main/c/show/ttcontainer/ttcontainer.component.ts ***!
  \******************************************************************/
/*! exports provided: TtcontainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TtcontainerComponent", function() { return TtcontainerComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _s_base_base_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../s/base/base.service */ "./src/app/main/s/base/base.service.ts");
/* harmony import */ var _s_network_netw_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../s/network/netw.service */ "./src/app/main/s/network/netw.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _Classes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../Classes */ "./src/app/Classes.ts");
/* harmony import */ var _util_evaVertretung__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util/evaVertretung */ "./src/app/main/c/show/ttcontainer/util/evaVertretung.ts");
/* harmony import */ var _util_addVDtoDisplayArray__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./util/addVDtoDisplayArray */ "./src/app/main/c/show/ttcontainer/util/addVDtoDisplayArray.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TtcontainerComponent = /** @class */ (function () {
    function TtcontainerComponent(baseService, netwService, router) {
        var _this = this;
        this.baseService = baseService;
        this.netwService = netwService;
        this.router = router;
        this.info = [];
        this.displayArray = [];
        this.VDStufe = [];
        this.VDMe = [];
        this.setted = false;
        this.offlinepreLehrer = false;
        this.backUpVdSet = false;
        this.domParser = new DOMParser();
        this.evaVertretung = function (w) { return Object(_util_evaVertretung__WEBPACK_IMPORTED_MODULE_7__["evaVertretung"])(w, _this); };
        this.addVDtoDisplayArray = function () { return Object(_util_addVDtoDisplayArray__WEBPACK_IMPORTED_MODULE_8__["addVDtoDisplayArray"])(_this.VDMe, _this.displayArray, _this); };
        this.online = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(navigator.onLine), Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(window, 'online').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(true)), Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(window, 'offline').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(false)));
    }
    Object.defineProperty(TtcontainerComponent.prototype, "tt", {
        set: function (val) {
            if (this.setted)
                return;
            this.setted = true;
            this._tt = val;
            this.filterVisible();
            this.readableDate = this._tt.date.getDate() + "." + (this._tt.date.getMonth() + 1) + ".";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TtcontainerComponent.prototype, "index", {
        set: function (val) {
            this._index = val;
        },
        enumerable: true,
        configurable: true
    });
    TtcontainerComponent.prototype.filterVisible = function () {
        var that = this;
        this._tt.tag.forEach(function (stunde, i) {
            if (stunde.type === "klasse")
                that.displayArray[i] = { fach: stunde.fach, lehrer: stunde.lehrer, raum: stunde.raum };
            else if (stunde.type === "kurs") {
                var sel_1 = undefined;
                that.baseService.myKurse.forEach(function (kurs) { if (kurs.title == stunde.fach)
                    sel_1 = kurs; });
                if (!sel_1)
                    return;
                var raum_1 = "---";
                stunde.raeume.forEach(function (r) { if (r.kurs == sel_1.fach)
                    raum_1 = r.raum; });
                that.displayArray[i] = { fach: sel_1.fach, raum: raum_1, lehrer: sel_1.lehrer, isFreistunde: (raum_1 == '---') };
            }
        });
        // @ts-ignore
        this.displayArray.forEach(function (e) { e.VD = {}; });
        console.log('displayArray', this.displayArray);
    };
    TtcontainerComponent.prototype.checkVertretung = function () {
        var _this = this;
        this.baseService.milchglas = true;
        this.netwService.getVertretungsDaten(this.readableDate, this._index).then(function (w) {
            _this.evaVertretung(w);
            _this.baseService.setLastVD(_this._index, w, _this.baseService.preLehrer);
            _this.baseService.milchglas = false;
        }).catch(function () {
            _this.baseService.milchglas = false;
        });
    };
    TtcontainerComponent.prototype.unHTML = function (string) {
        if (string.indexOf("<") != -1) {
            return this.domParser.parseFromString(string, "text/html").getElementsByTagName('html')[0].textContent.trim();
        }
        else {
            return string;
        }
    };
    TtcontainerComponent.prototype.reload = function () {
        this.onlineSub.unsubscribe();
        this.ngAfterViewInit();
    };
    TtcontainerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.onlineSub = this.online.subscribe(function (on) {
            _this.info = [];
            if (!on) {
                _this.getVDfromCache();
                return;
            }
            _this.netwService.getSchulplanerInfo(_this.readableDate).then(function (value) {
                //this.offlineDate = undefined;
                value.forEach(function (v, i) { value[i] += 'SCHULPLANER_INFO'; });
                _this.info = _this.info.concat(value);
            });
            _this.checkVertretung();
        });
    };
    TtcontainerComponent.prototype.getVDfromCache = function () {
        this.VDStufe = [];
        this.VDMe = [];
        if (!localStorage.lastVD)
            return;
        var lastVD = JSON.parse(localStorage.lastVD);
        this.offlineDate = new Date(lastVD.d);
        if (!lastVD.w[this._index])
            return;
        this.backUpVdSet = true;
        this.offlinepreLehrer = lastVD.lehrer;
        this.evaVertretung(lastVD.w[this._index]);
    };
    Object.defineProperty(TtcontainerComponent.prototype, "preLehrer", {
        get: function () { return this.baseService.preLehrer; },
        set: function (val) {
            var _this = this;
            this.baseService.preLehrer = val;
            setTimeout(function () { _this.router.navigate(['/']); }, 20);
        },
        enumerable: true,
        configurable: true
    });
    TtcontainerComponent.prototype.woche = function (idk) { return (+idk % 2 == 0) ? 'A' : 'B'; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
        __metadata("design:type", _Classes__WEBPACK_IMPORTED_MODULE_6__["TimeTable"]),
        __metadata("design:paramtypes", [_Classes__WEBPACK_IMPORTED_MODULE_6__["TimeTable"]])
    ], TtcontainerComponent.prototype, "tt", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], TtcontainerComponent.prototype, "index", null);
    TtcontainerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'show-ttcontainer',
            template: __webpack_require__(/*! ./ttcontainer.component.html */ "./src/app/main/c/show/ttcontainer/ttcontainer.component.html"),
            styles: [__webpack_require__(/*! ./ttcontainer.component.css */ "./src/app/main/c/show/ttcontainer/ttcontainer.component.css")]
        }),
        __metadata("design:paramtypes", [_s_base_base_service__WEBPACK_IMPORTED_MODULE_3__["BaseService"], _s_network_netw_service__WEBPACK_IMPORTED_MODULE_4__["NetwService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], TtcontainerComponent);
    return TtcontainerComponent;
}());



/***/ }),

/***/ "./src/app/main/c/show/ttcontainer/util/addVDtoDisplayArray.ts":
/*!*********************************************************************!*\
  !*** ./src/app/main/c/show/ttcontainer/util/addVDtoDisplayArray.ts ***!
  \*********************************************************************/
/*! exports provided: addVDtoDisplayArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addVDtoDisplayArray", function() { return addVDtoDisplayArray; });
function addVDtoDisplayArray(VDMe, displayArray, that) {
    var order = ["k", "e (v)", "e", "v", "r"];
    if (VDMe.length === 0)
        return;
    var filteredList = VDMe.filter(function (me) {
        return (me.type.toLowerCase() !== "k"
            || (me.type.toLowerCase() === "k"
                && isMyKlausur(me, that)))
            && !me.nd
            && order.findIndex(function (s) { return s === me.type; }) !== -1;
    });
    console.log("been here", filteredList);
    if (filteredList.length === 0)
        return;
    var stunden = [];
    // set stunden in order
    filteredList.forEach(function (vr) {
        if (!stunden[+vr.stunde - 1]) {
            stunden[+vr.stunde - 1] = vr;
        }
        else {
            var oldI = order.findIndex(function (s) { return stunden[+vr.stunde - 1].type.toLowerCase() === s; });
            var newI = order.findIndex(function (s) { return vr.type.toLowerCase() === s; });
            if (oldI >= newI && oldI !== -1 && newI !== -1)
                stunden[+vr.stunde - 1] = vr;
        }
    });
    console.log("stunden", stunden);
    // map VD of stunden to displayArray
    for (var i = 0; i < displayArray.length; i++) {
        if (!!displayArray[i])
            // @ts-ignore
            displayArray[i].VD = !!stunden[i] ? stunden[i] : {};
    }
    console.log("displayArray new", displayArray);
}
function isMyKlausur(me, that) {
    if (me.type.toLowerCase() !== "k")
        return false;
    var info = me.info;
    var val = false;
    that.baseService.myKurse.forEach(function (kurs) {
        if (info.indexOf(kurs.fach.toUpperCase()) != -1)
            val = true;
    });
    return val;
}


/***/ }),

/***/ "./src/app/main/c/show/ttcontainer/util/evaVertretung.ts":
/*!***************************************************************!*\
  !*** ./src/app/main/c/show/ttcontainer/util/evaVertretung.ts ***!
  \***************************************************************/
/*! exports provided: evaVertretung */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "evaVertretung", function() { return evaVertretung; });
function evaVertretung(w, that) {
    console.log("w", w);
    var VD = undefined;
    for (var Vobj in w[1]) {
        if (Vobj == that.baseService.myStufe)
            VD = w[1][Vobj];
    }
    if (!VD)
        return;
    var VDT = [];
    VD.forEach(function (v) {
        if (v.date === that.readableDate) {
            if (v.fach == "---" && v.lehrer == "-----" && v.info.replace(" ", "") == "")
                return;
            else
                VDT.push(v);
        }
    });
    var relevant = [];
    VDT.forEach(function (row) {
        if (row.date != that.readableDate)
            return;
        that.baseService.myKurse.forEach(function (val) {
            if (val.fach == row.fach)
                relevant.push(row);
        });
        that.baseService.KlassenKurse.forEach(function (val) {
            if (val == row.fach)
                relevant.push(row);
        });
        try {
            if (/^\s+$/.test(row.fach))
                relevant.push(row);
        }
        catch (e) { }
        if (row.fach == undefined)
            relevant.push(row);
    });
    try {
        that.info = that.info.concat(Array.from(w[0][0]));
    }
    catch (e) {
        console.log(e.message);
    }
    that.VDStufe = VDT;
    that.VDMe = relevant;
    console.log("VDMe", that.VDMe);
    that.addVDtoDisplayArray();
}
function cmp(x, y) {
    return x > y ? 1 : (x < y ? -1 : 0);
}


/***/ }),

/***/ "./src/app/main/c/stundenplan/stundenplan.component.css":
/*!**************************************************************!*\
  !*** ./src/app/main/c/stundenplan/stundenplan.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21haW4vYy9zdHVuZGVucGxhbi9zdHVuZGVucGxhbi5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/main/c/stundenplan/stundenplan.component.html":
/*!***************************************************************!*\
  !*** ./src/app/main/c/stundenplan/stundenplan.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<mat-card class=\"center\" style=\"margin-bottom: 50px!important;margin-top: 10px!important;\">\n  <mat-tab-group style=\"width: 100%!important;\" [selectedIndex]=\"selectedIndex\" (selectChange)=\"resetDay()\">\n\n    <mat-tab *ngFor=\"let woche of tts\" [label]=\"woche.woche\">\n\n\n      <mat-tab-group class=\"small-tabs\" style=\"width: 100%!important;\" [selectedIndex]=\"selectedDay\" >\n\n        <mat-tab *ngFor=\"let tag of woche.tt; let i = index\" [label]=\"TAGE[i]\">\n          <br><br>\n          <table class=\"table table-hover text-center\">\n            <tbody>\n            <ng-container *ngFor=\"let stunde of tag; let stundei = index\">\n              <tr *ngIf=\"!stunde[0].isDouble\">\n                <td>{{ (stundei + 1) }}<span *ngIf=\"stunde[0].hasDouble\">{{'/' + (stundei + 2) }}</span></td>\n                <td *ngFor=\"let fach of stunde\">\n                  <span [ngClass]=\"{'font-weight-bold': fach.sel}\">{{fach.fach}}</span><br>\n                  <span [ngClass]=\"{'font-weight-bold': fach.sel}\">{{fach.raum}}</span>\n                </td>\n              </tr>\n            </ng-container>\n\n            </tbody>\n          </table>\n\n        </mat-tab>\n\n\n      </mat-tab-group>\n\n\n\n    </mat-tab>\n\n\n  </mat-tab-group>\n</mat-card>\n\n\n<mat-card class=\"center\" style=\"margin-bottom: 50px!important;margin-top: 10px!important;\">\n\n\t<mat-tab-group style=\"width: 100%!important;\"> \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- A/B Woche -->\n\t\t<mat-tab *ngFor=\"let woche of tts\" [label]=\"woche.woche\">\t<!-- A/B Woche -->\n\n\t\t\t<table class=\"table table-hover text-center\">\n\t\t\t\t<tbody>\n\n\t\t\t\t<tr *ngFor=\"let tag of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]\">\n\t\t\t\t\t{{tag}}\n\t\t\t\t</tr>\n\n\t\t\t\t</tbody>\n\t\t\t</table>\n\n\t\t</mat-tab>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- A/B Woche -->\n\t</mat-tab-group>\n\n</mat-card>\n"

/***/ }),

/***/ "./src/app/main/c/stundenplan/stundenplan.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/main/c/stundenplan/stundenplan.component.ts ***!
  \*************************************************************/
/*! exports provided: StundenplanComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StundenplanComponent", function() { return StundenplanComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _s_base_base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../s/base/base.service */ "./src/app/main/s/base/base.service.ts");
/* harmony import */ var _s_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../s/alert.service */ "./src/app/main/s/alert.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StundenplanComponent = /** @class */ (function () {
    function StundenplanComponent(baseService, alert) {
        this.baseService = baseService;
        this.alert = alert;
        this.TAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
        this.tts = [];
        this.selectedDay = 0;
        this.d = new Date();
        this.selectedIndex = (+Object(_angular_common__WEBPACK_IMPORTED_MODULE_3__["formatDate"])(this.d, "w", "de")) % 2 == 0 ? 0 : 1;
    }
    StundenplanComponent.prototype.ngOnInit = function () {
        var _this = this;
        var tt = this.baseService.TT;
        if (!tt) {
            this.alert.alert("Kein Stundenplan gesetzt", this.alert.DANGER);
            return;
        }
        tt.forEach(function (t, i) {
            var obj = {
                woche: (i % 2 == 0) ? 'A' : 'B',
                tt: []
            };
            t.days.forEach(function (tag) {
                var d = [];
                tag.forEach(function (stunde, stundeindex) {
                    if (stunde.type == 'klasse') {
                        var davor = d[d.length - 1];
                        var isDouble = false;
                        if (davor)
                            isDouble = davor[0].fach === stunde.fach && davor[0].raum === stunde.raum;
                        if (isDouble)
                            d[d.length - 1][0].hasDouble = true;
                        d.push([{ fach: stunde.fach, raum: stunde.raum, sel: true, isDouble: isDouble }]);
                    }
                    else {
                        var s_1 = [];
                        if (!stunde.raeume) {
                            d.push([{ fach: "Pause", raum: "", sel: true }]);
                            return;
                        }
                        stunde.raeume.forEach(function (k) {
                            s_1.push({
                                fach: k.kurs,
                                raum: k.raum,
                                sel: _this.getPos(k.kurs) != -1
                            });
                        });
                        /** **/
                        var isDouble = false;
                        if (stundeindex > 0) {
                            var davor_1;
                            var down = 1;
                            while (davor_1 === undefined && down !== 11) {
                                davor_1 = d[stundeindex - down];
                                down++;
                            }
                            isDouble = s_1.some(function (value) {
                                return !!davor_1.find(function (v) { return v.fach === value.fach && v.raum === value.raum && v.sel === value.sel; });
                            });
                            if (isDouble)
                                davor_1[0].hasDouble = true;
                        }
                        /** **/
                        s_1.sort(function (a, b) {
                            return (a.sel < b.sel) ? 1 : (a.sel > b.sel) ? -1 : 0;
                        });
                        if (isDouble)
                            s_1[0].isDouble = true;
                        d.push(s_1);
                    }
                });
                obj.tt.push(d);
            });
            _this.tts.push(obj);
        });
        console.log(this.tts);
        this.selectedDay = (this.d.getDay() > 0 && this.d.getDay() <= 5) ? this.d.getDay() - 1 : 0;
        this.weekTTs = this.generateWeekTTs(this.tts);
    };
    StundenplanComponent.prototype.getPos = function (fach) {
        var val = -1;
        this.baseService.myKurse.forEach(function (k, i) {
            if (k.fach.toUpperCase() == fach.toUpperCase())
                val = i;
        });
        return val;
    };
    StundenplanComponent.prototype.resetDay = function () {
        this.selectedDay = 0;
    };
    StundenplanComponent.prototype.generateWeekTTs = function (tts) {
        return null;
    };
    StundenplanComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-stundenplan',
            template: __webpack_require__(/*! ./stundenplan.component.html */ "./src/app/main/c/stundenplan/stundenplan.component.html"),
            styles: [__webpack_require__(/*! ./stundenplan.component.css */ "./src/app/main/c/stundenplan/stundenplan.component.css"), __webpack_require__(/*! ./tabs.scss */ "./src/app/main/c/stundenplan/tabs.scss")]
        }),
        __metadata("design:paramtypes", [_s_base_base_service__WEBPACK_IMPORTED_MODULE_1__["BaseService"], _s_alert_service__WEBPACK_IMPORTED_MODULE_2__["AlertService"]])
    ], StundenplanComponent);
    return StundenplanComponent;
}());



/***/ }),

/***/ "./src/app/main/c/stundenplan/tabs.scss":
/*!**********************************************!*\
  !*** ./src/app/main/c/stundenplan/tabs.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".small-tabs /deep/ .mat-tab-list {\n  width: 100% !important; }\n\n.small-tabs /deep/ .mat-tab-labels {\n  display: flex !important;\n  flex-direction: row !important;\n  flex-wrap: nowrap !important; }\n\n.small-tabs /deep/ .mat-tab-label, .small-tabs /deep/ .mat-tab-label-active {\n  flex-grow: 1 !important;\n  min-width: 0 !important;\n  padding: 0 5px !important;\n  margin: 0 !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL21heC9Eb2t1bWVudGUvV2ViIFByZ2N0cy9CZXR0ZXJHeW1XdWUvc291cmNlL3NyYy9hcHAvbWFpbi9jL3N0dW5kZW5wbGFuL3RhYnMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUdJLHNCQUFxQixFQUFBOztBQUh6QjtFQU1JLHdCQUF1QjtFQUN2Qiw4QkFBNkI7RUFDN0IsNEJBQTJCLEVBQUE7O0FBUi9CO0VBWUksdUJBQXNCO0VBQ3RCLHVCQUFzQjtFQUN0Qix5QkFBd0I7RUFDeEIsb0JBQW1CLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9tYWluL2Mvc3R1bmRlbnBsYW4vdGFicy5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNtYWxsLXRhYnMge1xuXG4gIC9kZWVwLyAubWF0LXRhYi1saXN0e1xuICAgIHdpZHRoOiAxMDAlIWltcG9ydGFudDtcbiAgfVxuICAvZGVlcC8gLm1hdC10YWItbGFiZWxze1xuICAgIGRpc3BsYXk6IGZsZXghaW1wb3J0YW50O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3chaW1wb3J0YW50O1xuICAgIGZsZXgtd3JhcDogbm93cmFwIWltcG9ydGFudDtcbiAgfVxuXG4gIC9kZWVwLyAubWF0LXRhYi1sYWJlbCwgL2RlZXAvIC5tYXQtdGFiLWxhYmVsLWFjdGl2ZSB7XG4gICAgZmxleC1ncm93OiAxIWltcG9ydGFudDtcbiAgICBtaW4td2lkdGg6IDAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmc6IDAgNXB4IWltcG9ydGFudDtcbiAgICBtYXJnaW46IDAhaW1wb3J0YW50O1xuICB9XG5cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/main/s/alert.service.ts":
/*!*****************************************!*\
  !*** ./src/app/main/s/alert.service.ts ***!
  \*****************************************/
/*! exports provided: AlertService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertService", function() { return AlertService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlertService = /** @class */ (function () {
    function AlertService(snackBar) {
        this.snackBar = snackBar;
        this.id = 0;
        this.DANGER = 1;
        this.OK = 2;
    }
    AlertService.prototype.alert = function (text, type, time) {
        time = time || 3000;
        if (type === this.DANGER)
            text = '\u26D4 ' + text;
        if (type === this.OK)
            text = '\ud83c\udf55 ' + text;
        this.snackBar.open(text, undefined, { duration: time });
    };
    AlertService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
    ], AlertService);
    return AlertService;
}());



/***/ }),

/***/ "./src/app/main/s/base/appMeta.base.ts":
/*!*********************************************!*\
  !*** ./src/app/main/s/base/appMeta.base.ts ***!
  \*********************************************/
/*! exports provided: needsReset, checkFerien, needsUpdate, getResetHeader, getResetMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "needsReset", function() { return needsReset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkFerien", function() { return checkFerien; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "needsUpdate", function() { return needsUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResetHeader", function() { return getResetHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResetMessage", function() { return getResetMessage; });
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../conf */ "./src/app/conf.ts");

function needsReset(httpClient) {
    httpClient.get(_conf__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].resets).subscribe(function (resets) {
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
                delete localStorage.stundnplanHash;
                delete localStorage.notUsedNotKurse;
                delete localStorage.TT;
                delete localStorage.KlassenKurse;
                location.reload();
            }
        }
    }, function (err) {
        console.error('needsReset', err);
    });
}
function checkFerien(baseService) {
    baseService.httpClient.get(_conf__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].ferienUrl).subscribe(function (bool) {
        baseService.ferien = bool;
        if (baseService.ferien) {
            baseService.httpClient.get(_conf__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].ferienEndsUrl).subscribe(function (ends) {
                baseService.ferienEndsOn = ends;
            }, function (e) {
                console.error('getFerienEndError', e);
            });
        }
    }, function (e) {
        console.error('checkFerienError', e);
    });
}
function needsUpdate(baseService) {
    if (!baseService.deadTested) {
        baseService.httpClient.get(_conf__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].databaseURL + 'killswitch.json').subscribe(function (isdead) {
            baseService.dead = isdead;
            console.log('dead? ', isdead);
            localStorage.dead = isdead;
            if (isdead)
                baseService.router.navigate(['/error'], { queryParams: { 'dead': true } });
        });
    }
    return new Promise(function (resolve, reject) {
        var up;
        baseService.httpClient.get(_conf__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].versionURL).subscribe(function (res) {
            if (!res.version.match(baseService.VERSION))
                up = true;
            if (up)
                resolve(res.news);
            else
                reject();
        });
    });
}
function getResetHeader(baseService) {
    return baseService.httpClient.get(_conf__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].resetHeader);
}
function getResetMessage(baseService) {
    return baseService.httpClient.get(_conf__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].resetMsg);
}


/***/ }),

/***/ "./src/app/main/s/base/base.service.ts":
/*!*********************************************!*\
  !*** ./src/app/main/s/base/base.service.ts ***!
  \*********************************************/
/*! exports provided: BaseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseService", function() { return BaseService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../conf */ "./src/app/conf.ts");
/* harmony import */ var _alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../alert.service */ "./src/app/main/s/alert.service.ts");
/* harmony import */ var _appMeta_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./appMeta.base */ "./src/app/main/s/base/appMeta.base.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var BaseService = /** @class */ (function () {
    function BaseService(router, httpClient, alertService) {
        var _this = this;
        this.router = router;
        this.httpClient = httpClient;
        this.alertService = alertService;
        this.VERSION = _conf__WEBPACK_IMPORTED_MODULE_4__["APP_VERSION"];
        this.noswipe = false;
        this.milchglas = false;
        this.selectedTab = 0;
        this.dead = false;
        this.ferien = false;
        this.ferienEndsOn = "";
        this.justResetted = false;
        this.deadTested = false;
        this.verifiedNonKurse = false;
        this.needsUpdate = function () { return _appMeta_base__WEBPACK_IMPORTED_MODULE_6__["needsUpdate"](_this); };
        this.getResetHeader = function () { return _appMeta_base__WEBPACK_IMPORTED_MODULE_6__["getResetHeader"](_this); };
        this.getResetMessage = function () { return _appMeta_base__WEBPACK_IMPORTED_MODULE_6__["getResetMessage"](_this); };
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
        this.acceptedAGB = (!!localStorage.acceptedAGB3) ? (localStorage.acceptedAGB3 === 'true') : false;
        this.credentials = (!!localStorage.credentials) ? JSON.parse(localStorage.credentials) : undefined;
        this.myKurse = (!!localStorage.myKurse) ? JSON.parse(localStorage.myKurse) : undefined;
        this.myStufe = (!!localStorage.myStufe) ? localStorage.myStufe : undefined;
        this.myStufeID = (!!localStorage.myStufeID) ? localStorage.myStufeID : undefined;
        this.TT = (!!localStorage.TT) ? JSON.parse(localStorage.TT) : undefined;
        this.KlassenKurse = (!!localStorage.KlassenKurse) ? JSON.parse(localStorage.KlassenKurse) : undefined;
        this.kursID = (!!localStorage.kursID) ? localStorage.kursID : undefined;
        this._preLehrer = (!!localStorage.preLehrer) ? (localStorage.preLehrer == 'true') : true;
        this.justResetted = (!!localStorage.justResetted) ? (localStorage.justResetted == "true") : false;
        this.verifiedNonKurse = (!!localStorage.verifiedNonKurse) ? (localStorage.verifiedNonKurse == "true") : false;
        localStorage.justResetted = false;
        _appMeta_base__WEBPACK_IMPORTED_MODULE_6__["checkFerien"](this);
        _appMeta_base__WEBPACK_IMPORTED_MODULE_6__["needsReset"](this.httpClient);
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
        this.TT = val.tt;
        localStorage.TT = JSON.stringify(val);
        var a = [];
        console.log(val);
        val.tt.forEach(function (wocheV) {
            wocheV.days.forEach(function (tag) {
                tag.forEach(function (stunde) {
                    if (stunde.type == "klasse" && a.indexOf(stunde.fach) === -1)
                        a.push(stunde.fach);
                });
            });
        });
        this.KlassenKurse = a;
        localStorage.KlassenKurse = JSON.stringify(a);
        localStorage.stundnplanHash = val.hash;
    };
    BaseService.prototype.acceptAGB = function () {
        this.acceptedAGB = true;
        localStorage.acceptedAGB3 = true;
        this.install();
        this.router.navigate(['/'], { queryParams: { ua: '' } });
    };
    BaseService.prototype.checkCredentials = function (u, p, lehrer) {
        var _this = this;
        lehrer = lehrer || false;
        return new Promise(function (resolve) {
            _this.httpClient.get((lehrer) ? _conf__WEBPACK_IMPORTED_MODULE_4__["CONFIG"].credentialsCheckLehrerUrl : _conf__WEBPACK_IMPORTED_MODULE_4__["CONFIG"].credentialsCheckUrl, {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({ 'Authorization': 'Basic ' + btoa(u + ':' + p) }),
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
                try {
                    _this.alertService.alert(JSON.parse(err.error).error, 1);
                }
                catch (e) { }
                if (err.statusText === "Unknown Error")
                    _this.alertService.alert("Netzwerkfehler", 1);
                if (!lehrer) {
                    delete localStorage.credentials;
                    _this.credentials = undefined;
                }
                resolve(false);
            });
        });
    };
    BaseService.prototype.makeConnections = function (url, lehrer, cache) {
        if (lehrer === void 0) { lehrer = false; }
        if (cache === void 0) { cache = true; }
        var cred = this.credentials;
        if (!cred)
            return null;
        var ext = "?" + (Math.random() * 10000).toFixed(0);
        if (!cache)
            ext = "";
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
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!response.ok) return [3 /*break*/, 2];
                                _a = resolve;
                                return [4 /*yield*/, response.text()];
                            case 1:
                                _a.apply(void 0, [_b.sent()]);
                                return [3 /*break*/, 3];
                            case 2:
                                reject({
                                    statusText: response.status + " " + response.statusText
                                });
                                _b.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            })
                .catch(function (err) {
                reject({ statusText: "Netzwerkfehler" });
            });
        });
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(p);
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
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            _alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"]])
    ], BaseService);
    return BaseService;
}());



/***/ }),

/***/ "./src/app/main/s/guard.service.ts":
/*!*****************************************!*\
  !*** ./src/app/main/s/guard.service.ts ***!
  \*****************************************/
/*! exports provided: GuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuardService", function() { return GuardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _base_base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base/base.service */ "./src/app/main/s/base/base.service.ts");
/* harmony import */ var _c_login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../c/login/login.component */ "./src/app/main/c/login/login.component.ts");
/* harmony import */ var _c_cloud_cloud_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../c/cloud/cloud.component */ "./src/app/main/c/cloud/cloud.component.ts");
/* harmony import */ var _c_stundenplan_stundenplan_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../c/stundenplan/stundenplan.component */ "./src/app/main/c/stundenplan/stundenplan.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var GuardService = /** @class */ (function () {
    function GuardService(baseService, router) {
        this.baseService = baseService;
        this.router = router;
    }
    GuardService.prototype.canActivate = function (route, state) {
        if (!this.baseService.acceptedAGB) {
            this.router.navigate(['/agb']);
            return false;
        }
        if (route.component !== _c_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]) {
            if (!this.baseService.credentials) {
                this.router.navigate(['/']);
                return false;
            }
        }
        if (/\/show$/.test(state.url) || route.component === _c_stundenplan_stundenplan_component__WEBPACK_IMPORTED_MODULE_5__["StundenplanComponent"] || route.component === _c_cloud_cloud_component__WEBPACK_IMPORTED_MODULE_4__["CloudComponent"]) {
            if (!this.baseService.myKurse) {
                this.router.navigate(['/']);
                return false;
            }
        }
        if (/\/show$/.test(state.url)) {
            if (!this.baseService.verifiedNonKurse) {
                this.router.navigate(['/show/non-kurse']);
                return false;
            }
        }
        if (this.baseService.dead) {
            this.router.navigate(['/error'], { queryParams: { 'dead': true } });
            return false;
        }
        return true;
    };
    GuardService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_base_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], GuardService);
    return GuardService;
}());



/***/ }),

/***/ "./src/app/main/s/message.service.ts":
/*!*******************************************!*\
  !*** ./src/app/main/s/message.service.ts ***!
  \*******************************************/
/*! exports provided: MessageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageService", function() { return MessageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../conf */ "./src/app/conf.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MessageService = /** @class */ (function () {
    function MessageService(http) {
        var _this = this;
        this._count = 0;
        this.dlCount = 0;
        this.count = (!!localStorage.messageCount) ? localStorage.messageCount : 0;
        this.message$ = (http.get(_conf__WEBPACK_IMPORTED_MODULE_2__["CONFIG"].message));
        this.message$.subscribe(function (val) {
            _this.dlCount = val.count;
        });
    }
    Object.defineProperty(MessageService.prototype, "count", {
        get: function () { return this._count; },
        set: function (val) { this._count = val; localStorage.messageCount = val; },
        enumerable: true,
        configurable: true
    });
    ;
    MessageService.prototype.resetCount = function () {
        this.count = this.dlCount;
    };
    MessageService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], MessageService);
    return MessageService;
}());



/***/ }),

/***/ "./src/app/main/s/network/cloud.netw.ts":
/*!**********************************************!*\
  !*** ./src/app/main/s/network/cloud.netw.ts ***!
  \**********************************************/
/*! exports provided: saveKurse, fetchCloud */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveKurse", function() { return saveKurse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCloud", function() { return fetchCloud; });
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../conf */ "./src/app/conf.ts");

function saveKurse(kurse, that) {
    return new Promise(function (resolve, reject) {
        var id = Math.floor(Math.random() * 9999);
        while (id.toString().length !== 4)
            id = Math.floor(Math.random() * 9999);
        var kurseAO = toObject(kurse);
        kurseAO.stufe = that.baseService.myStufe;
        that.baseService.httpClient.put(_conf__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].dbUrl + id + '.json', kurseAO).subscribe(function (wert) {
            localStorage.kursID = id;
            that.baseService.kursID = id;
            resolve(id);
        }, function (err) {
            if (that.saveKurseTrys < 5) {
                console.log(err);
                that.saveKurseTrys++;
                that.saveKurse(kurse).then(function (id) {
                    resolve(id);
                });
            }
            else
                reject(err);
        });
    });
}
function fetchCloud(id, that) {
    return new Promise(function (resolve, reject) {
        that.baseService.makeConnections(_conf__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].dbUrl + id + '.json').subscribe(function (json) {
            var njson = JSON.parse(json);
            if (njson === null)
                reject({ statusText: 'Falsche ID' });
            else if (njson.error) {
                reject({ statusText: njson.error });
            }
            else if (njson.stufe !== that.baseService.myStufe) {
                reject({ statusText: 'ID gehört zu Stufe/Klasse ' + njson.stufe });
            }
            else {
                localStorage.kursID = id;
                resolve(toArray(njson));
            }
        }, function (err) { reject(err); });
    });
}
function toObject(array) {
    var Obj = {};
    array.forEach(function (val, i) {
        Obj[i] = val;
    });
    return Obj;
}
function toArray(obj) {
    if (Array.isArray(obj))
        return obj;
    var arr = [];
    delete obj.stufe;
    for (var key in obj) {
        arr.push(obj[key]);
    }
    return arr;
}


/***/ }),

/***/ "./src/app/main/s/network/evakurse.netw.ts":
/*!*************************************************!*\
  !*** ./src/app/main/s/network/evakurse.netw.ts ***!
  \*************************************************/
/*! exports provided: evaKurse, umdrehen, getWoche, handleKlasse, handleKurse, isPauseOrEmpty, isDoppelStunde, fitIn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "evaKurse", function() { return evaKurse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "umdrehen", function() { return umdrehen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWoche", function() { return getWoche; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleKlasse", function() { return handleKlasse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleKurse", function() { return handleKurse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPauseOrEmpty", function() { return isPauseOrEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDoppelStunde", function() { return isDoppelStunde; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fitIn", function() { return fitIn; });
function evaKurse(html, stufe, tempTTs, kurse) {
    var hash = md5(html);
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");
    var woche = getWoche(doc);
    var wholeTable = doc.getElementsByTagName('tbody')[0];
    // remove header
    wholeTable.firstElementChild.remove();
    var data = [];
    var tri = 0;
    Array.from(wholeTable.children).forEach(function (tr) {
        if (tr.textContent.trim() === "")
            return;
        tri++;
        var stunde = [];
        Array.from(tr.children).forEach(function (td, tag) {
            if (tag === 0)
                return; // Exclude number
            // Tag: 1: Mo, 2: Di, ...
            if (isPauseOrEmpty(td)) {
                // @ts-ignore
                stunde.push({ isUsed: true });
                return;
            }
            var doppelStunde = isDoppelStunde(td);
            var info = Array.from(td.getElementsByTagName('tr'));
            var isUsed = false;
            if (!doppelStunde) {
                var fitin = fitIn(data, tag);
                isUsed = fitin.isUsed;
                tag = fitin.tag;
            }
            if (info.length === 1) {
                stunde.push(handleKlasse(info, doppelStunde, tag, isUsed));
            }
            else {
                stunde.push(handleKurse(info, td, kurse, woche, doppelStunde, tag, isUsed));
            }
        }); // td
        if (stunde.length !== 0)
            data.push(stunde);
    }); // tr
    umdrehen(data, tempTTs, woche, stufe, hash);
}
function umdrehen(data, tempTTs, woche, stufe, hash) {
    var tt = { days: [[], [], [], [], []] };
    data.forEach(function (stundeE, stunde) {
        stundeE.forEach(function (timetableslot, untrustedtag) {
            var tts;
            var tag = timetableslot.tag;
            tag = (tag === undefined || tag === -1) ? untrustedtag : tag;
            // get a free timetable slot
            while (typeof tt.days[tag][stunde] !== "undefined") {
                stunde++;
            }
            if (timetableslot.fach !== undefined) {
                tts = Object.assign({}, timetableslot);
                delete tts.isBig;
            }
            // add to TT
            // @ts-ignore
            if (tts === undefined)
                tts = {};
            tt.days[tag][stunde] = tts;
            // two times in case of isBig
            if (timetableslot.isBig)
                tt.days[tag][stunde + 1] = tts;
        });
    });
    tt.days.forEach(function (day, i) {
        var length = tt.days[i].length;
        for (var sub = 0; sub < length; sub++) { // backwards iterator
            if (!tt.days[i][length - sub])
                delete tt.days[i][length - sub];
            else if (!tt.days[i][length - sub].type)
                delete tt.days[i][length - sub];
            else
                break;
        }
        // Pause vor 10/11 löschen
        if (tt.days[i][9])
            if (!tt.days[i][9].type)
                delete tt.days[i][9];
        tt.days[i] = day.filter(function (e) { return e !== undefined; });
    });
    // Add tt to TempTTs
    var setYet = false;
    tempTTs.forEach(function (val) {
        if (val.stufe !== stufe)
            return;
        val.tt[woche] = tt;
        val.hash += hash;
        setYet = true;
    });
    if (!setYet)
        tempTTs.push({
            stufe: stufe,
            tt: (woche === 0) ? [tt] : [undefined, tt],
            hash: hash
        });
}
function getWoche(doc) {
    return (doc.querySelectorAll('font[size="3"][face="Arial"]')[1]).textContent.split(/(?:\d+\.){2}\d{4} /)[1][0].toLowerCase() === "a" ? 0 : 1;
}
function handleKlasse(info, doppelStunde, tag, isUsed) {
    var spaltenRaw = Array.from(info[0].getElementsByTagName('font'));
    var spalten = spaltenRaw.map(function (x) { return x.textContent.replace(/\n/g, ""); });
    return {
        type: 'klasse',
        isBig: doppelStunde,
        fach: spalten[0],
        lehrer: spalten[1],
        raum: spalten[2],
        tag: tag - 1,
        isUsed: isUsed
    };
}
function handleKurse(info, td, kurse, woche, doppelStunde, tag, isUsed) {
    var title = td.getElementsByTagName('b')[0].textContent;
    var raeume = [];
    info.forEach(function (infos, infoi) {
        if (infoi === 0)
            return;
        var spaltenRaw = Array.from(infos.getElementsByTagName('font'));
        var spalten = spaltenRaw.map(function (x) { return x.textContent.replace(/\n/g, ""); });
        var fach = spalten[0]; // GE3, E1, ...
        var lehrer = spalten[1];
        var raum = spalten[2];
        raeume.push({
            kurs: fach,
            raum: raum
        });
        //
        // test for existence in other week
        //
        var exists = false;
        kurse[woche].kurse.forEach(function (kurs) {
            if (fach === kurs.fach)
                exists = true;
        });
        if (!exists)
            kurse[woche].kurse.push({
                title: title,
                fach: fach,
                lehrer: lehrer
            });
    }); // info
    return {
        type: 'kurs',
        fach: title,
        isBig: doppelStunde,
        raeume: raeume,
        tag: tag - 1,
        isUsed: isUsed
    };
}
function isPauseOrEmpty(td) {
    return /^\npause\n/i.test(td.textContent) || td.textContent === "";
}
function isDoppelStunde(td) {
    return (td.getAttribute('rowspan') === "4");
}
function fitIn(data, tag) {
    var isUsed = false;
    var indexOfFirstSmallSlotBefore = data[data.length - 1].findIndex(function (e) { return !e.isBig && !e.isUsed; });
    tag = indexOfFirstSmallSlotBefore === -1 ? tag : indexOfFirstSmallSlotBefore + 1;
    // +1 to counter following -1, which is needed because of the exclusion
    if (indexOfFirstSmallSlotBefore !== -1) {
        data[data.length - 1][indexOfFirstSmallSlotBefore].isUsed = true;
        isUsed = true;
    }
    return { tag: tag, isUsed: isUsed };
}
function md5(val) {
    val = val.replace(/[\n\W]/g, "");
    var result = "";
    var MD5 = function (d) { result = M(V(Y(X(d), 8 * d.length))); return result.toLowerCase(); };
    function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)
        _ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f; }
    function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)
        _[m] = 0; for (m = 0; m < 8 * d.length; m += 8)
        _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _; }
    function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)
        _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _; }
    function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
        var h = m, t = f, g = r, e = i;
        f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e);
    } return Array(m, f, r, i); }
    function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m); }
    function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n); }
    function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n); }
    function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n); }
    function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n); }
    function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m; }
    function bit_rol(d, _) { return d << _ | d >>> 32 - _; }
    result = MD5(val);
    return result;
}


/***/ }),

/***/ "./src/app/main/s/network/evavd.ts":
/*!*****************************************!*\
  !*** ./src/app/main/s/network/evavd.ts ***!
  \*****************************************/
/*! exports provided: evaVD */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "evaVD", function() { return evaVD; });
function evaVD(ret, lehrer) {
    lehrer = lehrer || false;
    // .toLowerCase
    var SACONDITION = ['selbstständiges arbeiten', "selbständiges arbeiten", "selbstständies arbeiten", "selbstäniges arbeiten", "eigenständiges arbeiten", "eva"];
    var VARTEN = ['entfall', 'vertretung', 'stattvertretung', 'raumvtr', 'klausur', "absenz"];
    var VABKUERZUNG = ['e', 'v', 'statt-v', 'r', 'k', 'fehlt'];
    var stufen = [];
    function typeAbkuerzen(type, infotext) {
        var sa = infotext.includes('SELBST. ARB.');
        var index = VARTEN.findIndex(function (art) { return art === type; });
        if (index === -1 && !sa)
            return type;
        return sa ? 'e (v)' : VABKUERZUNG[index];
    }
    var returnArray = [undefined, undefined];
    var parser = new DOMParser();
    var doc = parser.parseFromString(ret, "text/html");
    // return next file
    // @ts-ignore
    returnArray[0] = doc.querySelector('meta[http-equiv="refresh"]').content.split('URL=')[1];
    Array.from(doc.querySelectorAll('tr.list.odd,tr.list.even')).forEach(function (zeile) {
        if (zeile.children.length === 0)
            return;
        var children = zeile.children;
        var firstChild = zeile.firstChild;
        // 'inline_header' is the classname of the td that indicates a new Stufe
        if (/( |^)inline_header( |$)/.test(firstChild.className)) {
            stufen.push({
                stufe: firstChild.innerText.split(' ')[0],
                cntnd: []
            });
            return;
        }
        var date = "";
        var oldroom = !lehrer ? children[4].innerText.replace(/\s/g, "") : '?';
        var klasse;
        var stundenstr = children[1].innerText.replace(/\s/g, "");
        var stunden = stundenstr.split("-"); // [1, 2]
        var fach = children[lehrer ? 3 : 2].innerText;
        var type = children[lehrer ? 6 : 3].innerText.replace(/\W/g, "").toLowerCase();
        var newroom = children[lehrer ? 4 : 5].innerText.replace(/\s/g, "");
        var infotext = children[lehrer ? 7 : 6].innerText.replace('\u00a0', '');
        SACONDITION.forEach(function (cond) {
            infotext = infotext.toUpperCase().replace(cond.toUpperCase(), 'SELBST. ARB.');
        });
        infotext = infotext.replace('AUFGABEN', 'AUFG.');
        type = typeAbkuerzen(type, infotext);
        if (!lehrer) {
            date = children[0].innerText.replace(/\s/g, "");
        }
        else {
            (doc.getElementsByClassName('mon_title')[0]).innerText.split('.').forEach(function (value, index, array) {
                if (index === array.length - 1)
                    return;
                date += value.replace(" ", "") + ".";
            });
            klasse = children[2].innerText.replace(/\s/g, "");
        }
        var pushObj = {
            type: type,
            date: date,
            fach: fach,
            oldRaum: oldroom,
            newRaum: newroom,
            info: infotext,
        };
        if (lehrer) {
            pushObj.stufe = klasse;
        }
        stunden.forEach(function (stunde, i, array) {
            var obj = Object.assign({}, pushObj);
            obj.stunde = stunde;
            stufen[stufen.length - 1].cntnd.push(obj);
            if (i === (array.length - 1)) {
                var alls_1 = "";
                array.forEach(function (ts, ind) {
                    alls_1 += ts + (ind < array.length - 1 ? " - " : "");
                });
                obj = Object.assign({}, pushObj);
                obj.stunde = alls_1;
                obj.nd = 1;
                stufen[stufen.length - 1].cntnd.push(obj);
            }
        });
    });
    var infoBox = [];
    Array.from(doc.querySelectorAll('tr.info')).forEach(function (inforow, i) {
        Array.from(inforow.children).forEach(function (child) {
            if (child.tagName.toLowerCase() === "th" ||
                child.parentElement.childElementCount !== 1 &&
                    i === 1) {
                infoBox.push('<b>' + child.innerText + '</b>');
            }
            else {
                infoBox.push(child.innerText);
            }
        });
    });
    returnArray[1] = [stufen, infoBox];
    return returnArray;
}


/***/ }),

/***/ "./src/app/main/s/network/getVertretungsdaten.ts":
/*!*******************************************************!*\
  !*** ./src/app/main/s/network/getVertretungsdaten.ts ***!
  \*******************************************************/
/*! exports provided: getVertretungsDaten */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVertretungsDaten", function() { return getVertretungsDaten; });
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../conf */ "./src/app/conf.ts");
/* harmony import */ var _evavd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./evavd */ "./src/app/main/s/network/evavd.ts");


var start = 'subst_001.htm';
function getVertretungsDaten(that, domParser, tag, i, urlmiddle, file, sides) {
    if (domParser === void 0) { domParser = new DOMParser(); }
    if (urlmiddle === void 0) { urlmiddle = "f1"; }
    if (file === void 0) { file = ['subst_001.htm', 'subst_001.htm']; }
    if (sides === void 0) { sides = []; }
    if (!that.baseService.credentials.l || !that.baseService.preLehrer)
        return new Promise(function (resolve, reject) {
            that.baseService.makeConnections(_conf__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].vertURL + urlmiddle + '/' + file[i]).subscribe(function (wert) {
                var cmp = domParser.parseFromString(wert, "text/html").querySelector(".mon_title").textContent.trim();
                if (cmp.match(tag) === null)
                    reject(urlmiddle);
                var eva = Object(_evavd__WEBPACK_IMPORTED_MODULE_1__["evaVD"])(wert);
                file[i] = eva[0];
                sides.push(eva[1]);
                resolve([tag, i, urlmiddle, file, sides]);
            }, function (err) {
                that.alertService.alert('Failure: ' + err.statusText, that.alertService.DANGER);
                reject('fail');
            });
        })
            .then(function (t) {
            var tag = t[0];
            var i = t[1];
            var urlmiddle = t[2];
            var file = t[3];
            var sides = t[4];
            if (file[i] == start) {
                return that.compileVD(sides);
            }
            else
                return getVertretungsDaten(that, domParser, tag, i, urlmiddle, file, sides);
        })
            .catch(function (err) {
            if (err != 'fail') {
                if (err != 'f2')
                    return getVertretungsDaten(that, domParser, tag, i, 'f2');
                else
                    return new Promise(function (resolve, reject) { reject('loop'); });
            }
            else {
                return new Promise(function (resolve, reject) { reject(); });
            }
        });
    else
        return new Promise(function (resolve, reject) {
            that.baseService.makeConnections(_conf__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].lehrerURL + urlmiddle + '/' + file[i], true).subscribe(function (wert) {
                var cmp = domParser.parseFromString(wert, "text/html").querySelector(".mon_title").textContent.trim();
                if (cmp.match(tag) === null)
                    reject(urlmiddle);
                var eva = Object(_evavd__WEBPACK_IMPORTED_MODULE_1__["evaVD"])(wert, true);
                file[i] = eva[0];
                sides.push(eva[1]);
                resolve([tag, i, urlmiddle, file, sides]);
            }, function (err) {
                that.alertService.alert('Failure: ' + err.statusText, that.alertService.DANGER);
                reject('fail');
            });
        })
            .then(function (t) {
            var tag = t[0];
            var i = t[1];
            var urlmiddle = t[2];
            var file = t[3];
            var sides = t[4];
            if (file[i] == start) {
                return that.compileVD(sides, true);
            }
            else {
                return getVertretungsDaten(that, domParser, tag, i, urlmiddle, file, sides);
            }
        })
            .catch(function (err) {
            if (err != 'fail') {
                console.log("rej " + err);
                if (err != 'f2')
                    return getVertretungsDaten(that, domParser, tag, i, 'f2');
                else
                    return new Promise(function (resolve, reject) { reject('loop'); });
            }
            else {
                that.baseService.milchglas = false;
                return new Promise(function (resolve, reject) { reject(); });
            }
        });
}


/***/ }),

/***/ "./src/app/main/s/network/initial.netw.ts":
/*!************************************************!*\
  !*** ./src/app/main/s/network/initial.netw.ts ***!
  \************************************************/
/*! exports provided: getTT, get_stufen, getkurse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTT", function() { return getTT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_stufen", function() { return get_stufen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getkurse", function() { return getkurse; });
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../conf */ "./src/app/conf.ts");
/* harmony import */ var _evakurse_netw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./evakurse.netw */ "./src/app/main/s/network/evakurse.netw.ts");


var tempTTs = [];
var _kurse = [{ kurse: [] }, { kurse: [] }];
function getTT(stufe) {
    console.log(stufe);
    console.log(tempTTs);
    var r = null;
    var hash = null;
    tempTTs.forEach(function (val) {
        if (val.stufe === stufe) {
            r = val.tt;
            hash = val.hash;
        }
    });
    return { tt: r, hash: hash };
}
function get_stufen(resp) {
    return new Promise(function (resolve, reject) {
        if (resp === null) {
            reject('Failure: No Credentials given, how did you even get here?');
        }
        resp.subscribe(function (wert) {
            // save weeks
            var w = wert.split('<option value="');
            var wochen = [
                w[1][0] + w[1][1],
                w[2][0] + w[2][1]
            ];
            console.log(wochen);
            var a = wert
                .split('var classes = ')[1]
                .split(';')[0]
                .replace(/(")|(\[)|(])|( )/g, '')
                .split(',');
            resolve([a, wochen]);
        }, function (err) {
            console.log(err);
            reject('Failure: ' + err.statusText);
        });
    });
}
function getkurse(stufe, stufeid, wochen, baseService) {
    return new Promise(function (resolve, reject) {
        if (!wochen[0] || !wochen[1])
            reject('Internal Error: #01');
        var res = baseService.makeConnections(_conf__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].baseKursURL + wochen[0] + '/c/c' + generate5(stufeid) + '.htm');
        if (res === null)
            reject('Failure: Connection could not be made');
        res.subscribe(function (r) {
            Object(_evakurse_netw__WEBPACK_IMPORTED_MODULE_1__["evaKurse"])(r, stufe, tempTTs, _kurse);
            //woche 2
            var res2 = baseService.makeConnections(_conf__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].baseKursURL + wochen[1] + '/c/c' + generate5(stufeid) + '.htm');
            res2.subscribe(function (r) {
                Object(_evakurse_netw__WEBPACK_IMPORTED_MODULE_1__["evaKurse"])(r, stufe, tempTTs, _kurse);
                var k = [];
                _kurse[0].kurse.forEach(function (val) {
                    _kurse[1].kurse.forEach(function (val2) {
                        if (val2 === val)
                            k.push(val);
                    });
                });
                var fin = [];
                _kurse[0].kurse.forEach(function (val) {
                    if (k.indexOf(val) === -1)
                        fin.push(val);
                });
                _kurse = [{ kurse: [] }, { kurse: [] }];
                resolve(fin);
            });
        }, function (err) {
            console.log(err);
            reject('Failure: ' + err.statusText);
        });
    });
}
function generate5(id) {
    var s = '' + id;
    while (s.length < 5) {
        s = '0' + s;
    }
    return s;
}


/***/ }),

/***/ "./src/app/main/s/network/netw.service.ts":
/*!************************************************!*\
  !*** ./src/app/main/s/network/netw.service.ts ***!
  \************************************************/
/*! exports provided: NetwService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetwService", function() { return NetwService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../conf */ "./src/app/conf.ts");
/* harmony import */ var _base_base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base/base.service */ "./src/app/main/s/base/base.service.ts");
/* harmony import */ var _alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../alert.service */ "./src/app/main/s/alert.service.ts");
/* harmony import */ var _cloud_netw__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cloud.netw */ "./src/app/main/s/network/cloud.netw.ts");
/* harmony import */ var _initial_netw__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./initial.netw */ "./src/app/main/s/network/initial.netw.ts");
/* harmony import */ var _getVertretungsdaten__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getVertretungsdaten */ "./src/app/main/s/network/getVertretungsdaten.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var NetwService = /** @class */ (function () {
    function NetwService(baseService, alertService) {
        var _this = this;
        this.baseService = baseService;
        this.alertService = alertService;
        this.wochen = [];
        this.saveKurseTrys = 0;
        this.getkurse = function (stufe, stufeid) { return _initial_netw__WEBPACK_IMPORTED_MODULE_5__["getkurse"](stufe, stufeid, _this.wochen, _this.baseService); };
        this.getTT = function (stufe) { return _initial_netw__WEBPACK_IMPORTED_MODULE_5__["getTT"](stufe); };
        this.fetchCloud = function (id) { return _cloud_netw__WEBPACK_IMPORTED_MODULE_4__["fetchCloud"](id, _this); };
        this.saveKurse = function (kurse) { return _cloud_netw__WEBPACK_IMPORTED_MODULE_4__["saveKurse"](kurse, _this); };
    }
    NetwService.prototype.getSchulplanerInfo = function (date) {
        var _this = this;
        date = date.replace(/\./g, "-"); // eg.: "23-1-"
        return new Promise(function (resolve, reject) {
            _this.baseService.makeConnections(_conf__WEBPACK_IMPORTED_MODULE_1__["CONFIG"].databaseURL + "info/" + date + "/" + _this.baseService.myStufe + ".json").subscribe(function (val) {
                var val2 = (val != "null") ? JSON.parse(val) : [];
                _this.baseService.makeConnections(_conf__WEBPACK_IMPORTED_MODULE_1__["CONFIG"].databaseURL + "info/" + date + "/*.json").subscribe(function (valueAll) {
                    var valueAll2 = (valueAll == "null") ? [] : JSON.parse(valueAll);
                    resolve(val2.concat(valueAll2));
                });
            }, function (err) {
                reject(err);
            });
        });
    };
    NetwService.prototype.compileVD = function (slides, lehrer) {
        lehrer = lehrer || false;
        var compr = {};
        var info = [];
        slides.forEach(function (a) {
            a[0].forEach(function (t) {
                var arr = [];
                t.cntnd.forEach(function (r) {
                    var arrObj = {
                        stufe: decodeHtml(lehrer ? r.stufe : t.stufe),
                        date: decodeHtml(r.date),
                        fach: decodeHtml(r.fach),
                        oldRaum: decodeHtml(r.oldRaum),
                        newRaum: decodeHtml(r.newRaum),
                        info: decodeHtml(r.info),
                        stunde: decodeHtml(r.stunde),
                        type: decodeHtml(r.type),
                        nd: r.nd
                    };
                    if (lehrer)
                        arrObj.lehrer = decodeHtml(t.stufe);
                    arr.push(arrObj);
                });
                arr.forEach(function (arrE) {
                    if (compr[arrE.stufe])
                        compr[arrE.stufe].push(arrE);
                    else
                        compr[arrE.stufe] = [arrE];
                });
            });
            if (a[1][0])
                info.push(a[1]);
        });
        // sort
        for (var stufe in compr) {
            compr[stufe].sort(function (a, b) {
                if (a.stunde > b.stufe)
                    return 1;
                if (a.stufe < b.stufe)
                    return -1;
                else
                    return 0;
            });
        }
        return [info, compr];
    };
    Object.defineProperty(NetwService.prototype, "stufen", {
        get: function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this._stufen = (localStorage.stufen) ? JSON.parse(localStorage.stufen) : undefined;
                if (_this._stufen)
                    resolve(_this._stufen);
                var observable = _this.baseService.makeConnections(_conf__WEBPACK_IMPORTED_MODULE_1__["CONFIG"].credentialsCheckUrl);
                _initial_netw__WEBPACK_IMPORTED_MODULE_5__["get_stufen"](observable)
                    .then(function (res) {
                    var stufen = res[0];
                    _this.wochen = res[1];
                    _this._stufen = stufen;
                    localStorage.stufen = JSON.stringify(stufen);
                    resolve(stufen);
                })
                    .catch(function (msg) {
                    _this.alertService.alert(msg, _this.alertService.DANGER);
                    reject(msg);
                });
            });
        },
        enumerable: true,
        configurable: true
    });
    NetwService.prototype.getVertretungsDaten = function (tag, i, urlmiddle, file, sides) {
        return Object(_getVertretungsdaten__WEBPACK_IMPORTED_MODULE_6__["getVertretungsDaten"])(this, new DOMParser(), tag, i, urlmiddle, file, sides);
    };
    NetwService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_base_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"], _alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"]])
    ], NetwService);
    return NetwService;
}());

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}


/***/ }),

/***/ "./src/app/main/s/refreshtt.service.ts":
/*!*********************************************!*\
  !*** ./src/app/main/s/refreshtt.service.ts ***!
  \*********************************************/
/*! exports provided: RefreshttService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefreshttService", function() { return RefreshttService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _network_netw_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./network/netw.service */ "./src/app/main/s/network/netw.service.ts");
/* harmony import */ var _base_base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base/base.service */ "./src/app/main/s/base/base.service.ts");
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../conf */ "./src/app/conf.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var RefreshttService = /** @class */ (function () {
    function RefreshttService(baseService, netwService) {
        this.baseService = baseService;
        this.netwService = netwService;
        this.fails = 0;
    }
    RefreshttService.prototype.removeKurse = function () {
        this.baseService.myKurse = undefined;
        delete localStorage.myKurse;
        this.baseService.kursID = undefined;
        delete localStorage.kursID;
        this.baseService.verifiedNonKurse = false;
        delete localStorage.verifiedNonKurse;
        delete localStorage.notUsedNotKurse;
    };
    RefreshttService.prototype.removeTT = function () {
        this.baseService.milchglas = true;
        this.baseService.TT = undefined;
        delete localStorage.TT;
        this.baseService.verifiedNonKurse = false;
        delete localStorage.notUsedNotKurse;
        console.log("removed");
    };
    RefreshttService.prototype.refreshTT = function () {
        var _this = this;
        this.removeTT();
        return new Promise(function (resolve, reject) {
            _this.netwService.stufen.then(function () {
                console.log("calle getkurse");
                _this.netwService.getkurse(_this.baseService.myStufe, _this.baseService.myStufeID).then(function (val) {
                    console.log(val);
                    val.forEach(function (v) {
                        var drin = false;
                        _this.baseService.myKurse.forEach(function (aktuell) {
                            if (aktuell.fach == v.fach)
                                drin = true;
                        });
                    });
                    _this.baseService.setTT(_this.netwService.getTT(_this.baseService.myStufe));
                    _this.removeKurse();
                    _this.baseService.KlassenKurse = undefined;
                    delete localStorage.KlassenKurse;
                    _this.removeTT();
                    _this.baseService.milchglas = false;
                    resolve();
                }).catch(function (val) { console.log(val); setTimeout(function () { _this.fails++; if (_this.fails > 2)
                    reject();
                else
                    resolve(_this.refreshTT()); }, 500); });
            }).catch(function (val) { console.log(val); });
        });
    };
    RefreshttService.prototype.needsRefresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.baseService.makeConnections(_conf__WEBPACK_IMPORTED_MODULE_3__["CONFIG"].hashURL + "?stufe=" + this.baseService.myStufeID, false, false).toPromise()];
                    case 1:
                        res = _a.sent();
                        ret = res.trim() === localStorage.stundnplanHash.trim();
                        if (!ret)
                            console.error("HASHABGLEICH FEHLGESCHLAGEN " + res);
                        return [2 /*return*/, !ret];
                }
            });
        });
    };
    RefreshttService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_base_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"], _network_netw_service__WEBPACK_IMPORTED_MODULE_1__["NetwService"]])
    ], RefreshttService);
    return RefreshttService;
}());



/***/ }),

/***/ "./src/app/main/sure/sure.dialog.component.ts":
/*!****************************************************!*\
  !*** ./src/app/main/sure/sure.dialog.component.ts ***!
  \****************************************************/
/*! exports provided: SureDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SureDialogComponent", function() { return SureDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SureDialogComponent = /** @class */ (function () {
    function SureDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    SureDialogComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    SureDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sure',
            template: "\n    <h4 mat-dialog-title>Willst du das wirklich?</h4>\n    <div mat-dialog-actions>\n      <button mat-button (click)=\"close()\" cdkFocusInitial>Abbrechen</button>\n      <button mat-button [mat-dialog-close]=\"true\" color=\"red\">L\u00F6schen</button>\n    </div>\n\n  "
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"]])
    ], SureDialogComponent);
    return SureDialogComponent;
}());



/***/ }),

/***/ "./src/app/verifynotkurse/verifynotkurse-routing.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/verifynotkurse/verifynotkurse-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: VerifynotkurseRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifynotkurseRoutingModule", function() { return VerifynotkurseRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _verifynotkurse_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./verifynotkurse.component */ "./src/app/verifynotkurse/verifynotkurse.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [{
        path: '', component: _verifynotkurse_component__WEBPACK_IMPORTED_MODULE_2__["VerifynotkurseComponent"]
    }];
var VerifynotkurseRoutingModule = /** @class */ (function () {
    function VerifynotkurseRoutingModule() {
    }
    VerifynotkurseRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], VerifynotkurseRoutingModule);
    return VerifynotkurseRoutingModule;
}());



/***/ }),

/***/ "./src/app/verifynotkurse/verifynotkurse.component.html":
/*!**************************************************************!*\
  !*** ./src/app/verifynotkurse/verifynotkurse.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"center\" style=\"margin-bottom: 50px!important; margin-top: 10px!important;\">\n\n  <h3 mat-card-title>BGW hat Nicht-Kurse gefunden</h3>\n  <p>Da manche Kurse nicht als solche zu identifizieren sind, geht BGW davon aus, dass es sich um Fächer handelt,\n    bei denen die ganze Klasse anwesend ist. Für die Unter- und Mittelstufe ist das vollkommen normal. Solltest du in der Oberstufe sein deutet dies oft auf Fehler in der Plangunssoftware hin.\n    <b>Bitte überprüfe die Auswahl und wähle Fächer ab, die du nicht hast.</b>\n  </p>\n\n  <button mat-raised-button\n          class=\"big-btn\"\n          style=\"margin: 10px 5px\"\n          *ngFor=\"let k of klassenK\"\n          [ngClass]=\"{'green-btn': k.sel}\"\n          [disabled]=\"k.dis\"\n          (click)=\"k.sel = !k.sel\">{{k.klasse}}</button>\n\n  <br><br><br>\n\n  <div>\n    <button mat-raised-button (click)=\"submit()\">Ok</button>\n  </div>\n\n\n</mat-card>\n"

/***/ }),

/***/ "./src/app/verifynotkurse/verifynotkurse.component.ts":
/*!************************************************************!*\
  !*** ./src/app/verifynotkurse/verifynotkurse.component.ts ***!
  \************************************************************/
/*! exports provided: VerifynotkurseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifynotkurseComponent", function() { return VerifynotkurseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _main_s_base_base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../main/s/base/base.service */ "./src/app/main/s/base/base.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VerifynotkurseComponent = /** @class */ (function () {
    function VerifynotkurseComponent(base, router) {
        this.base = base;
        this.router = router;
        this.klassenK = [];
    }
    VerifynotkurseComponent.prototype.ngOnInit = function () {
        this.klassenK = Array.from(this.base.KlassenKurse).map(function (s) { return { klasse: s, sel: true, dis: false }; });
        if (!!localStorage.notUsedNotKurse)
            this.klassenK =
                this.klassenK
                    .concat(JSON.parse(localStorage.notUsedNotKurse)
                    .map(function (s) { return { klasse: s, sel: false, dis: true }; }));
    };
    VerifynotkurseComponent.prototype.submit = function () {
        var _this = this;
        var oldNotUsed = null;
        if (!!localStorage.notUsedNotKurse)
            oldNotUsed = JSON.parse(localStorage.notUsedNotKurse);
        var filtered = this.klassenK.filter(function (o) { return o.sel && !o.dis; }).map(function (o) { return o.klasse; });
        var notUsed = this.klassenK.filter(function (o) { return !o.sel || o.dis; }).map(function (o) { return o.klasse; });
        if (JSON.stringify(notUsed) === JSON.stringify(oldNotUsed) &&
            JSON.stringify(filtered) === JSON.stringify(this.base.KlassenKurse))
            return this.router.navigate(['/show']);
        this.base.TT.forEach(function (woche, wi) {
            woche.days.forEach(function (day, di) {
                _this.base.TT[wi].days[di] =
                    day.filter(function (stunde) { return !(stunde.type === "klasse" && filtered.indexOf(stunde.fach) === -1); });
            });
        });
        localStorage.TT = JSON.stringify(this.base.TT);
        this.base.KlassenKurse = filtered;
        localStorage.KlassenKurse = JSON.stringify(filtered);
        localStorage.notUsedNotKurse = JSON.stringify(notUsed);
        this.base.verifiedNonKurse = true;
        localStorage.verifiedNonKurse = true;
        this.router.navigate(["/show"]);
    };
    VerifynotkurseComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-verifynotkurse',
            template: __webpack_require__(/*! ./verifynotkurse.component.html */ "./src/app/verifynotkurse/verifynotkurse.component.html")
        }),
        __metadata("design:paramtypes", [_main_s_base_base_service__WEBPACK_IMPORTED_MODULE_1__["BaseService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], VerifynotkurseComponent);
    return VerifynotkurseComponent;
}());



/***/ }),

/***/ "./src/app/verifynotkurse/verifynotkurse.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/verifynotkurse/verifynotkurse.module.ts ***!
  \*********************************************************/
/*! exports provided: VerifynotkurseModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifynotkurseModule", function() { return VerifynotkurseModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _verifynotkurse_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./verifynotkurse.component */ "./src/app/verifynotkurse/verifynotkurse.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _verifynotkurse_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./verifynotkurse-routing.module */ "./src/app/verifynotkurse/verifynotkurse-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var VerifynotkurseModule = /** @class */ (function () {
    function VerifynotkurseModule() {
    }
    VerifynotkurseModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _verifynotkurse_routing_module__WEBPACK_IMPORTED_MODULE_4__["VerifynotkurseRoutingModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"]
            ],
            declarations: [_verifynotkurse_component__WEBPACK_IMPORTED_MODULE_2__["VerifynotkurseComponent"]]
        })
    ], VerifynotkurseModule);
    return VerifynotkurseModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/max/Dokumente/Web Prgcts/BetterGymWue/source/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map