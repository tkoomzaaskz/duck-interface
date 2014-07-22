define(['backbone', 'icanhaz', 'tools/logger', 'view/loader',
    'text!template/languages.ich'],
function(Backbone, ich, logger, loader, template) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',

        events: {
            'click .flag': 'switchLanguage'
        },

        initialize: function(options) {
            logger.render('languages dialog');
            this.options = options;
            loader.addTemplate(template);
        },

        render: function() {
            this.$el.append(ich.languagesTemplate());
        },

        switchLanguage: function(event) {
            var cssClass = event.currentTarget.className;
            var lang = cssClass.substring(cssClass.lastIndexOf('-') + 1);
            logger.log('Language', lang);
        }
    });
});
