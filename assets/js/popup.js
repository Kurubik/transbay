
document.addEventListener('DOMContentLoaded', function() {

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
});

