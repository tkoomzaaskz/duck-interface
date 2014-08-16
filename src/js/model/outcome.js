define([
    'backbone', 'config', 'tools/logger'
], function(Backbone, config, logger) {

    'use strict';

    return Backbone.Model.extend({
        urlRoot: config.urlRoot + '/outcome',
        url: function() {
            return this.urlRoot + '/' + this.id + '/?format=json';
        },

        initialize: function(options) {
            logger.model('outcome', 'created', this);
        }
    });
});
