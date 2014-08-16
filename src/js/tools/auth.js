define([
    'jquery', 'underscore'
], function($, _) {

    'use strict';

    return {
        verify: function() {
            return $.cookie('authorization');
        },

        allowedCredentials: [{
            login: 'td',
            password: 'td'
        }, {
            login: 'bs',
            password: 'bs'
        }],

        correctCredentials: function(login, password) {
            return _.filter(this.allowedCredentials, function(cred) {
                return cred.login == login && cred.password == password;
            }).length > 0;
        },

        login: function(login, password) {
            var result = false;
            if (this.correctCredentials(login, password)) {
                $.cookie('authorization', login, {path: '/'});
                result = true;
            }
            return result;
        },

        logout: function() {
            $.removeCookie('authorization', {path: '/'});
        }
    };
});
