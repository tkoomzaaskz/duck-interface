define([
    'underscore', 'marionette', 'bootbox', 'tools/logger', 'tools/constants',
    'text!templates/dialog/formTemplate.html', 'text!templates/select/user.html', 'text!templates/select/category.html'
], function(_, Marionette, Bootbox, logger, Constants,
    tpl, tplSelectUser, tplSelectCategory) {

    'use strict';

    return Marionette.View.extend({
        template: _.template(tpl),
        templateSelectUser: _.template(tplSelectUser),
        templateSelectCategory: _.template(tplSelectCategory),
        loggerName: 'form dialog',

        initialize: function(options) {
            logger.view(this.loggerName);
            this.options = options;
            this.render().bindBehaviors();
        },

        render: function() {
            logger.render(this.loggerName);
            this.setElement(this.template({
                currency: Constants.currency,
                users: this.options.users.toJSON(),
                categories: this.options.categories.toJSON(),
                type: this.options.type,
                templateSelectUser: this.templateSelectUser,
                templateSelectCategory: this.templateSelectCategory
            }));
            return this;
        },

        clearFormInputs: function() {
            this.$('#amount').val('');
            this.$('#username').val('');
            this.$('#category_id').val('');
            this.$('#comment').val('');
        },

        clearFormLayout: function() {
            this.$('label.error').hide();
            this.$('.error').removeClass("error");
            this.$('.success').removeClass("success");
        },

        bindBehaviors: function() {
            var self = this,
                mainElement = this.$el,
                formElement = this.$('form');

            // validate form
            formElement.validate({
                rules: {
                    amount: {
                        money: true
                    },
                    comment: {
                        required: false
                    }
                },
                highlight: function(element) {
                    $(element)
                        .closest('.control-group')
                        .removeClass('success').addClass('error');
                },
                success: function(element) {
                    element.addClass('valid')
                        .closest('.control-group')
                        .removeClass('error').addClass('success');
                }
            });

            // clear input data each time the dialog is shown
            mainElement.on('show', function () {
                self.clearFormInputs();
                self.clearFormLayout();
            });

            // make ajax call after form is validated
            formElement.on('submit', function( event ) {
                var form = $(this);
                // form validates
                if (form.validate().checkForm()) {
                    $.ajax({
                        type: form.attr('method'),
                        url: "I-dont-know", // FIXME: remove manual AJAX call and use backbone mechanisms
                        data: form.serialize(),
                        success: function(data, status) {
                            mainElement.modal('hide');
                            Bootbox.alert(_.capitalize(_.self.options.type) + " has been successfully added.");
                        }
                    });
                    // FIXME: provide fallback for ajax call above
                }
                event.preventDefault();
            });
        }
    });
});
