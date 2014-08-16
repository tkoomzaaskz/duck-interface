define([
    'backbone', 'config', 'tools/logger'
], function(Backbone, config, logger) {

    'use strict';

    return Backbone.Model.extend({
        url: function() {
            return config.urlRoot + '/' + this.type + "category";
        },

        initialize: function(options) {
            logger.model('category', 'created', this);
        },

        getJsTreeNode: function() {
            return {
                data: {
                    title: this.get('name')
                },
                attr: {
                    id: this.id
                },
                state: undefined
            };
        }
    });
});
