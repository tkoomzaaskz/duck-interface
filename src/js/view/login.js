define([
    'underscore', 'marionette', 'tools/logger', 'component/auth',
    'text!templates/login.html'
], function(_, Marionette, logger, Auth, tpl) {

    'use strict';

    return Marionette.View.extend({
        template: _.template(tpl),
        loggerName: 'login',

        events: {
            'click #loginButton': 'processLogin'
        },

        ui: {
            login: 'input#inputLogin',
            password: 'input#inputPassword'
        },

        initialize: function() {
            logger.view(this.loggerName);
        },

        render: function() {
            logger.render(this.loggerName);
            this.$el.html(this.template());
            this.bindUIElements();
            return this;
        },

        setCursor: function(type) {
            Marionette.$('body').css('cursor', type);
        },

        processLogin: function(e) {
            e.preventDefault();
            this.setCursor('progress');
            var self = this,
                login = this.ui.login.val(),
                password = this.ui.password.val();
            if (Auth.login(login, password)) {
                setTimeout(function() {
                    self.trigger('login:success');
                    self.setCursor('default');
                }, 1000);
            } else {
                setTimeout(function() {
                    self.trigger('login:error');
                    self.setCursor('default');
                    alert('error');
                }, 1000);
            }
        }
    });
});
