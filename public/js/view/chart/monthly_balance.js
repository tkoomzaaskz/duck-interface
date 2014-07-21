define(['backbone', 'icanhaz', 'tools/logger', 'chart/random', 'chart/monthly_balance'],
function(Backbone, ich, logger, RandomChart, MonthlyBalanceChart) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',
        el: '.container#main',

        initialize: function(options) {
            // FIXME: unify logger.render and logger.view among all views
            logger.view('monthly balance chart');
            this.options = options;
        },

        // FIXME: is defaults used by views ? (not only models ?)
        defaults: {
            width: 600,
            height: 450,
            elementId: 'canvas',
        },

        render: function() {
            logger.render('monthly balance chart');
            this.$el.html(ich.monthlyBalanceTemplate({
                width: this.defaults.width,
                height: this.defaults.height,
                elementId: this.defaults.elementId
            }));
//
            this.chart = new MonthlyBalanceChart({
                context: this.$(this.defaults.elementId).get(0).getContext('2d'),
                users: [1,2,4],
                from: '2013-11',
                to: '2014-03'
            });
//
/*
            this.chart = new RandomChart({
                context: this.$(this.defaults.elementId).get(0).getContext('2d'),
                rows: Math.round(Math.random() * 5) + 2,
                cols: 4,
                maxValue: 1000
            });
*/
        }
    });
});