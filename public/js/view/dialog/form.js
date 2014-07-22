define(['underscore', 'backbone', 'bootbox', 'tools/logger', 'tools/constants'],
function(_, Backbone, Bootbox, logger, constants) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',

        initialize: function(options) {
            logger.render('form dialog');
            this.options = options;
            this.selector = '#' + this.options.type + 'FormDialog';
            this.setElement(this.selector);
    
            this.render();
            this.bindBehaviors();
        },

        render: function() {
            this.$el.html(ich['formTemplate']({
                'currency': constants.currency,
                'users': this.options.users.getData(),
                'categories': this.options.categories.getData(),
                'type': this.options.type
            }));
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
            var
                _self = this,
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
                _self.clearFormInputs();
                _self.clearFormLayout();
            });

            // make ajax call after form is validated
            formElement.on('submit', function( event ) {
                var form = $(this);
                // form validates
                if (form.validate().checkForm()) {
                    $.ajax({
                        type: form.attr('method'),
                        url: "../php/client/json.php",
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
