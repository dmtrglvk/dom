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

});