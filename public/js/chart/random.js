define(['underscore', 'tools/logger', 'chart/abstract_chart'],
function(_, logger, AbstractChart) {

    'use strict';

    return AbstractChart.extend({
        type: 'Bar',

        initialize: function(options) {
            logger.model('random chart', 'created', this);
            this._required(options.cols, 'initialize:options.cols');
            this._required(options.rows, 'initialize:options.rows');
            this._required(options.context, 'initialize:options.context');
            this._required(options.rows, 'initialize:options.maxValue');
            this.options = options;
            this.set('labels', this.randomLabels());
            this.set('colors', this.randomColors());
            this._createBaseChart();
        },

        randomScalingFactor: function() {
            return Math.round(Math.random() * this.options.maxValue);
        },

        randomSequence: function() {
            var res = [], count = this.options.rows;
            for (var i = 0; i < count; i++) {
                res.push(this.randomScalingFactor());
            }
            return res;
        },

        randomLabels: function() {
            var res = [], count = this.options.rows;
            for (var i = 1; i <= count; i++) {
                res.push('label ' + i);
            }
            return res;
        },

        randomColors: function() {
            return _.sample(this.colors, this.options.cols)
        },

        getDataSets: function() {
            var count = this.options.cols;
            var colors = this.get('colors');
            var res = [], item;
            for (var i = 0; i < count; i++) {
                item = _.clone(colors[i]);
                item.data = this.randomSequence();
                res.push(item);
            }
            return res;
        }
    });
});
