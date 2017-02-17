"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
// Routing
var routing_module_1 = require("./routing.module");
// Components
// Component Views
var demoList_component_1 = require("./components/views/demoList.component");
// Services
var DemosModule = (function () {
    function DemosModule() {
    }
    return DemosModule;
}());
DemosModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule, routing_module_1.RoutingModule],
        declarations: [demoList_component_1.DemoListComponent],
        providers: [],
        exports: []
    })
], DemosModule);
exports.DemosModule = DemosModule;
//# sourceMappingURL=demos.module.js.map