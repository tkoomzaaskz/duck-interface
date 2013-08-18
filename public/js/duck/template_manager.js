define(['icanhaz', 'duck/form_dialog', 'duck/user_control', 'duck/category_dialog'],
function(ich, FormDialog, UserControl, CategoryDialog) {

    'use strict';

    var TemplateManager = {
        initAllTemplates: function() {
            // append modal containers
            $('body').append(ich.modalsContainerTemplate());

            // bootstrap menu: dropdown
            $('.dropdown-toggle').dropdown();

            // popover-ize all info buttons
            $('a.btn-info').popover({
                'placement': 'bottom'
            });

            CategoryDialog.init();

            var IncomeFormDialog = new FormDialog(window.IncomeCategoryControl, UserControl, "income");
            IncomeFormDialog.init();

            var OutcomeFormDialog = new FormDialog(window.OutcomeCategoryControl, UserControl, "outcome");
            OutcomeFormDialog.init();
        },
        renderMainContainerTemplate: function (template, options) {
            if (typeof(options) === 'undefined') options = {};
            var html = ich[template](options);
            $('.container#main').html(html);
        },
        getRenderedError: function(type) {
            return ich.errorTemplate({
                'type': type,
                'message': 'could not load data from server'
            })
        }
    };

    return TemplateManager;
});
