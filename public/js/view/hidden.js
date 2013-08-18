define(['backbone', 'tools/logger', 'icanhaz'],
function(Backbone, logger, ich) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',

        initialize: function(options) {
            logger.init('hidden');
        },

        render: function() {
            logger.render('hidden');
            this.engine.fetchAllTemplates();
            //this.$el.append("this is appendd template");
            return this;
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
    });
});
