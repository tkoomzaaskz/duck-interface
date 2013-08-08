define(['backbone', 'config', 'tools/logger'],
function(Backbone, config, logger) {

    'use strict';

    return Backbone.Model.extend({
        urlRoot: config.urlRoot + '/category',
        url: function() {
            return this.urlRoot + '/' + this.id + '/?format=json';
        },

        initialize: function(options) {
            logger.model('category', 'created', this);
        }
    });
});