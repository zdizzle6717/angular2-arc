'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var customHttp_service_1 = require("../../main/services/customHttp.service");
var ContactService = (function () {
    function ContactService(apiBaseRoute, http) {
        this.apiBaseRoute = apiBaseRoute;
        this.http = http;
        this.baseUrl = this.apiBaseRoute;
    }
    ContactService.prototype.extractData = function (res) {
        var body = res.json();
        return body || [];
    };
    ContactService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    };
    ContactService.prototype.getContact = function (id) {
        return this.http.get(this.baseUrl + 'contacts/' + id).map(this.extractData).catch(this.handleError);
    };
    ContactService.prototype.getContacts = function () {
        return this.http.get(this.baseUrl + 'contacts').map(this.extractData).catch(this.handleError);
    };
    ContactService.prototype.paginatedSearch = function (criteria) {
        return this.http.post(this.baseUrl + 'contacts/search', criteria).map(this.extractData).catch(this.handleError);
    };
    ContactService.prototype.addContact = function (contact) {
        return this.http.post(this.baseUrl + 'contacts', contact).map(this.extractData).catch(this.handleError);
    };
    ContactService.prototype.updateContact = function (id, contact) {
        return this.http.put(this.baseUrl + 'contacts/' + id, contact).map(this.extractData).catch(this.handleError);
    };
    ContactService.prototype.removeContact = function (id) {
        return this.http.delete(this.baseUrl + 'contacts/' + id).catch(this.handleError);
    };
    return ContactService;
}());
ContactService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject('EGOV_API_BASE_ROUTE')),
    __metadata("design:paramtypes", [Object, customHttp_service_1.CustomHttp])
], ContactService);
exports.ContactService = ContactService;
;
//# sourceMappingURL=contact.service.js.map