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
        engine: {
            path: 'js/template/',
            templates: ['categoryTotal', 'chooseUsers', 'formTemplate', 'homepage', 'modalsContainer', 'outcomeList', 'userCheckbox', 'categorySelect', 'chooseCategories', 'errorTemplate', 'incomeList', 'monthlyBalance', 'root', 'userSelect'],
            fetchTemplate: function(path) {
                $.ajax({
                    type: 'GET',
                    dataType: 'text',
                    async: false,
                    url: path
                }).done(function(response) {
                    $('body').append(response);
                });
            },
            fetchAllTemplates: function() {
                var index;
                for (index = 0; index < this.templates.length; ++index) {
                    this.fetchTemplate(this.path + this.templates[index] + '.ich');
                }
                ich.grabTemplates();
            }
        }
    };

    return TemplateManager;
});
