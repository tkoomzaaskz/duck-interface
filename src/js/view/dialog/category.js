define(['underscore', 'backbone', 'bootbox', 'tree', 'tools/logger', 'tools/loader',
    'view/dialog/categoryTab', 'text!template/chooseCategories.ich'],
function(_, Backbone, Bootbox, Tree, logger, Loader,
    CategoryTab, template) {

    'use strict';

    return Backbone.View.extend({

        initialize: function(options) {
            logger.view('category dialog');
            Loader.addTemplate(template);
            this.incomeTab = new CategoryTab({
                categories: options.incomeCategories
            });
            this.outcomeTab = new CategoryTab({
                categories: options.outcomeCategories
            });
            this.render();
        },

        render: function() {
            logger.render('category dialog');
            this.setElement(ich.chooseCategoriesTemplate());
            this.incomeTab.setElement(this.$('#incomeCategoryTree')).render();
            this.outcomeTab.setElement(this.$('#outcomeCategoryTree')).render();

            this.$('a.btn-info').popover({
                'placement': 'bottom'
            });
            this.bindBehaviors();
        },

        bindBehaviors: function() {
            var _self = this;
            this.$('a[data-toggle="tab"]').on('shown.bs.modal', function (e) {
                debugger;
                e.target // activated tab
                e.relatedTarget // previous tab
            })

            this.$(".action-create").bind('click', function() {
                _self.getActiveTree().jstree("create", null, "last", {
                    data: "category-name"
                });
            });

            this.$(".action-rename").bind('click', function() {
                _self.getActiveTree().jstree("rename");
            });

            this.$(".action-delete").bind('click', function() {
                _self.getActiveTree().jstree("remove");
            });

            this.$("a").live("dblclick", function(e) {
                _self.$.jstree._reference(_self.getActiveId()).rename(e.currentTarget);
            });
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
