define(['backbone', 'tools/logger', 'icanhaz', 'view/loader', 'text!template/root.ich',
    'view/header', 'view/users'],
function(Backbone, logger, ich, loader, template,
    HeaderView, UsersView) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'body',

        initialize: function(options) {
            logger.init('root');
            loader.loadTemplate(template);
            this.headerView = new HeaderView();
            this.usersView = new UsersView();
        },

        render: function() {
            logger.render('root');
            this.$el.html(ich.rootTemplate);
            this.headerView.setElement(this.$el.find('#header')).render();
            this.usersView.setElement(this.$el.find('#main')).render();
            return this;
        }
    });
});
