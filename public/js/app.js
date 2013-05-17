define(['underscore', 'backbone', 'view/root'],
function(_, Backbone, RootView) {

    'use strict';

    return {
        start: function() {
            console.log('APP', 'start');
            var rootView = new RootView();
            rootView.setElement('body');
            rootView.render();
        }
    };
});
