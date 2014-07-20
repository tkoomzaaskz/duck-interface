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
            this._required(options.context, 'initialize:options.context');
            this.options = options;
            // where to get data from ?
            this._createBaseChart();
        },

        url: function() {
            var urlBase = '/chart/category_total';
            return config.urlRoot + urlBase + '?' + [
                'users=' + this.get('users').join(),
                'from=' + this.get('from'),
                'to=' + this.get('to')
            ].join('&');
        }
    });
});
