define(['backbone', 'icanhaz', 'tools/logger', 'chartjs', 'chart/random'],
function(Backbone, ich, logger, Chart, RandomChart) {

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
            var randomSize = Math.round(Math.random() * 5) + 2;
            var ctx = this.$(this.defaults.elementId).get(0).getContext('2d');
            var randomChart = new RandomChart({cols: 4, rows:2});
            // FIXME: remove window/global assignment
            window.myBar = new Chart(ctx).Bar(randomChart.getChartData(), {
                responsive : true
            });
        }
    });
});
