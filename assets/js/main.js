
document.addEventListener('DOMContentLoaded', function() {

    var flagContainer = document.querySelector('[data-open-flag]');
    var flagList = document.querySelector('[data-list]');
    var useTel = document.querySelector('[data-use-tel]');
    var flags = document.querySelectorAll('[data-click="flag"]');
    var setFlag = document.querySelector('[data-set-flag]');
    var setFlagContainer = document.querySelector('[data-set-flag-container]');
    var anchorButtons = document.querySelectorAll('[data-go-button]');
    var form = document.querySelector('[data-send-form]');
    var burger = document.querySelector('[data-menu-open]');
    var header = document.querySelector('[data-header]');
    var i = 0;

    function poupAnimation(popupBlock, direction) {
        if (direction == 'start') {
            $(popupBlock + ' [data-anim-popup="0"]').removeClass('hide');
            $(popupBlock + ' [data-anim-popup="1"]').removeClass('hide');
            $(popupBlock + ' [data-anim-popup="2"]').removeClass('hide');
            $(popupBlock + ' [data-anim-popup="5"]').addClass('showBG');
        }
        else {
            $(popupBlock + ' [data-anim-popup="0"]').addClass('hide');
            $(popupBlock + ' [data-anim-popup="1"]').addClass('hide');
            $(popupBlock + ' [data-anim-popup="2"]').addClass('hide');
            $(popupBlock + ' [data-anim-popup="5"]').removeClass('showBG');
        }
    }

    function validation(type, value) {
        switch (type) {
            case 'text':
                return /([^\s*$])/.test(value);
                break;
            case 'email':
                return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
                break;
        }
    }

    flagContainer.addEventListener('mouseover', function() {
        flagList.classList.add('open');
        setFlagContainer.classList.add('hide');
    });

    flagContainer.addEventListener('mouseout', function() {
        setFlagContainer.classList.remove('hide');
        flagList.classList.remove('open');
    });

    for (i = 0; i < flags.length; i++) {
        flags[i].addEventListener('click', function() {
            useTel.value = '+' + this.getAttribute('data-prefix');
            var flagImage = this.querySelector('img');
            setFlag.setAttribute('src', flagImage.getAttribute('src'));
            setFlagContainer.classList.remove('hide');
            flagList.classList.remove('open');
        });
    }

    document.querySelector('[data-value="RU"]').click();

    for (i = 0; i < anchorButtons.length; i++) {
        anchorButtons[i].addEventListener('click', function() {
            var goTo = this.getAttribute('data-go-button');
            var goToPlace = document.querySelector('[data-go-place="' + goTo + '"]');
            goToPlace.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        header.classList.toggle('active');
    });

    $('[data-show-block]').click(function(e) {
        e.preventDefault();
        var block = $(this).attr('data-show-block');
        $('[data-popup]').addClass('show');
        $('[data-popups="block"]').addClass('show');
        setTimeout( function() {
            $('[data-popup]').addClass('dark');
            $('[data-block="'+ block + '"]').addClass('show');
        }, 10);
        setTimeout( function() {
            $('[data-block="'+ block + '"]').addClass('open');
            poupAnimation('[data-block="'+ block + '"]', 'start');
        }, 500);
        $('body').addClass('popup');
    });

    $('[data-close-block]').click(function(e) {
        e.preventDefault();
        var block = $(this).attr('data-close-block');
        poupAnimation('[data-block="'+ block + '"]', 'end');
        setTimeout( function() {
            $('[data-block="'+ block + '"]').removeClass('open');
            $('[data-block]').removeClass('show');
        }, 1000);
        setTimeout(function() {
            $('[data-popup]').removeClass('dark');
        }, 1500);
        setTimeout(function() {
            $('[data-popup]').removeClass('show');
            $('[data-popups="block"]').removeClass('show');
        }, 2000);
        $('body').removeClass('popup');
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var formOk = true;
        var inputs = this.querySelectorAll('[data-validate]');
        var name = '';
        var email = '';
        var phone = '';
        var text = '';

        for (i = 0; i < inputs.length; i++) {
            inputs[i].parentNode.classList.remove('error');
        }

        for (i = 0; i < inputs.length; i++) {
            var type = inputs[i].getAttribute('data-validate');
            var value = inputs[i].value;
            if (!validation(type, value)) {
                formOk = false;
                inputs[i].parentNode.classList.add('error');
            }
            switch (inputs[i].getAttribute('name')) {
                case 'wb_input_0':
                    name = inputs[i].value;
                    break;
                case 'wb_input_1':
                    email = inputs[i].value;
                    break;
                case 'wb_input_2':
                    phone = inputs[i].value;
                    break;
                case 'wb_input_3':
                    text = inputs[i].value;
                    break;
            }
        }
        if (formOk) {
            var http = new XMLHttpRequest();
            var url = "/";
            var params = new FormData(form);
            http.open("POST", url, true);
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            http.onreadystatechange = function() {
                if(http.readyState == 4 && http.status == 200) {
                    alert('Сообщение отправлено');
                    for (i = 0; i < inputs.length; i++) {
                        inputs[i].value = null;
                    }
                    return true;
                }
            };
            http.send(JSON.stringify(params));
            carrotquest.track('registered', {
                '$name': name,
                '$email': email,
                '$phone': phone,
                'text': text
            });

        }

        return false;
    })

});



(function(w, d, undefined) {
    'use strict';

    /*
     * aliases
     * w: window global object
     * d: document
     * undefined: undefined
     */

    // polyfill
    function polyfill() {
        // return when scrollBehavior interface is supported
        if ('scrollBehavior' in d.documentElement.style) {
            return;
        }

        var positionFix = -50;

        /*
         * globals
         */
        var Element = w.HTMLElement || w.Element;
        var SCROLL_TIME = 468;

        /*
         * object gathering original scroll methods
         */
        var original = {
            scroll: w.scroll || w.scrollTo,
            scrollBy: w.scrollBy,
            elScroll: Element.prototype.scroll || scrollElement,
            scrollIntoView: Element.prototype.scrollIntoView
        };

        /*
         * define timing method
         */
        var now = w.performance && w.performance.now
            ? w.performance.now.bind(w.performance) : Date.now;

        /**
         * changes scroll position inside an element
         * @method scrollElement
         * @param {Number} x
         * @param {Number} y
         */
        function scrollElement(x, y) {
            this.scrollLeft = x;
            this.scrollTop = y;
        }

        /**
         * returns result of applying ease math function to a number
         * @method ease
         * @param {Number} k
         * @returns {Number}
         */
        function ease(k) {
            return 0.5 * (1 - Math.cos(Math.PI * k));
        }

        /**
         * indicates if a smooth behavior should be applied
         * @method shouldBailOut
         * @param {Number|Object} x
         * @returns {Boolean}
         */
        function shouldBailOut(x) {
            if (typeof x !== 'object'
                || x === null
                || x.behavior === undefined
                || x.behavior === 'auto'
                || x.behavior === 'instant') {
                // first arg not an object/null
                // or behavior is auto, instant or undefined
                return true;
            }

            if (typeof x === 'object'
                && x.behavior === 'smooth') {
                // first argument is an object and behavior is smooth
                return false;
            }

            // throw error when behavior is not supported
            throw new TypeError('behavior not valid');
        }

        /**
         * finds scrollable parent of an element
         * @method findScrollableParent
         * @param {Node} el
         * @returns {Node} el
         */
        function findScrollableParent(el) {
            var isBody;
            var hasScrollableSpace;
            var hasVisibleOverflow;

            do {
                el = el.parentNode;

                // set condition variables
                isBody = el === d.body;
                hasScrollableSpace =
                    el.clientHeight < el.scrollHeight ||
                    el.clientWidth < el.scrollWidth;
                hasVisibleOverflow =
                    w.getComputedStyle(el, null).overflow === 'visible';
            } while (!isBody && !(hasScrollableSpace && !hasVisibleOverflow));

            isBody = hasScrollableSpace = hasVisibleOverflow = null;

            return el;
        }

        /**
         * self invoked function that, given a context, steps through scrolling
         * @method step
         * @param {Object} context
         */
        function step(context) {
            var time = now();
            var value;
            var currentX;
            var currentY;
            var elapsed = (time - context.startTime) / SCROLL_TIME;

            // avoid elapsed times higher than one
            elapsed = elapsed > 1 ? 1 : elapsed;

            // apply easing to elapsed time
            value = ease(elapsed);

            currentX = context.startX + (context.x - context.startX) * value;
            currentY = context.startY + (context.y - context.startY) * value;

            context.method.call(context.scrollable, currentX, currentY);

            // scroll more if we have not reached our destination
            if (currentX !== context.x || currentY !== context.y) {
                w.requestAnimationFrame(step.bind(w, context));
            }
        }

        /**
         * scrolls window with a smooth behavior
         * @method smoothScroll
         * @param {Object|Node} el
         * @param {Number} x
         * @param {Number} y
         */
        function smoothScroll(el, x, y) {
            var scrollable;
            var startX;
            var startY;
            var method;
            var startTime = now();

            // define scroll context
            if (el === d.body) {
                scrollable = w;
                startX = w.scrollX || w.pageXOffset;
                startY = w.scrollY || w.pageYOffset;
                method = original.scroll;
            } else {
                scrollable = el;
                startX = el.scrollLeft;
                startY = el.scrollTop;
                method = scrollElement;
            }

            // scroll looping over a frame
            step({
                scrollable: scrollable,
                method: method,
                startTime: startTime,
                startX: startX,
                startY: startY,
                x: x,
                y: y
            });
        }

        /*
         * ORIGINAL METHODS OVERRIDES
         */

        // w.scroll and w.scrollTo
        w.scroll = w.scrollTo = function() {
            // avoid smooth behavior if not required
            if (shouldBailOut(arguments[0])) {
                original.scroll.call(
                    w,
                    arguments[0].left || arguments[0],
                    arguments[0].top || arguments[1]
                );
                return;
            }

            // LET THE SMOOTHNESS BEGIN!
            smoothScroll.call(
                w,
                d.body,
                ~~arguments[0].left,
                ~~arguments[0].top
            );
        };

        // w.scrollBy
        w.scrollBy = function() {
            // avoid smooth behavior if not required
            if (shouldBailOut(arguments[0])) {
                original.scrollBy.call(
                    w,
                    arguments[0].left || arguments[0],
                    arguments[0].top || arguments[1]
                );
                return;
            }

            // LET THE SMOOTHNESS BEGIN!
            smoothScroll.call(
                w,
                d.body,
                ~~arguments[0].left + (w.scrollX || w.pageXOffset),
                ~~arguments[0].top + (w.scrollY || w.pageYOffset)
            );
        };

        // Element.prototype.scroll and Element.prototype.scrollTo
        Element.prototype.scroll = Element.prototype.scrollTo = function() {
            // avoid smooth behavior if not required
            if (shouldBailOut(arguments[0])) {
                original.elScroll.call(
                    this,
                    arguments[0].left || arguments[0],
                    arguments[0].top || arguments[1]
                );
                return;
            }

            var left = arguments[0].left;
            var top = arguments[0].top;

            // LET THE SMOOTHNESS BEGIN!
            smoothScroll.call(
                this,
                this,
                typeof left === 'number' ? left : this.scrollLeft,
                typeof top === 'number' ? top : this.scrollTop
            );
        };

        // Element.prototype.scrollBy
        Element.prototype.scrollBy = function() {
            var arg0 = arguments[0];

            if (typeof arg0 === 'object') {
                this.scroll({
                    left: arg0.left + this.scrollLeft,
                    top: arg0.top + this.scrollTop,
                    behavior: arg0.behavior
                });
            } else {
                this.scroll(
                    this.scrollLeft + arg0,
                    this.scrollTop + arguments[1]
                );
            }
        };

        // Element.prototype.scrollIntoView
        Element.prototype.scrollIntoView = function() {
            // avoid smooth behavior if not required
            if (shouldBailOut(arguments[0])) {
                original.scrollIntoView.call(
                    this,
                    arguments[0] === undefined ? true : arguments[0]
                );
                return;
            }

            // LET THE SMOOTHNESS BEGIN!
            var scrollableParent = findScrollableParent(this);
            var parentRects = scrollableParent.getBoundingClientRect();
            var clientRects = this.getBoundingClientRect();

            if (scrollableParent !== d.body) {
                // reveal element inside parent
                smoothScroll.call(
                    this,
                    scrollableParent,
                    scrollableParent.scrollLeft + clientRects.left - parentRects.left,
                    scrollableParent.scrollTop + clientRects.top - parentRects.top + positionFix
                );
                // reveal parent in viewport
                w.scrollBy({
                    left: parentRects.left,
                    top: parentRects.top + positionFix,
                    behavior: 'smooth'
                });
            } else {
                // reveal element in viewport
                w.scrollBy({
                    left: clientRects.left,
                    top: clientRects.top + positionFix,
                    behavior: 'smooth'
                });
            }
        };
    }

    if (typeof exports === 'object') {
        // commonjs
        module.exports = { polyfill: polyfill };
    } else {
        // global
        polyfill();
    }
})(window, document);