'use strict';
var User = (function () {
    function User(id, email, username, password, roleFlags, id_token, isAuthenticated) {
        if (isAuthenticated === void 0) { isAuthenticated = false; }
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.roleFlags = roleFlags;
        this.id_token = id_token;
        this.isAuthenticated = isAuthenticated;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map