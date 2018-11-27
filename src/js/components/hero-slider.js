import bxSlider from 'bxslider/dist/jquery.bxslider.min'

let heroSlider = () => {

  let module = {},
      $slider,

      init = () => {
        $slider = $('.js-hero-slider')

        $slider.bxSlider({
          mode: 'fade',
          controls: false
        })

      };

      module.init = init;

  return module;

}

export default heroSlider();