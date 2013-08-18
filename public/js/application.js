define(['jquery', 'backbone', 'marionette', 'bootstrap', 'tools/logger',
    'duck/form_dialog', 'duck/user_control',
    'view/root', 'view/hidden', 'view/dialog/user', 'view/dialog/category', 'jqueryValidate', 'jstree'],
function($, Backbone, Marionette, bootstrap, logger,
    FormDialog, UserControl,
    RootView, HiddenView, UserPseudoView, CategoryPseudoView) {

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
        var rootView = new RootView();
        var hiddenView = new HiddenView();
        hiddenView.setElement('body').render();
        rootView.setElement('body').render();
//        Application.bodyRegion.show(new RootView());

        // append modal containers
        $('body').append(ich.modalsContainerTemplate());

        // bootstrap menu: dropdown
        $('.dropdown-toggle').dropdown();

        // popover-ize all info buttons
        $('a.btn-info').popover({
            'placement': 'bottom'
        });

        var IncomeFormDialog = new FormDialog(window.IncomeCategoryControl, UserControl, "income");
        IncomeFormDialog.init();

        var OutcomeFormDialog = new FormDialog(window.OutcomeCategoryControl, UserControl, "outcome");
        OutcomeFormDialog.init();

        UserPseudoView.init();
        CategoryPseudoView.init();
    });

    return application;
});
