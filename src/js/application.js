define([
    'jquery', 'backbone', 'marionette',
    'component/auth', 'config', 'router', 'tools/logger', 'mock/server',
    'collection/users', 'collection/categories',
    'view/root', 'view/login', 'view/dialog/user', 'view/dialog/category', 'view/dialog/form',
    'jqueryValidate', 'jstree'
], function($, Backbone, Marionette,
    Auth, config, Router, logger, MockServer,
    Users, Categories,
    RootView, LoginView, UserView, CategoryView, FormView) {

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
            console.error('There is a race condition in the duck app. By default the homepage is being opened. Initially, the homepage is being opened (if the router doesn\'t point anything else. The root view may or may not be created by this time. Hence the homepage view may not be attached to root view DOM. Fix this!');
            if (Auth.verify()) {
                this.openRootView();
            } else {
                this.openLoginView();
            }
        },

        createCollections: function() {
            // FIXME: asynchronous collection fetch
            // http://stackoverflow.com/questions/12168587/how-to-synchronize-multiple-backbone-js-fetches

            this.users = new Users();
            this.incomes = new Categories([], {type: "income"});
            this.outcomes = new Categories([], {type: "outcome"});

            var self = this;
            $.when(
                this.users.fetchHandle(),
                this.incomes.fetchHandle(),
                this.outcomes.fetchHandle()
            ).done(function() {
                self.trigger('app:ready');
                self.open();
                self.attachModals();
                logger.log('READY NOW!');
            });
        },

        attachModals: function() {
            var incomeFormView = new FormView({
                categories: this.incomes,
                users: this.users,
                type: 'income'
            })
            this.bodyRegion.$el.append(incomeFormView.$el);

            var outcomeFormView = new FormView({
                categories: this.outcomes,
                users: this.users,
                type: 'outcome'
            });
            this.bodyRegion.$el.append(outcomeFormView.$el);

            var categoryView = new CategoryView({
                incomeCategories: this.incomes,
                outcomeCategories: this.outcomes
            });
            this.bodyRegion.$el.append(categoryView.$el);

            var userView = new UserView({
                users: this.users
            });
            this.bodyRegion.$el.append(userView.$el);
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
        this.createCollections();
    });

    application.listenTo(application.loginView, 'login:success', application.open);
    application.listenTo(application.rootView, 'logout', application.open);

    application.on('initialize:before', function(options) {
        MockServer.init();
    });

    application.on('initialize:after', function(options) {
        logger.log('initialization finished');
        new Router;
        Backbone.history.start();
    });

    return application;
});
