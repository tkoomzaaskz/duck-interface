define(['jquery', 'backbone', 'marionette', 'config', 'tools/logger', 'tools/fake',
    'duck/user_control', 'duck/category_control',
    'view/root', 'view/hidden', 'view/dialog/user', 'view/dialog/category', 'view/dialog/form',
    'jqueryValidate', 'jstree'],
function($, Backbone, Marionette, config, logger, fake,
    UserControl, CategoryControl,
    RootView, HiddenView, UserView, CategoryView, FormView) {

    'use strict';

    var application = new Marionette.Application();

    application.addRegions({
        bodyRegion: "body"
    });

    if (config.logged_events.length) {
        // overriding backbone's model trigger function to log events
        application.addInitializer(function(options) {
            Backbone.Model.prototype.trigger = function() {
                logger.event(arguments);
                Backbone.Events.trigger.apply(this, arguments);
            }
        });
    }

    // provide custom jquery validators
    application.addInitializer(function(options) {
        $.validator.addMethod("money", function(value, element) {
            return this.optional(element) || /^(\d{1,6})(\.\d{1,2})?$/.test(value);
        }, "Must be proper currency format: dddddd.dd");
    });

    application.addInitializer(function(options) {
        logger.log('APPLICATION', 'start');
        var hiddenView = new HiddenView();
        application.bodyRegion.show(new RootView());
        hiddenView.setElement('body').render();

        var incomeCategoryControl = new CategoryControl("income");

        var outcomeCategoryControl = new CategoryControl("outcome");

        var IncomeFormDialog = new FormView({
            categoryControl: incomeCategoryControl,
            userControl: UserControl,
            type: "income"
        });

        var OutcomeFormDialog = new FormView({
            categoryControl: outcomeCategoryControl,
            userControl: UserControl,
            type: "outcome"
        });

        var userView = new UserView();

        var categoryView = new CategoryView({
            incomeCategoryControl: incomeCategoryControl,
            outcomeCategoryControl: outcomeCategoryControl
        });
    });

    return application;
});
