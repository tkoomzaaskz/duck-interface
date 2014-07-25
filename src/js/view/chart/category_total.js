define(['backbone', 'icanhaz', 'tools/loader', 'tools/logger', 'text!template/categoryTotal.ich',
    'chart/category_total'],
function(Backbone, ich, Loader, logger, template,
    CategoryTotalChart) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',
        el: '.container#main',

        defaults: {
            width: 600,
            height: 450,
            elementId: 'canvas',
        },

        initialize: function(options) {
            this.options = _.extend({}, this.defaults, this.options);
            logger.view('category total chart');
            Loader.addTemplate(template);
        },

        render: function() {
            logger.render('category total chart');
            this.$el.html(ich.categoryTotalTemplate({}));
            this.chart = new CategoryTotalChart({
                context: this.$(this.options.elementId).get(0).getContext('2d'),
                users: [1,2,4],
                from: '2013-11',
                to: '2014-03'
            });
        }
    });
});
