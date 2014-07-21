define(['underscore', 'backbone', 'tools/logger', 'icanhaz', 'view/loader', 'text!template/login.ich'],
function(_, Backbone, logger, ich, loader, template) {

    'use strict';

    return Backbone.View.extend({

        events: {
            'click #loginButton': 'processLogin'
        },

        render: function() {
            logger.render('login');
            this.$el.html(ich.loginTemplate());
            return this;
        },

        allowedCredentials: [{
            login: 'td',
            password: 'td'
        }, {
            login: 'bs',
            password: 'bs'
        }],

        verified: function(login, password) {
            return _.filter(this.allowedCredentials, function(cred) {
                return cred.login == login && cred.password == password;
            }).length > 0;
        },

        setCursor: function(type) {
            Backbone.$('body').css('cursor', type);
        },

        processLogin: function(e) {
            e.preventDefault();
            this.setCursor('progress');
            var _self = this,
                login = this.$('input')[0].value,
                password = this.$('input')[1].value;
            if (this.verified(login, password)) {
                setTimeout(function() {
                    _self.trigger('login:success');
                    _self.setCursor('default');
                }, 1000);
            } else {
                setTimeout(function() {
                    _self.trigger('login:error');
                    _self.setCursor('default');
                    alert('error');
                }, 1000);
            }
        }
    });
});
