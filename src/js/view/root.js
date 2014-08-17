define([
    'backbone', 'tools/logger', 'component/auth',
    'view/languages', 'view/homepage', 'view/grid/incomes', 'view/grid/outcomes',
    'view/chart/monthly_balance', 'view/chart/category_total',
    // pre-loaded only:
    'text!templates/root.html', 'text!templates/partials/error.html'
], function(Backbone, logger, Auth,
    LanguagesView, HomepageView, IncomesView, OutcomesView,
    MonthlyBalanceChartView, CategoryTotalChartView,
    tpl, tplError) {

    'use strict';

    return Backbone.View.extend({
        template: _.template(tpl),
        templateError: _.template(tplError), // FIXME: is this needed here?
        loggerName: 'root',

        events: {
            'click #menu_homepage': 'openHomepage',
            'click #menu_income_list': 'openIncomes',
            'click #menu_outcome_list': 'openOutcomes',
            'click #menu_monthly_balance': 'openMonthlyBalance',
            'click #menu_category_total': 'openCategoryTotal',
            'click #menu_logout': 'logout'
        },

        initialize: function(options) {
            logger.view(this.loggerName);
        },

        render: function() {
            logger.render(this.loggerName);
            this.$el.html(this.template());
//            var languagesView = new LanguagesView();
//            languagesView.setElement(this.$('.container#header')).render();
            this.openHomepage();
            return this;
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
        }
    });
});
