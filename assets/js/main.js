
document.addEventListener('DOMContentLoaded', function() {

    var anchorButtons = document.querySelectorAll('[data-go-button]');
    var form = document.querySelector('[data-send-form]');
    var burger = document.querySelector('[data-menu-open]');
    var header = document.querySelector('[data-header]');
    var i = 0;

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

    var $select = $('[data-b-select]');

    $('[data-b-type]').each(function() {
        var $this = $(this);
        var flag = $this.find('img').attr('src');
        var title = $this.find('[data-b-title]').text();
        var $span = $('<span>').attr('style', 'background-image:url("/'+flag+'")');

        var $div = $('<div class="top-b2__form-select-item">');
        $div.attr('data-b-select-item', title).append($span).append('<span>' + title + '</span>');

        $select.prepend($div);
    });

    $('[data-drop-down]').click(function() {
        $('[data-b-form-block]').toggleClass('hidden');
    });

    var someTitles = document.querySelectorAll('[data-b-select]');
    var banan = document.querySelector('[data-b-form-block]');

    for (var i = 0; i < someTitles.length; i++) {
        someTitles[i].addEventListener('mouseover', function() {
            $select.addClass('opened');
        });

        someTitles[i].addEventListener('mouseout', function() {
            $select.removeClass('opened');
        });
    }


    $('[data-b-select]').on('click', '[data-b-select-item]', function() {
        var $this = $(this);
        $('[data-b-value]').val($this.attr('data-b-select-item'));
        $select.prepend($this);
        $select.scrollTop(0)
    });
    $('[data-b-select-item]').trigger('click');

    $('[data-b-form]').each(function() {
        var $this = $(this);
        $this.submit(function(e) {
            e.preventDefault();
                    var http = new XMLHttpRequest();
                    var url = "/";
                    var params = new FormData($this[0]);
                    http.open("POST", url, true);
                    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    http.onreadystatechange = function() {
                        if(http.readyState == 4 && http.status == 200) {
                            return true;
                        }
                    };
                    http.send(JSON.stringify(params));
            carrotquest.track('registered', {
                '$name': $this.find('[name="name"]'),
                '$email': $this.find('[name="email"]'),
                'text': $this.find('[name="b-type"]')
            });
            alert('Сообщение отправлено');
        });
    });

    $.fn.scrollEnd = function(callback, timeout) {
        $(this).scroll(function(){
            var $this = $(this);
            if ($this.data('scrollTimeout')) {
                clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback,timeout));
        });
    };

    $(window).scroll(function(){
        if ($(window).width() > 719) {
            animationScroll();
        }
    });

    function animationScroll() {
        var $mainForm = $('[data-b-form-block="mobile"]');
        var $mainFormMain = $('[data-b-form-block="main"]');
        var offsetPos = parseInt($('[data-form-transform]').offset().top);
        var winPos = $(window).scrollTop();
        $mainForm.addClass('not-mobile');

        if (winPos < offsetPos) {
            $mainForm.removeClass('drop-down');
            $mainFormMain.removeClass('invisible');
        }
        if (winPos > offsetPos) {
            $mainForm.addClass('drop-down');
            $mainFormMain.addClass('invisible');
        }
    }
    //
    // form.addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     var formOk = true;
    //     var inputs = this.querySelectorAll('[data-validate]');
    //     var name = '';
    //     var email = '';
    //     var phone = '';
    //     var text = '';
    //
    //     for (i = 0; i < inputs.length; i++) {
    //         inputs[i].parentNode.classList.remove('error');
    //     }
    //
    //     for (i = 0; i < inputs.length; i++) {
    //         var type = inputs[i].getAttribute('data-validate');
    //         var value = inputs[i].value;
    //         if (!validation(type, value)) {
    //             formOk = false;
    //             inputs[i].parentNode.classList.add('error');
    //         }
    //         switch (inputs[i].getAttribute('name')) {
    //             case 'wb_input_0':
    //                 name = inputs[i].value;
    //                 break;
    //             case 'wb_input_1':
    //                 email = inputs[i].value;
    //                 break;
    //             case 'wb_input_2':
    //                 phone = inputs[i].value;
    //                 break;
    //             case 'wb_input_3':
    //                 text = inputs[i].value;
    //                 break;
    //         }
    //     }
    //     if (formOk) {
    //         var http = new XMLHttpRequest();
    //         var url = "/";
    //         var params = new FormData(form);
    //         http.open("POST", url, true);
    //         http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //         http.onreadystatechange = function() {
    //             if(http.readyState == 4 && http.status == 200) {
    //                 alert('Сообщение отправлено');
    //                 for (i = 0; i < inputs.length; i++) {
    //                     inputs[i].value = null;
    //                 }
    //                 return true;
    //             }
    //         };
    //         http.send(JSON.stringify(params));
    //         carrotquest.track('registered', {
    //             '$name': name,
    //             '$email': email,
    //             '$phone': phone,
    //             'text': text
    //         });
    //
    //     }
    //
    //     return false;
    // })

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