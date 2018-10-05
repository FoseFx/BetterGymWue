"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
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
        core_1.ViewChild(material_1.MatTabGroup)
    ], ShowComponent.prototype, "group", void 0);
    __decorate([
        core_1.ViewChildren(material_1.MatTab)
    ], ShowComponent.prototype, "tabs", void 0);
    ShowComponent = __decorate([
        core_1.Component({
            selector: 'app-show',
            templateUrl: './show.component.html',
            styleUrls: ['./show.component.css']
        })
    ], ShowComponent);
    return ShowComponent;
}());
exports.ShowComponent = ShowComponent;
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}
exports.getWeekNumber = getWeekNumber;
