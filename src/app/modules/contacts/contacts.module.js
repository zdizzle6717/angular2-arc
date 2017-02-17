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
var pagination_module_1 = require("../../library/modules/pagination/pagination.module");
// Routing
var routing_module_1 = require("./routing.module");
// Component Views
var contactSearch_component_1 = require("./components/views/contactSearch.component");
var contactView_component_1 = require("./components/views/contactView.component");
var contactEdit_component_1 = require("./components/views/contactEdit.component");
// Components
var contactForm_component_1 = require("./components/contactForm.component");
var contactList_component_1 = require("./components/contactList.component");
var contactTable_component_1 = require("./components/contactTable.component");
// Services
var contact_service_1 = require("./services/contact.service");
var ContactsModule = (function () {
    function ContactsModule() {
    }
    return ContactsModule;
}());
ContactsModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule, routing_module_1.RoutingModule, auth_module_1.AuthModule, modal_module_1.ModalModule, pagination_module_1.PaginationModule],
        declarations: [contactSearch_component_1.ContactSearchComponent, contactView_component_1.ContactViewComponent, contactEdit_component_1.ContactEditComponent, contactForm_component_1.ContactFormComponent, contactList_component_1.ContactListComponent, contactTable_component_1.ContactTableComponent],
        providers: [contact_service_1.ContactService],
        exports: [contactTable_component_1.ContactTableComponent]
    })
], ContactsModule);
exports.ContactsModule = ContactsModule;
//# sourceMappingURL=contacts.module.js.map