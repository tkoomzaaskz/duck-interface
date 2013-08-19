define(['jquery', 'backbone', 'marionette', 'bootstrap', 'tools/logger',
    'duck/user_control',
    'view/root', 'view/hidden', 'view/dialog/user', 'view/dialog/category', 'view/dialog/form',
    'jqueryValidate', 'jstree'],
function($, Backbone, Marionette, bootstrap, logger,
    UserControl,
    RootView, HiddenView, UserView, CategoryView, FormView) {

    'use strict';

    var application = new Marionette.Application();

    application.addRegions({
        bodyRegion: "body"
    });

    application.addInitializer(function(options) {
        Backbone.Model.prototype.trigger = function() {
            logger.event(arguments);
            Backbone.Events.trigger.apply(this, arguments);
        }
    });

    application.addInitializer(function(options) {
        $.validator.addMethod("money", function(value, element) {
            return this.optional(element) || /^(\d{1,6})(\.\d{1,2})?$/.test(value);
        }, "Must be proper currency format: dddddd.dd");
    });

    application.addInitializer(function(options) {
        logger.log('APPLICATION', 'start');
        var hiddenView = new HiddenView();
        var rootView = new RootView();
        rootView.setElement('body').render();
        hiddenView.setElement('body').render();

//        Application.bodyRegion.show(new RootView());

        var IncomeFormDialog = new FormView({
            categoryControl: window.IncomeCategoryControl,
            userControl: UserControl,
            type: "income"
        });
        var OutcomeFormDialog = new FormView({
            categoryControl: window.OutcomeCategoryControl,
            userControl: UserControl,
            type: "outcome"
        });
        var userView = new UserView();
        var categoryView = new CategoryView();
    });

    return application;
});
