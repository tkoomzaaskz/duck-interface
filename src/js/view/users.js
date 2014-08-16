define([
    'backbone', 'tools/logger', 'model/user'
], function(Backbone, logger, UserModel) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',

        initialize: function(options) {
            logger.view('users');
            this.loadUsers();
        },

        render: function() {
            logger.render('users');
            return this;
        },

        loadUsers: function() {
            var ids = [1,2,3,4];
            for (var id in ids) {
                var user = new UserModel({id: ids[id], view: this});
                user.fetch({ success: function(model, response){ model.template(); } });
            }
        }
    });
});
