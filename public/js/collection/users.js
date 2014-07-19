define(['config', 'model/user', 'tools/logger'],
function(config, UserModel, logger) {

    'use strict';

    var Users = Backbone.Collection.extend({

        url: config.urlRoot + '/user/',

        model: UserModel,

        initialize: function() {
            logger.collection('STATS');
        },

        parse: function(response) {
            return response.objects;
        },

        data: null,

        fetchData: function() {
            $.ajax({
                type: "GET",
                dataType: "json",
                context: this,
                async: false,
                url: config.urlRoot + '/' + "user/"
            }).done(function(response) {
                this.data = response.objects;
                this.setAll(true);
            }).fail(function(response) {
                console.log(response);
                throw new Error(response);
            });
        },

        getData: function() {
            if (this.data == null) {
                this.fetchData();
            }
            return this.data;
        },

        setAll: function(chosen) {
            for (var index = 0; index < this.data.length; ++index) {
                this.data[index].chosen = chosen;
            }
        },

        setChosen: function(username_list) {
            for (var index = 0; index < this.data.length; ++index) {
                this.data[index].chosen = ($.inArray(this.data[index].username, username_list) > -1);
            }
        },

        getChosen: function() {
            return $(this.getData()).map(function() {
                return (this.chosen) ? this.first_name : null;
            });
        }
    });

    return Users;
});
