define(['backbone', 'tools/logger', 'tools/auth', 'icanhaz', 'view/loader', 'text!template/root.ich',
    'view/homepage', 'view/grid/incomes', 'view/grid/outcomes', 'view/chart/monthly_balance', 'view/chart/category_total', 'datatables'],
function(Backbone, logger, Auth, ich, loader, template,
    HomepageView, IncomesView, OutcomesView, MonthlyBalanceChartView, CategoryTotalChartView) {

    'use strict';

    return Backbone.View.extend({

        events: {
            'click #menu_homepage': 'openHomepage',
            'click #menu_income_list': 'openIncomes',
            'click #menu_outcome_list': 'openOutcomes',
            'click #menu_monthly_balance': 'openMonthlyBalance',
            'click #menu_category_total': 'openCategoryTotal',
            'click #logout': 'logout'
        },

        openHomepage: function() {
            var homepageView = new HomepageView();
            homepageView.setElement(this.$('.container#main'));
            homepageView.render();
        },

        openIncomes: function() {
            var incomesView = new IncomesView();
            incomesView.render();
        },

        openOutcomes: function() {
            var outcomesView = new OutcomesView();
            outcomesView.render();
/*
            $('#outcomes').dataTable({
                "bServerSide": true,
                'sPaginationType': 'bootstrap',
                "sAjaxSource": '../php/client/json.php?type=outcomes'
            });
*/
        },

        openMonthlyBalance: function() {
            var chartView = new MonthlyBalanceChartView();
            chartView.render();
        },

        openCategoryTotal: function() {
            var chartView = new CategoryTotalChartView();
            chartView.render();
        },

        logout: function() {
            Auth.logout();
            this.trigger('logout');
        },

        renderMainContainerTemplate: function (templateName, options) {
            if (typeof(options) === 'undefined') options = {};
            var html = ich[templateName](options);
            this.$('.container#main').html(html);
        },

        initialize: function(options) {
            loader.addTemplate(template);
            logger.init('root');
        },

        render: function() {
            logger.render('root');
            this.$el.html(ich.rootTemplate());
            this.$el.append(ich.modalsContainerTemplate());
            this.openHomepage();

            // popover-ize all info buttons
            // FIXME: this.$el instead of global selector
            $('a.btn-info').popover({
                'placement': 'bottom'
            });

            return this;
        }
    });
});
