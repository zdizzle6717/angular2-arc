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
var provider_service_1 = require("../../services/provider.service");
var ProviderViewComponent = (function () {
    function ProviderViewComponent(route, router, service) {
        this.route = route;
        this.router = router;
        this.service = service;
        this.provider = {};
    }
    ProviderViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.service.getProvider(+params['id']); })
            .subscribe(function (provider) { return _this.provider = provider; });
    };
    return ProviderViewComponent;
}());
ProviderViewComponent = __decorate([
    core_1.Component({
        selector: 'provider-view',
        template: "\n\t\t<div class=\"row\">\n      <h1 class=\"push-bottom-2x\">Provider: <strong>{{provider.name}}</strong>\n      </h1>\n      <h5>ID: {{provider.id}}</h5>\n      <div class=\"row\">\n          <div class=\"small-12 medium-4 columns\">\n              <label>\n                  <u>{{provider.identifierType}}</u>\n              </label>\n              <p class=\"text-justify\">\n                  {{provider.identifier}}\n              </p>\n          </div>\n          <div class=\"small-12 medium-4 columns\">\n              <label>\n                  <u>Provider Number</u>\n              </label>\n              <p class=\"text-justify\">\n                  {{provider.providerNumber}}\n              </p>\n          </div>\n          <div class=\"small-12 medium-4 columns\">\n              <label>\n                  <u>DBA</u>\n              </label>\n              <p class=\"text-justify\">\n                  {{provider.dba}}\n              </p>\n          </div>\n      </div>\n  </div>\n\t",
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        provider_service_1.ProviderService])
], ProviderViewComponent);
exports.ProviderViewComponent = ProviderViewComponent;
//# sourceMappingURL=providerView.component.js.map