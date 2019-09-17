var SCROLL_TIMEOUT_DEFAULT = 300;
var SCROLL_TIME_DEFAULT = 2;
var NOOP = function () { };
function easeInCubic(t, b, c, d) {
    return c * (t = t / d) * t * t + b;
}
function position(start, end, elapsed, duration) {
    if (elapsed > duration) {
        return end;
    }
    return easeInCubic(elapsed, start, end - start, duration);
}
var ScrollSnap = /** @class */ (function () {
    function ScrollSnap(element, config) {
        var _this = this;
        this.animating = false;
        this.lastScrollValue = {
            x: 0,
            y: 0,
        };
        this.startAnimation = function () {
            _this.speedDeltaX = _this.checkScrollSpeed(_this.target.scrollLeft, 'x');
            _this.speedDeltaY = _this.checkScrollSpeed(_this.target.scrollTop, 'y');
            if (_this.animating || (_this.speedDeltaX === 0 && _this.speedDeltaY === 0)) {
                return;
            }
            _this.handler(_this.target);
        };
        this.animationHandler = function () {
            // if we don't move a thing, we can ignore the timeout: if we did, there'd be another timeout added for this.scrollStart+1.
            if (_this.scrollStart.y === _this.target.scrollTop &&
                _this.scrollStart.x === _this.target.scrollLeft) {
                // ignore timeout
                return;
            }
            // detect direction of scroll. negative is up, positive is down.
            var direction = {
                y: _this.speedDeltaY > 0 ? 1 : -1,
                x: _this.speedDeltaX > 0 ? 1 : -1,
            };
            // get the next snap-point to snap-to
            var snapPoint = _this.getNextSnapPoint(_this.target, direction);
            _this.target.removeEventListener('scroll', _this.startAnimation, false);
            _this.animating = true;
            // smoothly move to the snap point
            _this.smoothScroll(_this.target, snapPoint, function () {
                // after moving to the snap point, rebind the scroll event handler
                _this.animating = false;
                _this.target.addEventListener('scroll', _this.startAnimation, false);
                _this.onAnimationEnd();
            });
            // we just jumped to the snapPoint, so this will be our next this.scrollStart
            if (!isNaN(snapPoint.x) || !isNaN(snapPoint.y)) {
                _this.scrollStart = snapPoint;
            }
        };
        this.element = element;
        this.config = config;
        if (config.scrollTimeout &&
            (isNaN(config.scrollTimeout) || typeof config.scrollTimeout === 'boolean')) {
            throw new Error("Optional config property 'scrollTimeout' is not valid, expected NUMBER but found " + (typeof config.scrollTimeout).toUpperCase());
        }
        this.SCROLL_TIMEOUT = config.scrollTimeout || SCROLL_TIMEOUT_DEFAULT;
        if (config.scrollTime && (isNaN(config.scrollTime) || typeof config.scrollTime === 'boolean')) {
            throw new Error("Optional config property 'scrollTime' is not valid, expected NUMBER but found " + (typeof config.scrollTime).toUpperCase());
        }
        this.SCROLL_TIME = config.scrollTime || SCROLL_TIME_DEFAULT;
        if (!config.scrollSnapDestination) {
            throw new Error('Required config property scrollSnapDestination is not defined');
        }
        this.SCROLL_SNAP_DESTINATION = config.scrollSnapDestination;
    }
    ScrollSnap.prototype.checkScrollSpeed = function (value, axis) {
        var _this = this;
        var clear = function () {
            _this.lastScrollValue[axis] = null;
        };
        var newValue = value;
        var delta;
        if (this.lastScrollValue[axis] !== null) {
            delta = newValue - this.lastScrollValue[axis];
        }
        else {
            delta = 0;
        }
        this.lastScrollValue[axis] = newValue;
        this.scrollSpeedTimer && clearTimeout(this.scrollSpeedTimer);
        this.scrollSpeedTimer = setTimeout(clear, 50);
        return delta;
    };
    ScrollSnap.prototype.saveDeclaration = function (obj) {
        this.snapLengthUnit = this.parseSnapCoordValue(this.SCROLL_SNAP_DESTINATION);
    };
    ScrollSnap.prototype.bindElement = function (element) {
        this.target = element;
        /**
         * set webkit-overflow-scrolling to auto.
         * this prevents momentum scrolling on ios devices
         * causing flickering behaviours and delayed transitions.
         */
        this.target.style.overflow = 'auto';
        // @ts-ignore
        this.target.style.webkitOverflowScrolling = 'auto';
        this.target.addEventListener('scroll', this.startAnimation, false);
        this.saveDeclaration(this.target);
    };
    ScrollSnap.prototype.unbindElement = function (element) {
        // @ts-ignore
        element.style.webkitOverflowScrolling = null;
        element.removeEventListener('scroll', this.startAnimation, false);
    };
    /**
     * scroll handler
     * this is the callback for scroll events.
     */
    ScrollSnap.prototype.handler = function (target) {
        // if currently this.animating, stop it. this prevents flickering.
        if (this.animationFrame) {
            clearTimeout(this.animationFrame);
        }
        // if a previous timeout exists, clear it.
        if (this.scrollHandlerTimer) {
            // we only want to call a timeout once after scrolling..
            clearTimeout(this.scrollHandlerTimer);
        }
        else {
            this.scrollStart = {
                y: target.scrollTop,
                x: target.scrollLeft,
            };
        }
        this.scrollHandlerTimer = setTimeout(this.animationHandler, this.SCROLL_TIMEOUT);
    };
    ScrollSnap.prototype.getNextSnapPoint = function (target, direction) {
        // get snap length
        var snapLength = {
            y: this.roundByDirection(direction.y, this.getYSnapLength(this.target, this.snapLengthUnit.y)),
            x: this.roundByDirection(direction.x, this.getXSnapLength(this.target, this.snapLengthUnit.x)),
        };
        var top = this.target.scrollTop;
        var left = this.target.scrollLeft;
        // calc current and initial snappoint
        var currentPoint = {
            y: top / snapLength.y || 1,
            x: left / snapLength.x || 1,
        };
        var nextPoint = {
            y: 0,
            x: 0,
        };
        // set target and bounds by direction
        nextPoint.y = this.roundByDirection(direction.y, currentPoint.y);
        nextPoint.x = this.roundByDirection(direction.x, currentPoint.x);
        // calculate where to scroll
        var scrollTo = {
            y: nextPoint.y * snapLength.y,
            x: nextPoint.x * snapLength.x,
        };
        // stay in bounds (minimum: 0, maxmimum: absolute height)
        scrollTo.y = this.stayInBounds(0, target.scrollHeight, scrollTo.y);
        scrollTo.x = this.stayInBounds(0, target.scrollWidth, scrollTo.x);
        return scrollTo;
    };
    ScrollSnap.prototype.roundByDirection = function (direction, currentPoint) {
        if (direction === -1) {
            // when we go up, we floor the number to jump to the next snap-point in scroll direction
            return Math.floor(currentPoint);
        }
        // go down, we ceil the number to jump to the next in view.
        return Math.ceil(currentPoint);
    };
    ScrollSnap.prototype.stayInBounds = function (min, max, destined) {
        return Math.max(Math.min(destined, max), min);
    };
    ScrollSnap.prototype.parseSnapCoordValue = function (declaration) {
        // regex to parse lengths
        var regex = /(\d+)(px|%|vw) (\d+)(px|%|vh)/g;
        // defaults
        var parsed = {
            y: {
                value: 0,
                unit: 'px',
            },
            x: {
                value: 0,
                unit: 'px',
            },
        };
        var parsable;
        var result;
        // parse value and unit
        if (parsable !== null) {
            result = regex.exec(declaration);
            // if regexp fails, value is null
            if (result !== null) {
                parsed.x = {
                    value: Number(result[1]),
                    unit: result[2],
                };
                parsed.y = {
                    value: Number(result[3]),
                    unit: result[4],
                };
            }
        }
        return parsed;
    };
    ScrollSnap.prototype.getYSnapLength = function (obj, declaration) {
        if (declaration.unit === 'vh') {
            // when using vh, one snap is the length of vh / 100 * value
            return ((Math.max(document.documentElement.clientHeight, window.innerHeight || 1) / 100) *
                declaration.value);
        }
        else if (declaration.unit === '%') {
            // when using %, one snap is the length of element height / 100 * value
            return (obj.offsetHeight / 100) * declaration.value;
        }
        else {
            // when using px, one snap is the length of element height / value
            return obj.offsetHeight / declaration.value;
        }
    };
    ScrollSnap.prototype.getXSnapLength = function (obj, declaration) {
        if (declaration.unit === 'vw') {
            // when using vw, one snap is the length of vw / 100 * value
            return ((Math.max(document.documentElement.clientWidth, window.innerWidth || 1) / 100) *
                declaration.value);
        }
        else if (declaration.unit === '%') {
            // when using %, one snap is the length of element width / 100 * value
            return (obj.offsetWidth / 100) * declaration.value;
        }
        else {
            // when using px, one snap is the length of element width / value
            return obj.offsetWidth / declaration.value;
        }
    };
    ScrollSnap.prototype.isEdge = function (start) {
        return (start.x === 0 && this.speedDeltaY === 0) || (start.y === 0 && this.speedDeltaX === 0);
    };
    ScrollSnap.prototype.smoothScroll = function (obj, end, callback) {
        var start = {
            y: obj.scrollTop,
            x: obj.scrollLeft,
        };
        // get animation frame or a fallback
        var requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (fn) {
                return window.setTimeout(fn, 15);
            };
        var duration = this.isEdge(start) ? 0 : this.SCROLL_TIME;
        var startTime;
        // setup the stepping function
        function step(timestamp) {
            if (!startTime) {
                startTime = timestamp;
            }
            var elapsed = timestamp - startTime;
            // change position on y-axis if result is a number.
            if (!isNaN(end.y)) {
                obj.scrollTop = position(start.y, end.y, elapsed, duration);
            }
            // change position on x-axis if result is a number.
            if (!isNaN(end.x)) {
                obj.scrollLeft = position(start.x, end.x, elapsed, duration);
            }
            // check if we are over due;
            if (elapsed < duration) {
                requestAnimationFrame(step);
            }
            else {
                // is there a callback?
                if (typeof callback === 'function') {
                    // stop execution and run the callback
                    return callback(end);
                }
            }
        }
        this.animationFrame = requestAnimationFrame(step);
    };
    ScrollSnap.prototype.bind = function (callback) {
        this.onAnimationEnd = typeof callback === 'function' ? callback : NOOP;
        this.bindElement(this.element);
    };
    ScrollSnap.prototype.unbind = function () {
        this.unbindElement(this.element);
    };
    return ScrollSnap;
}());
export default ScrollSnap;
