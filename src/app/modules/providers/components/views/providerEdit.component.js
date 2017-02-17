"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ProviderEditComponent = (function () {
    function ProviderEditComponent() {
    }
    return ProviderEditComponent;
}());
ProviderEditComponent = __decorate([
    core_1.Component({
        selector: 'provider-edit',
        template: "\n\t\t<div class=\"row\">\n\t\t\t<provider-form></provider-form>\n\t\t</div>\n\t"
    })
], ProviderEditComponent);
exports.ProviderEditComponent = ProviderEditComponent;
//# sourceMappingURL=providerEdit.component.js.map