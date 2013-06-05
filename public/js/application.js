define(['tools/logger', 'bootstrap', 'icanhaz', 'view/root'],
function(logger, bootstrap, ich, RootView) {

    'use strict';

    return {
        start: function() {
            logger.log('APPLICATION', 'start');
            var rootView = new RootView();
            rootView.setElement('#main');
            rootView.render();

            Backbone.Model.prototype.trigger = function() {
                logger.event(arguments);
                Backbone.Events.trigger.apply(this, arguments);
            }

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
