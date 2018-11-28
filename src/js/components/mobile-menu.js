let mobileMenu = () => {

  let module = {},
      $body,
      $opener,
      activeClass = 'menu-opened',

      openMenu = () => {
        if($body.hasClass(activeClass)) {
          $body.removeClass(activeClass)
        } else {
          $body.addClass(activeClass)
        }
      },

      attachEvents = () => {
        $opener.on('click', (e) => {
          e.preventDefault();
          openMenu();
        })
      },

      init = () => {

        $body = $('body')
        $opener = $('.js-menu-opener')

        attachEvents();

      };

  module.init = init;

  return module;

}

export default mobileMenu();