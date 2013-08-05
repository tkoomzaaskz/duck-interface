define(['marionette', 'tools/logger', 'bootstrap', 'view/root'],
function(Marionette, logger, bootstrap, RootView) {

    'use strict';

    var Application = new Marionette.Application();

    Application.addRegions({
      bodyRegion: "body"
    });

    Application.addInitializer(function(options) {
        Backbone.Model.prototype.trigger = function() {
            logger.event(arguments);
            Backbone.Events.trigger.apply(this, arguments);
        }
    });

    Application.addInitializer(function(options) {
        logger.log('APPLICATION', 'start');
        var rootView = new RootView();
        rootView.setElement('body').render();
//        Application.bodyRegion.show(new RootView());
    });

    return Application;
});
