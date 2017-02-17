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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var user_1 = require("../types/user");
var UserService = (function () {
    function UserService(userRoles, apiBaseRoute, http) {
        var _this = this;
        this.userRoles = userRoles;
        this.apiBaseRoute = apiBaseRoute;
        this.http = http;
        this.baseUrl = this.apiBaseRoute;
        this.storedUser = sessionStorage.getItem('storedUser') ? JSON.parse(sessionStorage.getItem('storedUser')) : new user_1.User();
        this.currentUser = new BehaviorSubject_1.BehaviorSubject(this.storedUser);
        this.currentUser$ = this.currentUser.asObservable();
        this.extractUserData = function (res) {
            var user = res.json();
            user.isAuthenticated = true;
            if (user) {
                _this.userRoles.forEach(function (role) {
                    if (role.roleFlags === user.roleFlags) {
                        user.roleConfig = role;
                    }
                });
                if (!user.roleConfig) {
                    throw new Error('Oops! Make sure that the rolesConfig on the UI and API have matching values.');
                }
            }
            _this.currentUser.next(user);
            sessionStorage.setItem('storedUser', JSON.stringify(user));
            return user || {};
        };
    }
    UserService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.message || JSON.stringify(body);
            errMsg = err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    };
    UserService.prototype.authenticate = function (user) {
        return this.http.post(this.baseUrl + 'users/authenticate', user).map(this.extractUserData).catch(this.handleError);
    };
    UserService.prototype.register = function (credentials) {
        return this.http.post(this.baseUrl + 'users', credentials).map(this.extractUserData).catch(this.handleError);
    };
    UserService.prototype.logout = function () {
        this.currentUser.next(new user_1.User());
        sessionStorage.removeItem('storedUser');
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject('EGOV_USER_ROLES')), __param(1, core_1.Inject('EGOV_API_BASE_ROUTE')),
    __metadata("design:paramtypes", [Object, Object, http_1.Http])
], UserService);
exports.UserService = UserService;
;
//# sourceMappingURL=user.service.js.map