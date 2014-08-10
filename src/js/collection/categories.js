define(['backbone', 'model/category', 'config', 'tools/logger'],
function(Backbone, CategoryModel, config, logger) {

    'use strict';

    function InterfaceNode(node) {
        this.data = {title: node.name};
        this.attr = {id: node.id};
    }

    InterfaceNode.prototype = {
        state: undefined
    };

    return Backbone.Collection.extend({

        url: function() {
            return config.urlRoot + '/' + this.options.type + "_category/";
        },

        model: CategoryModel,

        initialize: function(models, options) {
            logger.collection('categories', 'created', this);
            this.options = options;
            this.data = null; // FIXME: 2 b removed
        },

        fetchHandle: function() {
            return this.fetch({
                success: function(collection, response, options) {
                    // debugger;
                },
                error: function(collection, response, options) {
                    logger.error('Fetching category data failed', response);
                }
            });
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
                logger.log(response);
                logger.error("Fetching category data failed, see response above");
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
        },

        getTree: function() {
            var categories = this.getData();
            if (categories == null)
                return null;

            // roots first
            categories.sort(function(a, b) {
                var a_p_undef = a.parent_id === null,
                    b_p_undef = b.parent_id === null;
                if (a_p_undef === b_p_undef) return a.id - b.id;
                if (a_p_undef && !b_p_undef) return -1;
                return 1;
            });

            var nodeMap = {},
                tree = new Tree();
            _.each(categories, function(node) {
                nodeMap[node.id] = node;
                if (node.parent_id === undefined) {
                    node.parent_id = null; // remove when API returns proper parent_id value
                }
                if (node.parent_id === null) {
                    tree.push(node.id);
                } else {
                    tree.children[node.parent_id].push(node.id);
                }
            });

            var node, children, result = _.map(tree, function(id) {
                node = new InterfaceNode(nodeMap[id]);
                children = _.map(tree.children[id], function(id2) {
                    return new InterfaceNode(nodeMap[id2]);
                });
                if (children.length) {
                    node.children = children;
                }
                return node;
            });
            return result;
        }
    });
});
