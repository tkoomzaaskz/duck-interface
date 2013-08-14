define(['jquery', 'backbone', 'marionette', 'bootstrap', 'tools/logger',
        'view/root', 'duck/template_engine', 'duck/template_manager'],
function($, Backbone, Marionette, bootstrap, logger,
        RootView, TemplateEngine, TemplateManager) {

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
      $.validator.addMethod("money", function(value, element) {
        return this.optional(element) || /^(\d{1,6})(\.\d{1,2})?$/.test(value);
      }, "Must be proper currency format: dddddd.dd");
    });

    Application.addInitializer(function(options) {
        $(document).ready( function() {
            TemplateEngine.fetchAllTemplates();
            TemplateManager.initAllTemplates();
        });
    });

    Application.addInitializer(function(options) {
        logger.log('APPLICATION', 'start');
        var rootView = new RootView();
//        rootView.setElement('body').render();
//        Application.bodyRegion.show(new RootView());
    });

    return Application;
});
