define(['jquery', 'backbone', 'chartjs', 'tools/logger', 'tools/colors'],
function($, Backbone, Chart, logger, Colors) {

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
            this.chart = new Chart(this.get('context'))[this.type](this.chartData(), {
                responsive : true,
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
            });
	    $('body').append(this.chart.generateLegend());
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
            var result = {
		labels: this.get('labels'),
		datasets: values
            };
	    logger.log('chart data', result);
	    return result;
        }
/*

+----------+-------------+----------------+
| Section  | John Lennon | Paul McCartney |
+----------+-------------+----------------+
| February | 93.52       | 845.98         |
+----------+-------------+----------------+
| March    | 234.97      | 341.09         |
+----------+-------------+----------------+
| April    | 739.10      | 32.47          |
+----------+-------------+----------------+
| May      | 600.39      | 23.98          |
+----------+-------------+----------------+

cols = [ John Lennon, Paul McCartney ] - colors
rows = [ February, March, APril, May ] - labels

*/
    });
});
