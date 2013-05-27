define(['logger', 'bootstrap', 'icanhaz', 'view/root'],
function(logger, bootstrap, ich, RootView) {

    'use strict';

    return {
        start: function() {
            logger.log('APP:', 'start');
            var rootView = new RootView();
            rootView.setElement('#main');
            rootView.render();

            $.ajax({
                type: 'GET',
                dataType: 'text',
                async: false,
                url: 'templates.ich'
            }).done(function(response) {
                $('body').append(response);
                ich.grabTemplates();
            });
        }
    };
});
