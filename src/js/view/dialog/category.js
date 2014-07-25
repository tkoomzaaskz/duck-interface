define(['underscore', 'backbone', 'bootbox', 'tree', 'tools/logger', 'tools/loader',
    'view/dialog/categoryTab', 'text!template/chooseCategories.ich'],
function(_, Backbone, Bootbox, Tree, logger, Loader,
    CategoryTab, template) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',
        el: "#chooseCategoriesDialog",

        initialize: function(options) {
            logger.view('category dialog');
            Loader.addTemplate(template);
            this.incomeTab = new CategoryTab({
                el: '#incomeCategoryTree',
                categories: options.incomeCategories
            });
            this.outcomeTab = new CategoryTab({
                el: '#outcomeCategoryTree',
                categories: options.outcomeCategories
            });
debugger;
            var _self = this;
            this.$el.on('shown', function () {
                _self.render();
                _self.incomeTab.render();
                _self.outcomeTab.render();
            });
        },

        render: function() {
            logger.render('category dialog');
debugger;
            this.$el.html(ich.chooseCategoriesTemplate());
            // FIXME: below doesn't seem to work
            this.$('a.btn-info').popover({
                'placement': 'bottom'
            });
            this.bindBehaviors();
        },

        bindBehaviors: function() {
            var _self = this;

debugger;
            this.$('a[data-toggle="tab"]').on('shown', function (e) {
debugger;
                e.target // activated tab
                e.relatedTarget // previous tab
            })


            this.$(".action-create").bind('click', function() {
                $("#" + _self.getActiveTab() + "CategoryTree").jstree("create", null, "last", {
                    data: "category-name"
                });
            });

            this.$(".action-rename").bind('click', function() {
                $("#" + _self.getActiveTab() + "CategoryTree").jstree("rename");
            });

            this.$(".action-delete").bind('click', function() {
                $("#" + _self.getActiveTab() + "CategoryTree").jstree("remove");
            });

            this.$("a").live("dblclick", function(evt) {
                $.jstree._reference(_self.getActiveTab() + 'CategoryTree').rename(evt.currentTarget);
            });

        },
        getActiveTab: function() {
            var tab = this.$(".tab-pane.active").attr("id");
            return tab.substring(0, tab.length - 3);
        }
    });
});
