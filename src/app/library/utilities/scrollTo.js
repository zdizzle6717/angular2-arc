// NOTE: Scrolls to the designated number of pixels from top of window over the duration specified
"use strict";
var scrollTo = function (to, duration) {
    if (to === void 0) { to = 0; }
    if (duration === void 0) { duration = 250; }
    var start = window.pageYOffset || document.documentElement.scrollTop, change = to - start, currentTime = 0, increment = 20;
    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    Math['easeInOutQuad'] = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1)
            return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };
    var animateScroll = function () {
        currentTime += increment;
        var val = Math['easeInOutQuad'](currentTime, start, change, duration);
        document.body.scrollTop = val;
        document.documentElement.scrollTop = val;
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = scrollTo;
//# sourceMappingURL=scrollTo.js.map