define(['underscore', 'backbone', 'bootbox', 'tree', 'tools/logger', 'tools/constants'],
function(_, Backbone, Bootbox, Tree, logger, constants) {

    'use strict';

    function InterfaceNode(node) {
        this.data = {title: node.name};
        this.attr = {id: node.id};
    }

    InterfaceNode.prototype = {
        state: undefined
    };

    // see more about jstree at http://luban.danse.us/jazzclub/javascripts/jquery/jsTree/reference/

    // FIXME: CategoryDialogTab should become a bb view
    function CategoryDialogTab(categories, selector) {
        this.categories = categories;
        this.selector = selector;
    }

    CategoryDialogTab.prototype.getTree = function() {
        var categories = this.categories.getData();
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

        var nodeMap = {};
        _.each(categories, function(node) {
            nodeMap[node.id] = node;
            if (node.parent_id === undefined) node.parent_id = null; // remove when python API returns proper parent_id value
        });

        var tree = new Tree();
        _.each(categories, function(node) {
            if (node.parent_id === null) {
                tree.push(node.id);
            } else {
                tree.children[node.parent_id].push(node.id);
            }
        });

        var node, result = _.map(tree, function(id){
            node = new InterfaceNode(nodeMap[id]);
            node.children = _.map(tree.children[id], function(id2) {
                return new InterfaceNode(nodeMap[id2]);
            });
            return node;
        });
        return result;
    };
    
    CategoryDialogTab.prototype.render = function() {
        var tree = this.getTree();
        var _self = this;
    
        if (tree == null) {
            $(this.selector).html(ich.errorTemplate(constants.ajaxError));
        } else {
            $(this.selector).jstree({
                "json_data" : {
                    "data" : tree,
                    "progressive_render" : true
                },
                "plugins" : [ "themes", "json_data", "dnd", "crrm", "ui" ]
            })
            .bind("open_node.jstree close_node.jstree", function (event, data) {
                var state = event.type == "open_node" ? "open" : "closed";
                _self.categories.setState(data.rslt.obj.attr("id"), state);
            })
            .bind("move_node.jstree", function (event, data) {
                var id = data.rslt.o.attr("id");
                var parent_id = data.rslt.np.attr("id");
                // data.rslt.op.attr("id") - old parent
                // data.rslt.np.attr("id") - new parent
                // data.rslt.cp - current posision
                logger.log("jstree-test-log", id, parent_id, event, data);
            })
            .bind("rename_node.jstree", function (event, data) {
                var id = data.rslt.obj.attr("id");
                var new_name = data.rslt.name;
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "../php/client/json.php",
                    data: {
                        action: "renameNode",
                        id: id,
                        new_name: new_name
                    }
                }).done(function(response) {
                    _self.categories.renameNode(id, new_name);
                }).fail(function(response) {
                    Bootbox.alert("rename node failed.");
                });
            })
            .bind("create_node.jstree", function (event, data) {
                var parent_id = data.rslt.parent;
                if (parent_id == -1) { parent_id = null }
                var name = "some-name";
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "../php/client/json.php",
                    data: {
                        action: "createNode",
                        parent_id: parent_id,
                        name: name,
                        type: _self.categories.options.type
                    }
                }).done(function(response) {
                    new_id = response;
                    // update tree component
                    data.rslt.obj.attr("id", new_id);
                    _self.categories.addNode(new_id, "some name", parent_id);
                }).fail(function(response) {
                    Bootbox.alert("create node failed.");
                });
            })
            .bind("delete_node.jstree", function (event, data) {
                logger.log("jstree-test-log", event, data);
            });
        }
    };
    
    return Backbone.View.extend({
        tagName: 'div',
        el: "#chooseCategoriesDialog",
        selector: "#chooseCategoriesDialog",
        // FIXME: remove selector ?

        getActiveTab: function() {
            var tab = $(this.selector + " .tab-pane.active").attr("id");
            return tab.substring(0, tab.length - 3);
        },

        render: function() {
            this.$el.html(ich.chooseCategoriesTemplate());
        },

        initialize: function(options) {
            logger.render('category dialog');
            this.incomeTab = new CategoryDialogTab(options.incomeCategories, "#incomeCategoryTree");
            this.outcomeTab = new CategoryDialogTab(options.outcomeCategories, "#outcomeCategoryTree");
    
            var _self = this;
            $(this.selector).on('show', function () {
                _self.render();
                _self.incomeTab.render();
                _self.outcomeTab.render();
            });
    
            $(this.selector + " .action-create").bind('click', function() {
                $("#" + _self.getActiveTab() + "CategoryTree").jstree("create", null, "last", {
                    data: "category-name"
                });
            });
    
            $(this.selector + " .action-rename").bind('click', function() {
                $("#" + _self.getActiveTab() + "CategoryTree").jstree("rename");
            });
    
            $(this.selector + " .action-delete").bind('click', function() {
                $("#" + _self.getActiveTab() + "CategoryTree").jstree("remove");
            });
    
            $(this.selector + " a").live("dblclick", function(evt) {
                $.jstree._reference(_self.getActiveTab() + 'CategoryTree').rename(evt.currentTarget);
            });
        }
    });
});
