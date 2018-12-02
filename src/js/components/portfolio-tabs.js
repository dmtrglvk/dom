let portfolioTabs = () => {

    let module = {},
        $currentTab,
        $tabLink,
        $tabContent,

        changeTabContent = (e) => {
            let activeBlock = $(e.target).data('tabBlock');

            $tabContent.removeClass('selected');
            $tabLink.removeClass('selected');
            $(e.target).parents('ul').removeClass('active');

            $(`[data-tab=${activeBlock}]`).addClass('selected');
            $(e.target).addClass('selected');
            $currentTab.text($(e.target).text().trim());
            $currentTab.removeClass('opened');
        },

        attachEvents = () => {

            $tabLink.on('click', (e) => {
                e.preventDefault();
                changeTabContent(e);
            });
            $currentTab.on('click', (e) => {
                let $opener = $(e.currentTarget);
                if($opener.hasClass('opened')) {
                    $opener.removeClass('opened');
                    $opener.next().removeClass('active');
                } else {
                    $opener.addClass('opened');
                    $opener.next().addClass('active');
                }
            })

        },

        init = () => {

            $currentTab = $('.js-selected-tab-item');
            $tabLink = $('.js-tab-link');
            $tabContent = $('.js-tab-content');

            attachEvents();

        };

    module.init = init;

    return module;

}

export default portfolioTabs();