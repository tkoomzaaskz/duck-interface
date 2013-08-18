define(['icanhaz', 'duck/form_dialog', 'duck/user_control'],
function(ich, FormDialog, UserControl) {

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

            var IncomeFormDialog = new FormDialog(window.IncomeCategoryControl, UserControl, "income");
            IncomeFormDialog.init();

            var OutcomeFormDialog = new FormDialog(window.OutcomeCategoryControl, UserControl, "outcome");
            OutcomeFormDialog.init();
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
