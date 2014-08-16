define([
    'underscore', 'tools/logger', 'chart/abstract_chart'
], function(_, logger, AbstractChart) {

    'use strict';

    return AbstractChart.extend({
        type: 'Bar',

        initialize: function(options) {
            logger.model('random chart', 'created', this);
            this._required(options.cols, 'initialize:options.cols');
            this._required(options.rows, 'initialize:options.rows');
            this._required(options.context, 'initialize:options.context');
            this._required(options.rows, 'initialize:options.maxValue');
            this.generateRandomData();
            this._createBaseChart();
        },

        randomScalingFactor: function() {
            return Math.round(Math.random() * this.get('maxValue'));
        },

        randomSequence: function() {
            var res = [], count = this.get('rows');
            for (var i = 0; i < count; i++) {
                res.push(this.randomScalingFactor());
            }
            return res;
        },

        randomData: function() {
            var count = this.get('cols'), res = [];
            for (var i = 0; i < count; i++) {
                res.push(this.randomSequence());
            }
            return res;
        },

        randomLabels: function() {
            var res = [], count = this.get('rows');
            for (var i = 1; i <= count; i++) {
                res.push('label ' + i);
            }
            return res;
        },

        randomColors: function() {
            return _.sample(this.colors, this.get('cols'))
        },

        generateRandomData: function() {
            this.set('data', this.randomData());
            this.set('labels', this.randomLabels());
            this.set('colors', this.randomColors());
        }
    });
});
