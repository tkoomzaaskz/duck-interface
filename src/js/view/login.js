define([
    'underscore', 'backbone', 'tools/logger', 'component/auth',
    'text!templates/login.html'
], function(_, Backbone, logger, Auth, tpl) {

    'use strict';

    return Backbone.View.extend({
        template: _.template(tpl),
        loggerName: 'login',

        events: {
            'click #loginButton': 'processLogin'
        },

        initialize: function() {
            logger.view(this.loggerName);
        },

        render: function() {
            logger.render(this.loggerName);
            this.$el.html(this.template());
            return this;
        },

        setCursor: function(type) {
            Backbone.$('body').css('cursor', type);
        },

        processLogin: function(e) {
            e.preventDefault();
            this.setCursor('progress');
            var self = this,
                login = this.$('input#inputLogin').val(),
                password = this.$('input#inputPassword').val();
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
