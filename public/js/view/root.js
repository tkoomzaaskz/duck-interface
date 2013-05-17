define(['underscore', 'backbone'],
function(_, Backbone) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',

        render: function() {
            this.$el.html("<h1>hello world from W-L-D");
        }
    });
});
