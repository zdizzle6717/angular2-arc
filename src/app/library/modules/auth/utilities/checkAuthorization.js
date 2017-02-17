"use strict";
var checkAuthorization = function (accessControl, user, roleConfig) {
    var userFlags = user.roleFlags || '0';
    var accessFlags = '0';
    accessControl.forEach(function (roleName) {
        roleConfig.forEach(function (config) {
            if (config.name === roleName) {
                accessFlags += config.roleFlags;
            }
        });
    });
    var hasFlags = function (flags, mask) {
        flags = parseInt(flags, 10);
        mask = parseInt(mask, 10);
        return (mask & flags) === mask;
    };
    var accessGranted = hasFlags(userFlags, accessFlags) && +userFlags !== 0;
    return accessGranted;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkAuthorization;
//# sourceMappingURL=checkAuthorization.js.map