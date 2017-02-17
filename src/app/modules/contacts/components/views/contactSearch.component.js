"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ContactSearchComponent = (function () {
    function ContactSearchComponent() {
    }
    return ContactSearchComponent;
}());
ContactSearchComponent = __decorate([
    core_1.Component({
        selector: 'contact-search',
        template: "\n\t\t<div class=\"row\">\n\t\t\t<h1 class=\"push-bottom-2x\">Search Contacts</h1>\n\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"small-12 medium-4 large-4 columns\">\n\t\t\t\t\t\t<a [routerLink]=\"['/contacts', 'create']\" routerLinkActive=\"active\" class=\"button small-12 large-6\">\n\t\t\t\t\t\t\t<i class=\"fa fa-plus\"></i> Add New Contact\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"small-12 medium-4 large-4 columns medium-offset-4 large-offset-4\">\n\t\t\t\t\t\t\t<div class=\"search-input\">\n\t\t\t\t\t\t\t\t\t<input type=\"search\" placeholder=\"Enter search terms...\"/>\n\t\t\t\t\t\t\t\t\t<span class=\"fa fa-search search-icon\"></span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<contact-list></contact-list>\n\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"small-12 medium-6 large-3 medium-offset-6 large-offset-9 columns text-right\">\n\t\t\t\t\t\t\t<label>Sort by:\n\t\t\t\t\t\t\t\t\t<select id=\"orderParams\" defaultValue=\"createdAt\">\n\t\t\t\t\t\t\t\t\t\t\t<option value=\"name\">Name (ascending)</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value=\"email\">Email (ascending)</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value=\"phone\">Phone (ascending)</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value=\"createdAt\">Date Created (ascending)</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value=\"updatedAt\">Last Updated (ascending)</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t",
    })
], ContactSearchComponent);
exports.ContactSearchComponent = ContactSearchComponent;
//# sourceMappingURL=contactSearch.component.js.map