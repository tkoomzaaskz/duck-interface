define([
    'backbone', 'model/category', 'config', 'tools/logger'
], function(Backbone, CategoryModel, config, logger) {

    'use strict';

    return Backbone.Collection.extend({

        url: function() {
            return config.urlRoot + '/' + this.options.type + "_category/";
        },

        model: CategoryModel,

        parse: function (response) {
            return response.objects;
        },

        comparator: function(a, b) {
            var a_p_undef = a.get('parentId') === null,
                b_p_undef = b.get('parentId') === null;
            if (a_p_undef === b_p_undef) return a.get('id') - b.get('id');
            if (a_p_undef && !b_p_undef) return -1;
            return 1;
        },

        initialize: function(models, options) {
            logger.collection('categories', 'created', this);
            this.options = options;
            this.data = null; // FIXME: 2 b removed
        },

        addNode: function(id, name, parentId) {
            if (parentId == -1) parentId = null;
            var node = {
                id: id,
                name: name,
                parentId: parentId
            };
            this.data.push(node);
        },

        renameNode: function(id, new_name) {
            var node = this.get(id);
            node.set('name', new_name);
        },

        setState: function(id, value) {
            var node = this.get(id);
            if (node) {
                node.set('state', value);
                return true;
            } else {
                return false;
            }
        },

        getJsTree: function() {
            if (!this.length)
                throw new Error('Tree is empty');

            var node, children, parentId,
                nodeMap = {},
                tree = new Tree();

            this.each(function(node) {
                parentId = node.get('parentId');
                nodeMap[node.id] = node;
                if (!parentId) {
                    tree.push(node.id);
                } else {
                    tree.children[parentId].push(node.id);
                }
            });

            return _.map(tree, function(id) {
                node = nodeMap[id].getJsTreeNode();
                children = _.map(tree.children[id], function(id2) {
                    return nodeMap[id2].getJsTreeNode();
                });
                if (children.length) {
                    node.children = children;
                }
                return node;
            });
        }
    });
});
