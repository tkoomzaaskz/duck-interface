define([
    'backbone'
], function(Backbone) {

    'use strict';

    return Backbone.Router.extend({
        routes: {
            '': 'homepage',
            'chart/:type': 'chart',
            'grid/:type': 'grid'
        },

        homepage: function() {
            require(['view/homepage'], function(HomepageView) {
                var view = new HomepageView();
                view.render();
            });
        },
    
        chart: function(type) {
            require(['view/chart/' + type], function(ChartView) {
                var view = new ChartView();
                view.render();
            });
        },

        grid: function(type) {
            require(['view/grid/' + type], function(GridView) {
                var view = new GridView();
                view.render();
            });
        }
    });
});
