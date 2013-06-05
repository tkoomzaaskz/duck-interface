define(['backbone', 'tools/logger', 'icanhaz', 'view/loader', 'text!template/header.ich'],
function(Backbone, logger, ich, loader, template) {

    'use strict';

    return Backbone.View.extend({

        initialize: function(options) {
            logger.init('header');
            loader.loadTemplate(template);
        },

        render: function() {
            logger.render('header');
            this.$el.html(ich.headerTemplate());
            return this;
        }
    });
});
