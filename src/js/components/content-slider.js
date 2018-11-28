import bxSlider from 'bxslider/dist/jquery.bxslider.min'

let contentSlider = () => {

  let module = {},
      $slider,
      $totalSlides,
      $currentSlide,

      init = () => {
        $slider = $('.js-content-slider')
        $totalSlides = $('.js-total-slides')
        $currentSlide = $('.js-current-slide')

        $slider.bxSlider({
          mode: 'fade',
          pager: false,
          onSliderLoad: (currentSlide) => {
            let totalSlides = $slider.find('>div').length;
            $totalSlides.text(totalSlides);
            $currentSlide.text(`${currentSlide + 1}`)
          },
          onSlideAfter: ($slideElement, oldIndex, newIndex) => {
            $currentSlide.text(`${newIndex + 1}`)
          }
        })

      };

      module.init = init;

  return module;

}

export default contentSlider();