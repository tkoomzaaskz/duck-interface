define(['backbone', 'chartjs', 'tools/logger', 'chart/colors'],
function(Backbone, Chart, logger, Colors) {

    'use strict';

    return Backbone.Model.extend({
        type: null, // shall be overriden in sub-objects

        _createBaseChart: function() {
            this.chart = new Chart(this.options.context)[this.type](this.getChartData(), {
                responsive : true
            });
        },

        destroyBaseChart: function() {
            this.chart.destroy();
        },

        _required: function(arg, name) {
            if (typeof arg == 'undefined') {
                throw new Error(name + ' must be set');
            }
        },

        colors: Colors,

        // enable extending AbstractChart
        extend: Backbone.Model.extend,

        _notImplemented: function() { throw new Error('Method not implemented in abstract object'); },
        getLabels: function() { this._notImplemented(); },
        getDataSets: function() { this._notImplemented(); },

        getChartData: function() {
            return {
		labels: this.get('labels'),
		datasets: this.getDataSets()
            };
        }
    });
});
