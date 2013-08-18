define(['icanhaz', 'duck/form_dialog', 'duck/user_control', 'duck/user_dialog', 'duck/category_dialog'],
function(ich, FormDialog, UserControl, UserDialog, CategoryDialog) {

    'use strict';

    var TemplateManager = {
        initAllTemplates: function() {
            this.renderTemplates();

            UserDialog.init();
            CategoryDialog.init();

            var IncomeFormDialog = new FormDialog(window.IncomeCategoryControl, UserControl, "income");
            IncomeFormDialog.init();

            var OutcomeFormDialog = new FormDialog(window.OutcomeCategoryControl, UserControl, "outcome");
            OutcomeFormDialog.init();
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
        }
    };

    return TemplateManager;
});
