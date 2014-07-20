define(['backbone', 'chartjs', 'tools/logger', 'chart/colors'],
function(Backbone, Chart, logger, Colors) {

    'use strict';

    return Backbone.Model.extend({
        type: null, // shall be overriden in sub-objects

        colors: Colors,

        _required: function(arg, name) {
            if (typeof arg == 'undefined') {
                throw new Error(name + ' must be set');
            }
        },

        // enable extending AbstractChart
        extend: Backbone.Model.extend,

        _createBaseChart: function() {
            this.chart = new Chart(this.options.context)[this.type](this.chartData(), {
                responsive : true
            });
        },

        destroyBaseChart: function() {
            this.chart.destroy();
        },

        chartData: function() {
            var values = [], item,
                colors = this.get('colors'),
                data = this.get('data'),
                length = data.length;
            for (var i = 0; i < length; i++) {
                item = _.clone(colors[i]);
                item.data = data[i];
                values.push(item);
            }
            return {
		labels: this.get('labels'),
		datasets: values
            };
        },
    });
});
