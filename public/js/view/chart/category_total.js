define(['backbone', 'icanhaz', 'view/loader', 'tools/logger', 'text!template/categoryTotal.ich'],
function(Backbone, ich, loader, logger, template) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',
        el: '.container#main',

        initialize: function(options) {
            logger.view('monthly balance chart');
            loader.addTemplate(template);
        },

        render: function() {
            logger.render('category total chart');
            this.$el.html(ich.categoryTotalTemplate({}));
        }
    });
});
