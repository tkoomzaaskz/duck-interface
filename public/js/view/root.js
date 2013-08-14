define(['backbone', 'tools/logger', 'icanhaz', 'view/loader', 'text!template/root.ich',
    'view/users'],
function(Backbone, logger, ich, loader, template,
    UsersView) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'body',

        initialize: function(options) {
            logger.init('root');
            // temporarily switched off since old interface loads templates anyway
            //loader.loadTemplate(template);
            this.usersView = new UsersView();
        },

        render: function() {
            logger.render('root');
            this.$el.html(ich.rootTemplate);
            this.usersView.setElement(this.$el.find('#main')).render();
            return this;
        }
    });
});
