define(['underscore', 'backbone',
    'tools/logger', 'tools/auth', 'icanhaz', 'tools/loader', 'text!template/login.ich'],
function(_, Backbone,
    logger, Auth, ich, Loader, template) {

    'use strict';

    return Backbone.View.extend({

        events: {
            'click #loginButton': 'processLogin'
        },

        initialize: function() {
            logger.view('login');
            Loader.addTemplate(template);
        },

        render: function() {
            logger.render('login');
            this.$el.html(ich.loginTemplate());
            return this;
        },

        setCursor: function(type) {
            Backbone.$('body').css('cursor', type);
        },

        processLogin: function(e) {
            e.preventDefault();
            this.setCursor('progress');
            debugger;
            var _self = this,
                login = this.$('input#inputLogin').val(),
                password = this.$('input#inputPassword').val();
            if (Auth.login(login, password)) {
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
