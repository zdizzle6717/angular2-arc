'use strict';
var Alert = (function () {
    function Alert(id, delay, message, show, title, type) {
        if (delay === void 0) { delay = 3000; }
        this.id = id;
        this.delay = delay;
        this.message = message;
        this.show = show;
        this.title = title;
        this.type = type;
    }
    return Alert;
}());
exports.Alert = Alert;
//# sourceMappingURL=alert.js.map