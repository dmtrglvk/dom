import './components/svg'
import objectFitImages from 'object-fit-images'
import paroller from 'paroller.js'
import heroSlider from './components/hero-slider'
import contentSlider from './components/content-slider'
import mobileMenu from './components/mobile-menu'
import fancybox from '@fancyapps/fancybox'
import portfolioTabs from './components/portfolio-tabs'

$(function(){

    var images = $('.image-object-fit');
    if(images.length) {
        objectFitImages(document.querySelectorAll('.image-object-fit'));
    }

    heroSlider.init();
    contentSlider.init();
    mobileMenu.init();
    portfolioTabs.init();

    if($('.parallax-image').length) {
      $('.parallax-image').paroller();
    }

    if($('[data-fancybox]').length) {
        $('[data-fancybox]').fancybox({
            infobar: false,
            buttons: [
                "close"
            ],
        });
    }

    if($('.js-callback-form').length) {
        let $input = $('.js-callback-form input:text');
        $input.on('blur', (e) => {
            if($(e.target).val().trim() !== '') {
                $(e.target).addClass('filled');
            } else {
                $(e.target).removeClass('filled');
            }
        })
    }

    if($('.js-popup').length) {
        $('.js-open-popup').on('click', (e) => {
            e.preventDefault();
            $('.js-popup').addClass('visible');
        });
        $('.js-go-to-next-stage').on('click', (e) => {
            e.preventDefault();
            $(e.target).parents('.popup-stage').removeClass('active-stage');
            $(e.target).parents('.popup-stage').next().addClass('active-stage');
        });
        $('.js-close-popup').on('click', (e) => {
            e.preventDefault();
            $(e.target).parents('.js-popup').removeClass('visible');
            $('.js-popup .popup-stage').removeClass('active-stage');
            $('.js-popup .popup-stage:first').addClass('active-stage');
        })
    }

});