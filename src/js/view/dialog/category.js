define([
    'underscore', 'backbone', 'bootbox', 'tree', 'tools/logger', 'view/dialog/categoryTab',
    'text!templates/dialog/chooseCategories.html'
], function(_, Backbone, Bootbox, Tree, logger, CategoryTab, tpl) {

    'use strict';

    return Backbone.View.extend({
        template: _.template(tpl),
        loggerName: 'category dialog',

        initialize: function(options) {
            logger.view(this.loggerName);
            this.incomeTab = new CategoryTab({
                categories: options.incomeCategories
            });
            this.outcomeTab = new CategoryTab({
                categories: options.outcomeCategories
            });
            this.render();
        },

        render: function() {
            logger.render(this.loggerName);
            this.setElement(this.template());
            this.incomeTab.setElement(this.$('#incomeCategoryTree')).render();
            this.outcomeTab.setElement(this.$('#outcomeCategoryTree')).render();

            this.$('a.btn-info').popover({
                'placement': 'bottom'
            });
            this.bindBehaviors();
            return this;
        },

        bindBehaviors: function() {
            var self = this;
            this.$('a[data-toggle="tab"]').on('shown.bs.modal', function (e) {
                // debugger;
                e.target // activated tab
                e.relatedTarget // previous tab
            })

            this.$(".action-create").bind('click', function() {
                self.getActiveTree().jstree("create", null, "last", {
                    data: "category-name"
                });
            });

            this.$(".action-rename").bind('click', function() {
                self.getActiveTree().jstree("rename");
            });

            this.$(".action-delete").bind('click', function() {
                self.getActiveTree().jstree("remove");
            });
/*
            this.$("a").live("dblclick", function(e) {
                self.$.jstree._reference(self.getActiveId()).rename(e.currentTarget);
            });
*/
        },

        getActiveTab: function() {
            var tab = this.$(".tab-pane.active").attr("id");
            return tab.substring(0, tab.length - 3);
        },

        getActiveId: function() {
            return this.getActiveTab() + 'CategoryTree';
        },

        getActiveTree: function() {
            return this.$("#" + this.getActiveId());
        }
    });
});
