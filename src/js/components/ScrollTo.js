import $ from 'jquery';

class ScrollToDonate {
    constructor() {
        this.$donateBtn = $('.js-donate-btn');
        this.$donateSection = $('.js-donate-section');
        this.init();
    }

    init() {
        this.$donateBtn.click(() => {
            $('html, body').animate({
                scrollTop: this.$donateSection.offset().top
            }, 1000);
        });
    }
}

new ScrollToDonate();
