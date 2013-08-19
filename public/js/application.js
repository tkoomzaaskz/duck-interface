define(['jquery', 'backbone', 'marionette', 'bootstrap', 'tools/logger',
    'duck/user_control',
    'view/root', 'view/hidden',
    'view/dialog/user', 'view/dialog/category', 'view/dialog/form', 'jqueryValidate', 'jstree'],
function($, Backbone, Marionette, bootstrap, logger,
    UserControl,
    RootView, HiddenView,
    UserView, CategoryView, FormPseudoView) {

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

        var IncomeFormDialog = new FormPseudoView(window.IncomeCategoryControl, UserControl, "income");
        IncomeFormDialog.init();

        var OutcomeFormDialog = new FormPseudoView(window.OutcomeCategoryControl, UserControl, "outcome");
        OutcomeFormDialog.init();

        var userView = new UserView();
        var categoryView = new CategoryView();
    });

    return application;
});
