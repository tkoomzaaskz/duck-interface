define(['backbone', 'icanhaz', 'view/loader', 'tools/logger', 'text!template/incomes.ich',
    'datatables'],
function(Backbone, ich, loader, logger, template) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',
        el: '.container#main',

        initialize: function(options) {
            logger.view('incomes');
            loader.addTemplate(template);
        },

        render: function() {
            logger.render('incomes');
            this.$el.html(ich.incomesTemplate({}));
        }
    });
});
