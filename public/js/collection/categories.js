define(['backbone', 'model/category', 'config', 'tools/logger'],
function(Backbone, CategoryModel, config, logger) {

    'use strict';

    return Backbone.Collection.extend({
        model: CategoryModel,

        initialize: function(options) {
            logger.model('categories', 'created', this);
            this.options = options;
            this.data = null; // FIXME: 2 b removed
        },

        url: function() {
            return config.urlRoot + '/' + this.options.type + "_category/";
        },

        // FIXME: fetching data shall be removed with built-in backbone fetching mechanism
        fetchData: function() {
            $.ajax({
                type: "GET",
                dataType: "json",
                context: this,
                async: false, // FIXME: why async ?
                url: this.url()
            }).done(function(response) {
                this.data = response.objects;
            }).fail(function(response) {
                throw new Error(response);
            });
        },

        getData: function() {
            if (this.data == null) {
                this.fetchData();
            }
            return this.data;
        },

        addNode: function(id, name, parent_id) {
            if (parent_id == -1) parent_id = null;
            var node = {
                "id": id,
                "name": name,
                "parent_id": parent_id
            };
            this.data.push(node);
        },

        getNode: function(id) {
            var found = $(this.getData()).map(function() {
                return (this.id == id) ? this : null;
            });
            return found.length ? found[0] : null;
        },

        renameNode: function(id, new_name) {
            var node = this.getNode(id);
            node.name = new_name;
        },

        setState: function(id, value) {
            var node = this.getNode(id);
            if (node != null) {
                node.state = value;
                return true;
            } else {
                return false;
            }
        }
    });
});
