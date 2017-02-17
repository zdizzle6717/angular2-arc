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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
require("rxjs/add/operator/switchMap");
var contact_service_1 = require("../../services/contact.service");
var ContactViewComponent = (function () {
    function ContactViewComponent(route, router, service) {
        this.route = route;
        this.router = router;
        this.service = service;
        this.contact = {};
    }
    ContactViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.service.getContact(+params['id']); })
            .subscribe(function (contact) { return _this.contact = contact; });
    };
    return ContactViewComponent;
}());
ContactViewComponent = __decorate([
    core_1.Component({
        selector: 'contact-view',
        template: "\n\t\t<div class=\"row\">\n\t\t\t<div>\n\t\t\t\t<h3 class=\"push-bottom-2x\">View Contact: <strong>{{contact.firstName}} {{contact.middleName}} {{contact.lastName}}</strong></h3>\n\t\t\t\t<h5>ID: {{contact.id}}\n\t\t\t\t</h5>\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"small-12 medium-4 columns\">\n\t\t\t\t\t\t<label><u>Email</u></label>\n\t\t\t\t\t\t<p class=\"text-justify\">\n\t\t\t\t\t\t\t{{contact.email}}\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"small-12 medium-4 columns\">\n\t\t\t\t\t\t<label><u>Mobile Phone</u></label>\n\t\t\t\t\t\t<p class=\"text-justify\">\n\t\t\t\t\t\t\t{{contact.mobilePhone}}\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"small-12 medium-4 columns\">\n\t\t\t\t\t\t<label><u>Fax</u></label>\n\t\t\t\t\t\t<p class=\"text-justify\">\n\t\t\t\t\t\t\t{{contact.fax}}\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t",
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        contact_service_1.ContactService])
], ContactViewComponent);
exports.ContactViewComponent = ContactViewComponent;
//# sourceMappingURL=contactView.component.js.map