define(['backbone', 'icanhaz', 'view/loader', 'tools/logger', 'text!template/homepage.ich'],
function(Backbone, ich, loader, logger, template) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',
        el: '.container#main',

        initialize: function(options) {
            logger.view('homepage');
            loader.addTemplate(template);
        },

        render: function() {
            logger.render('homepage');
            this.$el.html(ich.homepageTemplate({}));
        }
    });
});
