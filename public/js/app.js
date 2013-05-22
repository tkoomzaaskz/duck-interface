define(['logger', 'view/root'],
function(logger, RootView) {

    'use strict';

    return {
        start: function() {
            logger.log('APP:', 'start');
            var rootView = new RootView();
            rootView.setElement('#main');
            rootView.render();
        }
    };
});
