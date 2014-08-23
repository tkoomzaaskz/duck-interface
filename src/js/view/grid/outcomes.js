define([
    'backbone', 'tools/logger', 'text!templates/grid/outcomes.html',
    // pre-loaded only:
    'datatables'
], function(Backbone, logger, tpl) {

    'use strict';

    return Backbone.View.extend({
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
               "ajax": "js/mock/outcomes.json"
            });
            return this;
        }
    });
});
