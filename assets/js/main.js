
document.addEventListener('DOMContentLoaded', function() {

    var flagContainer = document.querySelector('[data-open-flag]');
    var flagList = document.querySelector('[data-list]');
    var useTel = document.querySelector('[data-use-tel]');
    var flags = document.querySelectorAll('[data-click="flag"]');
    var setFlag = document.querySelector('[data-set-flag]');
    var setFlagContainer = document.querySelector('[data-set-flag-container]');


    setFlagContainer.addEventListener('click', function() {
        flagList.classList.add('open');
        setFlagContainer.classList.add('hide');
    });

    for (var i = 0; i < flags.length; i++) {
        flags[i].addEventListener('click', function() {
            useTel.value = '+' + this.getAttribute('data-prefix');
            var flagImge = this.querySelector('img');
            setFlag.setAttribute('src', flagImge.getAttribute('src'));
            setFlagContainer.classList.remove('hide');
            flagList.classList.remove('open');
        });
    }

    document.querySelector('[data-value="RU"]').click();


});

