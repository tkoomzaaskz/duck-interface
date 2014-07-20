define(['backbone', 'tools/logger'],
function(Backbone, logger) {

    'use strict';

    return Backbone.Model.extend({

        initialize: function(options) {
            logger.model('chart', 'created', this);
            // options should include:
            // * color attributes
            // FIXME: define above
            this.options = options;
        },

        _required: function(arg, name) {
            if (typeof arg == 'undefined') {
                throw new Error(name + ' must be set');
            }
        },

        // enable extending AbstractChart
        extend: Backbone.Model.extend,

        _notImplemented: function() { throw new Error('Method not implemented in abstract object'); },
        getLabels: function() { this._notImplemented(); },
        getDataSets: function() { this._notImplemented(); },

        getChartData: function() {
            return {
		labels: this.getLabels(),
		datasets: this.getDataSets()
            };
        }
    });
});
