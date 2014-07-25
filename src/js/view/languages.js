define(['backbone', 'icanhaz', 'tools/logger', 'tools/loader',
    'text!template/languages.ich'],
function(Backbone, ich, logger, Loader, template) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',

        events: {
            'click .flag': 'switchLanguage'
        },

        initialize: function(options) {
            logger.view('languages');
            Loader.addTemplate(template);
        },

        render: function() {
            logger.render('languages');
            this.$el.append(ich.languagesTemplate());
        },

        switchLanguage: function(event) {
            var cssClass = event.currentTarget.className;
            var lang = cssClass.substring(cssClass.lastIndexOf('-') + 1);
            logger.log('Language', lang);
        }
    });
});
