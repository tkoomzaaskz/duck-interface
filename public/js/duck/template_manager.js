define(['icanhaz', 'duck/form_dialog', 'duck/user_dialog', 'duck/category_dialog'],
function(ich, FormDialog, UserDialog, CategoryDialog) {

    'use strict';

    var TemplateManager = {
        initAllTemplates: function() {
            this.renderTemplates();
            UserDialog.init();
            CategoryDialog.init();
            window.IncomeFormDialog.init();
            window.OutcomeFormDialog.init();
            this.bindMenuOptions();
        },
        getMainContainerSelector: function () {
            return '.container#main';
        },
        renderMainContainerTemplate: function (template, options) {
            if (typeof(options) === 'undefined') options = {};
            var html = ich[template](options);
            $(this.getMainContainerSelector()).html(html);
        },
        getRenderedError: function(type) {
            return ich.errorTemplate({
                'type': type,
                'message': 'could not load data from server'
            })
        },
        renderTemplates: function() {
            $('body').html(ich.rootTemplate());
    
            // init main container body
            $(this.getMainContainerSelector()).html(ich.homepageTemplate());
    
            // append modal containers
            $('body').append(ich.modalsContainerTemplate());
    
            // bootstrap menu: dropdown
            $('.dropdown-toggle').dropdown();
    
            // popover-ize all info buttons
            $('a.btn-info').popover({
                'placement': 'bottom'
            });
        },
        bindMenuOptions: function () {
            $('#menu_homepage').bind('click', $.proxy(function(){
                this.renderMainContainerTemplate('homepageTemplate');
            }, TemplateManager));
    
            $('#menu_outcome_list').bind('click', $.proxy(function(){
                this.renderMainContainerTemplate('outcomeListTemplate');
                $('#outcomes').dataTable({
                    "bServerSide": true,
                    'sPaginationType': 'bootstrap',
                    "sAjaxSource": '../php/client/json.php?type=outcomes'
                });
            }, TemplateManager));
    
            $('#menu_income_list').bind('click', $.proxy(function(){
                this.renderMainContainerTemplate('incomeListTemplate');
            }, TemplateManager));
    
            $('#menu_monthly_balance').bind('click', $.proxy(function(){
                this.renderMainContainerTemplate('monthlyBalanceTemplate');
            }, TemplateManager));
    
            $('#menu_category_total').bind('click', $.proxy(function(){
                this.renderMainContainerTemplate('categoryTotalTemplate');
            }, TemplateManager));
        }
    };

    return TemplateManager;

});
