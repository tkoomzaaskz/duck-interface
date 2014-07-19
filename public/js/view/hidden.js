define(['backbone', 'tools/logger', 'icanhaz'],
function(Backbone, logger, ich) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',

        initialize: function(options) {
            logger.init('hidden');
            this.engine.fetchAllTemplates();
        },

        render: function() {
            logger.render('hidden');
            this.$el.append(ich.modalsContainerTemplate());
            return this;
        },

        engine: {
            templates: ['categoryTotal', 'chooseUsers', 'formTemplate', 'homepage', 'modalsContainer', 'outcomeList', 'userCheckbox', 'categorySelect', 'chooseCategories', 'errorTemplate', 'incomeList', 'monthlyBalance', 'root', 'userSelect'],
            fetchTemplate: function(path) {
                $.ajax({
                    type: 'GET',
                    dataType: 'text',
                    async: false,
                    url: path
                }).done(function(response) {
                    $('body').append(response);
                }).fail(function(response) {
                    logger.log(response);
                    logger.error("Fetching templates failed, see response above");
                });
            },
            fetchAllTemplates: function() {
                var index;
                for (index = 0; index < this.templates.length; ++index) {
                    this.fetchTemplate('js/template/' + this.templates[index] + '.ich');
                }
                ich.refresh();
            }
        }
    });
});
