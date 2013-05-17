define(['underscore', 'backbone', 'logger'],
function(_, Backbone, logger) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',

        render: function() {
            logger.log('RENDER:', 'root');
            this.$el.html("<h1>hello world from W-L-D</h1>");
        }
    });
});
