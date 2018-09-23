import $ from 'jquery';
import 'slick-carousel';

class AboutSlider {
    constructor() {
        this.sliderContainer = document.querySelector('.js-about-slider-container');
        this.init();
    }

    init() {
        if(!this.sliderContainer) return;

        this.$sliderContainer = $(this.sliderContainer);
        this.$slider = this.$sliderContainer.find('.js-about-slider');
        this.$arrows = this.$sliderContainer.find('.js-about-slider-arrows');
        this.$dots = this.$sliderContainer.find('.js-about-slider-dots');

        this.options = {
            adaptiveHeight: false,
            dots: true,
            appendDots: this.$dots,
            appendArrows: this.$arrows,
            prevArrow: this.getArrow('prev'),
            nextArrow: this.getArrow('next'),
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        dots: false
                    }
                }
            ]
        };

        this.$slider.slick(this.options);
    }

    getArrow(val) {
        return `<button type="button" class="slick-slider-arrow _${val} js-about-slider-${val}">${val}</button>`;
    }
}

new AboutSlider();