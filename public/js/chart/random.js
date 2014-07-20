define(['underscore', 'tools/logger', 'chart/abstract_chart', 'chart/colors'],
function(_, logger, AbstractChart, Colors) {

    'use strict';

    return AbstractChart.extend({
        initialize: function(options) {
            logger.model('random chart', 'created', this);
            this._required(options.cols, 'initialize:options.cols');
            this._required(options.rows, 'initialize:options.rows');
            this.options = options;
        },

        randomScalingFactor: function() {
            return Math.round(Math.random()*100);
        },

        randomSequence: function() {
            var res = [], count = this.options.cols;
            for (var i = 0; i < count; i++) {
                res.push(this.randomScalingFactor());
            }
            return res;
        },

        getLabels: function() {
            var res = [], count = this.options.cols;
            for (var i = 1; i <= count; i++) {
                res.push('label ' + i);
            }
            return res;
        },

        colors: Colors,

        getRandomColor: function() {
            return _.sample(this.colors, 1)[0];
        },

        getDataSets: function() {
            var count = this.options.rows;
            var res = [], item;
            for (var i = 1; i <= count; i++) {
                item = _.clone(this.getRandomColor());
                item.data = this.randomSequence();
                res.push(item);
            }
            return res;
        }
    });
});
