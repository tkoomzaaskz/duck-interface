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
            return this.get('first_name') + ' ' + this.get('last_name');
        },

        initialize: function(options) {
            logger.model('user', 'created', this);
            this.view = options.view;
//            this.on('reset', this.template, this);
//            this.on('sync', this.template, this);
        },

        template: function() {
            this.view.$el.find('ul').append('<li>' + this.getFullName() + '</li>');
        }

    });
});
