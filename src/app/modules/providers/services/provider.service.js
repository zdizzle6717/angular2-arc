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
var ProviderService = (function () {
    function ProviderService(apiBaseRoute, http) {
        this.apiBaseRoute = apiBaseRoute;
        this.http = http;
        this.baseUrl = this.apiBaseRoute;
    }
    ProviderService.prototype.extractData = function (res) {
        var body = res.json();
        return body || [];
    };
    ProviderService.prototype.handleError = function (error) {
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
    ProviderService.prototype.getProvider = function (id) {
        return this.http.get(this.baseUrl + 'providers/' + id).map(this.extractData).catch(this.handleError);
    };
    ProviderService.prototype.getProviders = function () {
        return this.http.get(this.baseUrl + 'providers').map(this.extractData).catch(this.handleError);
    };
    ProviderService.prototype.addProvider = function (provider) {
        return this.http.post(this.baseUrl + 'providers', provider).map(this.extractData).catch(this.handleError);
    };
    ProviderService.prototype.updateProvider = function (id, provider) {
        return this.http.put(this.baseUrl + 'providers/' + id, provider).map(this.extractData).catch(this.handleError);
    };
    ProviderService.prototype.removeProvider = function (id) {
        return this.http.delete(this.baseUrl + 'providers/' + id).catch(this.handleError);
    };
    return ProviderService;
}());
ProviderService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject('EGOV_API_BASE_ROUTE')),
    __metadata("design:paramtypes", [Object, customHttp_service_1.CustomHttp])
], ProviderService);
exports.ProviderService = ProviderService;
;
//# sourceMappingURL=provider.service.js.map