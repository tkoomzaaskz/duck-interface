define(['backbone', 'tools/logger', 'chart/abstract_chart'],
function(Backbone, logger, AbstractChart) {

    'use strict';

    return Backbone.Model.extend({
        url: function() {
            return config.urlRoot + '/chart/monthly_balance/some_arguments';
        },

        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'October', 'December'],

        getLabels: function(start, size) {
            return this.months.slice(start, size);
        }
    });
});
