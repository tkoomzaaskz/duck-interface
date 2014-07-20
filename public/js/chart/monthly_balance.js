define(['underscore', 'tools/logger', 'chart/abstract_chart', 'chart/colors'],
function(_, logger, AbstractChart, Colors) {

    'use strict';

    var balanceColors = {
        income: Colors.green,
        outcome: Colors.red,
        balance: Colors.yellow
    };

    return AbstractChart.extend({
        type: 'Bar',

        colors: balanceColors,

        url: function() {
            return config.urlRoot + '/chart/monthly_balance/some_arguments';
        },

        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'October', 'December'],

        getLabels: function(start, size) {
            return this.months.slice(start, size);
        }
    });
});
