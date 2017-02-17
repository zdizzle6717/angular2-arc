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
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var _alertTimeout = 5000;
var AlertService = (function () {
    function AlertService() {
        this.alerts = new BehaviorSubject_1.BehaviorSubject([]);
        this.alerts$ = this.alerts.asObservable();
    }
    AlertService.prototype.addAlert = function (alert) {
        var _this = this;
        alert.id = Date.now();
        var _alerts = this.alerts.value.concat([alert]);
        this.alerts.next(_alerts);
        if (alert.delay !== -1) {
            var delay = alert.delay ? alert.delay : _alertTimeout;
            setTimeout(function () {
                _this.removeAlert(alert);
            }, delay);
        }
    };
    AlertService.prototype.removeAlert = function (alert) {
        var _alerts = this.alerts.value.slice();
        var index = _alerts.findIndex(function (_alert) { return _alert.id === alert.id; });
        if (index !== -1) {
            _alerts.splice(index, 1);
        }
        this.alerts.next(_alerts);
    };
    return AlertService;
}());
AlertService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], AlertService);
exports.AlertService = AlertService;
;
//# sourceMappingURL=alert.service.js.map