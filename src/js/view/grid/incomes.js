define(['backbone', 'icanhaz', 'tools/loader', 'tools/logger', 'text!template/incomes.ich',
    'datatables'],
function(Backbone, ich, Loader, logger, template) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',
        el: '.container#main',

        initialize: function(options) {
            logger.view('incomes');
            Loader.addTemplate(template);
        },

        render: function() {
            logger.render('incomes');
            this.$el.html(ich.incomesTemplate({}));
        }
    });
});
