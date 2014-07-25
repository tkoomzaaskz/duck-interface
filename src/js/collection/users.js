define(['backbone', 'config', 'model/user', 'tools/logger'],
function(Backbone, config, UserModel, logger) {

    'use strict';

    return Backbone.Collection.extend({

        url: config.urlRoot + '/user/',

        model: UserModel,

        initialize: function() {
            logger.collection('users', 'created', this);
            this.fetch({
                success: function(collection, response, options) {
                    collection.setAll(true);
                },
                error: function(collection, response, options) {
                    logger.error('Fetching user data failed', response);
                }
            });
        },

        parse: function(response) {
            return response.objects;
        },

        setAll: function(chosen) {
            this.each(function(model) {
                model.set('chosen', chosen);
            });
        },

        setChosen: function(username_list) {
            this.map(function(model) {
                model.set('chosen', _.contains(username_list, model.get('username')));
            });
        },

        getChosen: function() {
            return this.map(function(model) {
                return model.get('first_name');
            });
        }
    });
});
