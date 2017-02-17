"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ContactListComponent = (function () {
    function ContactListComponent() {
    }
    ContactListComponent = __decorate([
        core_1.Component({
            selector: 'contact-list',
            template: "\n\t\t<div class=\"row\">\n\t\t\t<div class=\"small-12 columns\">\n\t\t\t\t<h1>All Contacts</h1>\n\t\t\t\t<li>\n\t\t\t\t\t<a [routerLink]=\"['/contacts', 5]\" routerLinkActive=\"active\" class=\"button\">View Contact (id: 5)</a>\n\t\t\t\t</li>\n\t\t\t</div>\n\t\t</div>\n\t",
        }), 
        __metadata('design:paramtypes', [])
    ], ContactListComponent);
    return ContactListComponent;
}());
exports.ContactListComponent = ContactListComponent;
//# sourceMappingURL=contactList.component.js.map