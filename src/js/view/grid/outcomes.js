define([
    'marionette', 'tools/logger', 'text!templates/grid/outcomes.html',
    // pre-loaded only:
    'datatables'
], function(Marionette, logger, tpl) {

    'use strict';

    return Marionette.View.extend({
        template: _.template(tpl),
        loggerName: 'outcomes grid',
        tagName: 'div',
        el: '.container#main',

        initialize: function(options) {
            logger.view(this.loggerName);
        },

        render: function() {
            logger.render(this.loggerName);
            this.$el.html(this.template());
            this.$('#outcomes').dataTable( {
               "ajax": "js/mock/outcome.json"
            });
            return this;
        }
    });
});
