define(['marionette', 'tools/logger', 'bootstrap', 'icanhaz', 'view/root'],
function(Marionette, logger, bootstrap, ich, RootView) {

    'use strict';

    var Application = new Marionette.Application();

    Application.addRegions({
      mainRegion: "#main"
    });
    
    Application.addInitializer(function(options) {
        Backbone.Model.prototype.trigger = function() {
            logger.event(arguments);
            Backbone.Events.trigger.apply(this, arguments);
        }
    });

    Application.addInitializer(function(options) {
        logger.log('APPLICATION', 'start');
        Application.mainRegion.show(new RootView());
    });

    return Application;
});
