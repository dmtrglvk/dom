import './components/svg'
import objectFitImages from 'object-fit-images'
import paroller from 'paroller.js'
import heroSlider from './components/hero-slider'

$(function(){

    var images = $('.image-object-fit');
    if(images.length) {
        objectFitImages(document.querySelectorAll('.image-object-fit'));
    }

    heroSlider.init();
});