define([
    'underscore', 'tools/logger', 'tools/colors', 'tools/calendar', 'chart/abstract_chart'
], function(_, logger, Colors, Calendar, AbstractChart) {

    'use strict';

    return AbstractChart.extend({
        type: 'Bar',

        initialize: function(options) {
            logger.model('monthly balance chart', 'created', this);
            this._required(options.users, 'initialize:options.users');
            this._required(options.from, 'initialize:options.from');
            this._required(options.to, 'initialize:options.to');
            this._required(options.context, 'initialize:options.context');
            this.set('labels', Calendar.labels(options.from, options.to));
            this.set('colors', [this.colors.green, this.colors.yellow, this.colors.red]);
            this.set('data', [[1, 2, 10, 3, 5], [11, 4, 5, 6, 2], [7, 8, 9, 12, 12]]);
            // where to get data from ?
            this._createBaseChart();
        },

        url: function() {
            var urlBase = '/chart/monthly_balance';
            return config.urlRoot + urlBase + '?' + [
                'users=' + this.get('users').join(),
                'from=' + this.get('from'),
                'to=' + this.get('to')
            ].join('&');
        }
    });
});
