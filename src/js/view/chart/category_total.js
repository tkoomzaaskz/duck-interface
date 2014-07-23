define(['backbone', 'icanhaz', 'view/loader', 'tools/logger', 'text!template/categoryTotal.ich',
    'chart/category_total'],
function(Backbone, ich, loader, logger, template,
    CategoryTotalChart) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',
        el: '.container#main',

        initialize: function(options) {
            logger.view('category total chart');
            loader.addTemplate(template);
        },

        // FIXME: is defaults used by views ? (not only models ?)
        defaults: {
            width: 600,
            height: 450,
            elementId: 'canvas',
        },

        render: function() {
            logger.render('category total chart');
            this.$el.html(ich.categoryTotalTemplate({}));
            this.chart = new CategoryTotalChart({
                context: this.$(this.defaults.elementId).get(0).getContext('2d'),
                users: [1,2,4],
                from: '2013-11',
                to: '2014-03'
            });
        }
    });
});
