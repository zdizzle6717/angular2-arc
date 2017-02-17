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
// Modules
var auth_module_1 = require("../../library/modules/auth/auth.module");
var modal_module_1 = require("../../library/modules/modal/modal.module");
// Routing
var routing_module_1 = require("./routing.module");
// Component Views
var providerSearch_component_1 = require("./components/views/providerSearch.component");
var providerView_component_1 = require("./components/views/providerView.component");
var providerEdit_component_1 = require("./components/views/providerEdit.component");
// Components
var providerForm_component_1 = require("./components/providerForm.component");
var providerList_component_1 = require("./components/providerList.component");
var providerTable_component_1 = require("./components/providerTable.component");
// Services
var provider_service_1 = require("./services/provider.service");
var ProvidersModule = (function () {
    function ProvidersModule() {
    }
    return ProvidersModule;
}());
ProvidersModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule, routing_module_1.RoutingModule, auth_module_1.AuthModule, modal_module_1.ModalModule],
        declarations: [providerSearch_component_1.ProviderSearchComponent, providerView_component_1.ProviderViewComponent, providerEdit_component_1.ProviderEditComponent, providerForm_component_1.ProviderFormComponent, providerList_component_1.ProviderListComponent, providerTable_component_1.ProviderTableComponent],
        providers: [provider_service_1.ProviderService],
        exports: [providerTable_component_1.ProviderTableComponent]
    })
], ProvidersModule);
exports.ProvidersModule = ProvidersModule;
//# sourceMappingURL=providers.module.js.map