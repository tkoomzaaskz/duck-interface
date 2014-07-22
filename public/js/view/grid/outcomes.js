define(['backbone', 'icanhaz', 'view/loader', 'tools/logger', 'text!template/outcomes.ich',
    'datatables'],
function(Backbone, ich, loader, logger, template) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',
        el: '.container#main',

        initialize: function(options) {
            logger.view('outcomes');
            loader.addTemplate(template);
        },

        render: function() {
            logger.render('outcomes');
            this.$el.html(ich.outcomesTemplate({}));
            this.$('#outcomes').dataTable( {
               "ajax": "data/outcomes.json"
            });
        }
    });
});
