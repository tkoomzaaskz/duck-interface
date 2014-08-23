define([
    'marionette', 'tools/logger', 'chart/category_total',
    'text!templates/chart/categoryTotal.html'
], function(Marionette, logger, CategoryTotalChart, tpl) {

    'use strict';

    return Marionette.View.extend({
        template: _.template(tpl),
        loggerName: 'root',
        tagName: 'div',
        el: '.container#main',

        defaults: {
            width: 600,
            height: 450,
            elementId: 'canvas',
        },

        initialize: function(options) {
            this.options = _.extend({}, this.defaults, this.options);
            logger.view(this.loggerName);
        },

        render: function() {
            logger.render(this.loggerName);
            this.$el.html(this.template(this.options));
            this.chart = new CategoryTotalChart({
                context: this.$(this.options.elementId).get(0).getContext('2d'),
                users: [1,2,4],
                from: '2013-11',
                to: '2014-03'
            });
            return this;
        }
    });
});
