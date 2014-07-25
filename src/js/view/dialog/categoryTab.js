define(['underscore', 'backbone', 'bootbox', 'tree', 'tools/logger', 'tools/constants', 'tools/loader',
    'text!template/chooseCategories.ich', 'text!template/errorTemplate.ich'],
function(_, Backbone, Bootbox, Tree, logger, Constants, Loader,
    template, templateError) {

    'use strict';

    // see more about jstree at http://luban.danse.us/jazzclub/javascripts/jquery/jsTree/reference/
    return Backbone.View.extend({

        initialize: function CategoryDialogTab(options) {
            this.categories = options.categories;
            this.selector = options.el;
        },

        render: function() {
            var tree = this.options.categories.getTree();
            var _self = this;

            if (tree == null) {
                $(this.selector).html(ich.errorTemplate(Constants.ajaxError));
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
        }
    });
});
