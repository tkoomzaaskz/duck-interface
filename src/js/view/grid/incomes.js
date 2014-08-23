define([
    'marionette', 'tools/logger', 'text!templates/grid/incomes.html',
    // pre-loaded only:
    'datatables'
], function(Marionette, logger, tpl) {

    'use strict';

    return Marionette.View.extend({
        template: _.template(tpl),
        loggerName: 'incomes grid',
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
