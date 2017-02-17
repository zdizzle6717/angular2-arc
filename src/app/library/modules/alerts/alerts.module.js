"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// Components
var alerts_component_1 = require("./components/alerts.component");
var AlertsModule = (function () {
    function AlertsModule() {
    }
    return AlertsModule;
}());
AlertsModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [alerts_component_1.AlertsComponent],
        providers: [],
        exports: [alerts_component_1.AlertsComponent]
    })
], AlertsModule);
exports.AlertsModule = AlertsModule;
//# sourceMappingURL=alerts.module.js.map