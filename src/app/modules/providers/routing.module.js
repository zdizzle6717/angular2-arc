"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// Component Views
var providerSearch_component_1 = require("./components/views/providerSearch.component");
var providerView_component_1 = require("./components/views/providerView.component");
var providerEdit_component_1 = require("./components/views/providerEdit.component");
// Route Config
var appRoutes = [
    {
        path: 'providers',
        component: providerSearch_component_1.ProviderSearchComponent,
        data: { title: 'Angular2 | Search Providers' }
    },
    {
        path: 'providers/create',
        component: providerEdit_component_1.ProviderEditComponent,
        data: { title: 'Angular2 | Create Provider' }
    },
    {
        path: 'providers/:id',
        component: providerView_component_1.ProviderViewComponent,
        data: { title: 'Angular2 | View Providers' }
    },
    {
        path: 'providers/:id/edit',
        component: providerEdit_component_1.ProviderEditComponent,
        data: { title: 'Angular2 | Edit Providers' }
    }
];
var RoutingModule = (function () {
    function RoutingModule() {
    }
    return RoutingModule;
}());
RoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(appRoutes)],
        exports: [router_1.RouterModule]
    })
], RoutingModule);
exports.RoutingModule = RoutingModule;
//# sourceMappingURL=routing.module.js.map