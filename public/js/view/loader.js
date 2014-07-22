define(['icanhaz', 'tools/logger'],
function(ich, logger) {

    'use strict';

    return {
        templates: ['chooseUsers', 'formTemplate', 'homepage', 'modalsContainer', 'outcomeList', 'userCheckbox', 'categorySelect', 'chooseCategories', 'errorTemplate', 'incomeList', 'userSelect'],

        addTemplate: function(tpl) {
            $(tpl).each(function() {
                if (this.outerHTML) {
                    ich.addTemplate(this.id, $(this).text());
                    logger.log('LOADED', this.id);
                }
            });
        },

        fetchAllTemplates: function() {
            for (var index = 0; index < this.templates.length; ++index) {
                var _self = this,
                    path = 'js/template/' + this.templates[index] + '.ich';
                $.ajax({
                    type: 'GET',
                    dataType: 'text',
                    async: false,
                    url: path
                }).done(function(response) {
                    _self.addTemplate(response);
                }).fail(function(response) {
                    logger.log(response);
                    logger.error("Fetching templates failed, see response above");
                });
            }
        }
    };
});
