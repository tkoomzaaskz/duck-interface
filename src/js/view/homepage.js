define([
    'marionette', 'tools/logger',
    'text!templates/homepage.html'
], function(Marionette, logger, tpl) {

    'use strict';

    return Marionette.View.extend({
        template: _.template(tpl),
        loggerName: 'root',
        tagName: 'div',
        el: '.container#main',

        initialize: function(options) {
            logger.view(this.loggerName);
        },

        render: function() {
            logger.render(this.loggerName);
            this.$el.html(this.template());
            return this;
        }
    });
});
