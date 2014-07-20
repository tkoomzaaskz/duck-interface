define(['underscore', 'tools/logger', 'chart/abstract_chart', 'chart/colors'],
function(_, logger, AbstractChart, Colors) {

    'use strict';

/*
    var balanceColors = {
        income: Colors.green,
        outcome: Colors.red,
        balance: Colors.yellow
    };
*/
    return AbstractChart.extend({
        type: 'Bar',

        initialize: function(options) {
            logger.model('monthly balance chart', 'created', this);
            this._required(options.cols, 'initialize:options.cols');
            this._required(options.rows, 'initialize:options.rows');
            this._required(options.context, 'initialize:options.context');
            this.options = options;
            this.set('labels', ['January', 'February', 'March']);
            this.set('colors', [this.Colors.green, this.Colors.yellow, this.Colors.red]);
            this.set('data', [[1,2,3], [4,5,6], [7,8,9], [10, 11, 12]]);
            // where to get data from ?
            this._createBaseChart();
        },

        url: function() {
            return config.urlRoot + '/chart/monthly_balance/some_arguments';
        },

        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'October', 'December'],

        getLabels: function(start, size) {
            return this.months.slice(start, size);
        }
    });
});
