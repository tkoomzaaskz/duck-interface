define(['backbone', 'tools/logger', 'model/user'],
function(Backbone, logger, UserModel) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',

        initialize: function(options) {
            logger.init('users');
            this.loadUsers();
        },

        loadUsers: function() {
            var ids = [1,2,3,4];
            for (var id in ids) {
                var user = new UserModel({id: ids[id], view: this});
                user.fetch({ success: function(model, response){ model.template(); } });
            }
        },

        render: function() {
            logger.render('users');
            this.$el.html("<h1>hello world from W-L-D</h1>Those are our users:<ul></ul>");
            return this;
        }
    });
});
