define(['backbone', 'icanhaz', 'tools/loader', 'tools/logger', 'text!template/monthlyBalance.ich',
    'chart/random', 'chart/monthly_balance'],
function(Backbone, ich, Loader, logger, template,
    RandomChart, MonthlyBalanceChart) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',
        el: '.container#main',

        defaults: {
            width: 600,
            height: 450,
            elementId: 'canvas',
        },

        initialize: function(options) {
            this.options = _.extend({}, this.defaults, this.options);
            logger.view('monthly balance chart');
            Loader.addTemplate(template);
        },

        // FIXME: destroy view when unused: http://stackoverflow.com/a/11534056
        // do this manually or rely on Marionette?
        render: function() {
            logger.render('monthly balance chart');
            this.$el.html(ich.monthlyBalanceTemplate({
                width: this.defaults.width,
                height: this.defaults.height,
                elementId: this.defaults.elementId
            }));
//
            this.chart = new MonthlyBalanceChart({
                context: this.$(this.options.elementId).get(0).getContext('2d'),
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
