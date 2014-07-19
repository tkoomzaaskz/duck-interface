define(['backbone', 'tools/logger', 'icanhaz', 'view/loader', 'text!template/root.ich',
    'view/users', 'datatables'],
function(Backbone, logger, ich, loader, template,
    UsersView) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'body',

        events: {
            'click #menu_homepage': 'openHomepage',
            'click #menu_income_list': 'openIncomeList',
            'click #menu_outcome_list': 'openOutcomeList',
            'click #menu_monthly_balance': 'openMonthlyBalance',
            'click #menu_category_total': 'openCategoryTotal'
        },

        openHomepage: function() {
            this.renderMainContainerTemplate('homepageTemplate');
        },

        openIncomeList: function() {
            this.renderMainContainerTemplate('incomeListTemplate');
        },

        openOutcomeList: function() {
            this.renderMainContainerTemplate('outcomeListTemplate');
            $('#outcomes').dataTable({
                "bServerSide": true,
                'sPaginationType': 'bootstrap',
                "sAjaxSource": '../php/client/json.php?type=outcomes'
            });
        },

        openMonthlyBalance: function() {
            this.renderMainContainerTemplate('monthlyBalanceTemplate');
        },

        openCategoryTotal: function() {
            this.renderMainContainerTemplate('categoryTotalTemplate');
        },

        renderMainContainerTemplate: function (template, options) {
            if (typeof(options) === 'undefined') options = {};
            var html = ich[template](options);
            this.$el.find('.container#main').html(html);
        },

        initialize: function(options) {
            logger.init('root');
            // temporarily switched off since old interface loads templates anyway
            //loader.loadTemplate(template);
            this.usersView = new UsersView();
        },

        render: function() {
            logger.render('root');
            this.$el.html(ich.rootTemplate());
            // this.usersView.setElement(this.$el.find('#main')).render();
            this.openHomepage();

            // bootstrap menu: dropdown
            $('.dropdown-toggle').dropdown();

            // popover-ize all info buttons
            $('a.btn-info').popover({
                'placement': 'bottom'
            });

            return this;
        }
    });
});
