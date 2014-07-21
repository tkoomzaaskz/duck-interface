define(['jquery', 'backbone', 'marionette',
    'config', 'tools/logger', 'tools/fake', 'tools/auth',
    'collection/users', 'collection/categories',
    'view/root', 'view/login', 'view/hidden', 'view/dialog/user', 'view/dialog/category', 'view/dialog/form',
    'jqueryValidate', 'jstree'],
function($, Backbone, Marionette,
    config, logger, Fake, Auth,
    Users, Categories,
    RootView, LoginView, HiddenView, UserView, CategoryView, FormView) {

    'use strict';

    var application = new Marionette.Application({

        rootView: new RootView(),

        loginView: new LoginView(),

        openRootView: function() {
            this.bodyRegion.show(this.rootView);
        },

        openLoginView: function() {
            this.bodyRegion.show(this.loginView);
        },

        open: function() {
            if (Auth.verify()) {
                this.openRootView();
            } else {
                this.openLoginView();
            }
        }
    });

    application.addRegions({
        bodyRegion: "body"
    });

    if (config.logged_events.length) {
        // overriding backbone's model trigger function to log events
        application.addInitializer(function(options) {
            var original_trigger = Backbone.Events.trigger;
            Backbone.Model.prototype.trigger = Backbone.Marionette.Application.prototype.trigger = function() {
                logger.event(arguments);
                original_trigger.apply(this, arguments);
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
        this.open();
        hiddenView.setElement('body').render();

        var users = new Users();

        var incomeCategories = new Categories({type: "income"});

        var outcomeCategories = new Categories({type: "outcome"});

        var userView = new UserView({
            users: users
        });

        var IncomeFormDialog = new FormView({
            categories: incomeCategories,
            users: users,
            type: "income"
        });

        var OutcomeFormDialog = new FormView({
            categories: outcomeCategories,
            users: users,
            type: "outcome"
        });

        var categoryView = new CategoryView({
            incomeCategories: incomeCategories,
            outcomeCategories: outcomeCategories
        });
    });

    application.listenTo(application.loginView, 'login:success', application.open);
    application.listenTo(application.rootView, 'logout', application.open);

    application.on('initialize:before', function(options) {
        Fake.init();
        Backbone.history.start();
    });

    application.on('initialize:after', function(options) {
        logger.log('initialization finished');
    });

    return application;
});
