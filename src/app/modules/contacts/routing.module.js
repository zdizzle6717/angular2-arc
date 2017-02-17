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
var contactSearch_component_1 = require("./components/views/contactSearch.component");
var contactView_component_1 = require("./components/views/contactView.component");
var contactEdit_component_1 = require("./components/views/contactEdit.component");
// Route Config
var appRoutes = [
    {
        path: 'contacts',
        component: contactSearch_component_1.ContactSearchComponent,
        data: { title: 'Angular2 | All Contacts' }
    },
    {
        path: 'contacts/create',
        component: contactEdit_component_1.ContactEditComponent,
        data: { title: 'Angular2 | Create Contact' }
    },
    {
        path: 'contacts/:id',
        component: contactView_component_1.ContactViewComponent,
        data: { title: 'Angular2 | View Contact' }
    },
    {
        path: 'contacts/:id/edit',
        component: contactEdit_component_1.ContactEditComponent,
        data: { title: 'Angular2 | Edit Contact' }
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