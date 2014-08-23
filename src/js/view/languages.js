define([
    'marionette', 'tools/logger',
    'text!templates/languages.html'
], function(Marionette, logger, tpl) {

    'use strict';

    return Marionette.View.extend({
        template: _.template(tpl),
        loggerName: 'root',
        tagName: 'div',

        events: {
            'click .flag': 'switchLanguage'
        },

        initialize: function(options) {
            logger.view(this.loggerName);
        },

        render: function() {
            logger.render(this.loggerName);
            this.$el.append(this.template());
            return this;
        },

        switchLanguage: function(event) {
            var cssClass = event.currentTarget.className;
            var lang = cssClass.substring(cssClass.lastIndexOf('-') + 1);
            logger.log('Language', lang);
        }
    });
});
