define([
    'backbone', 'config', 'tools/logger'
], function(Backbone, config, logger) {

    'use strict';

    return Backbone.Model.extend({

        urlRoot: config.urlRoot + '/user',

        url: function() {
            return this.urlRoot + '/' + this.id;
        },

        getFullName: function() {
            return this.get('firstName') + ' ' + this.get('lastName');
        },

        initialize: function(options) {
            logger.model('user', 'created', this);
        }
    });
});
