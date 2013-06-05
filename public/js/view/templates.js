define(['backbone', 'icanhaz', 'tools/logger'],
function(Backbone, ich, logger) {

    'use strict';

    return Backbone.View.extend({

        initialize: function(options) {
            logger.init('templates');
            $.ajax({
                type: 'GET',
                dataType: 'text',
                async: false,
                url: 'templates.ich',
                context: this
            }).done(function(response) {
                this.template = response;
            });
        },

        render: function() {
            logger.render('templates');
            this.$el.append(this.template);
            ich.grabTemplates();
            return this;
        }
    });
});
