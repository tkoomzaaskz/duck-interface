define(['underscore', 'tools/logger', 'chart/abstract_chart', 'chart/colors'],
function(_, logger, AbstractChart, Colors) {

    'use strict';

    return AbstractChart.extend({
        type: 'Pie',

        initialize: function(options) {
            logger.model('category total chart', 'created', this);
            this._required(options.context, 'initialize:options.context');
            // where to get data from ?
            this._createBaseChart();
        },

        chartData: function() {
            return [
                {
                    value: 300,
                    color:"#F7464A",
                    highlight: "#FF5A5E",
                    label: "Category 1"
                },
                {
                    value: 50,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "Category 2"
                },
                {
                    value: 100,
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: "Category 3"
                }
            ];
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
