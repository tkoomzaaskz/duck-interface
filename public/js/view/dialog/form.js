define(['backbone', 'bootbox', 'tools/logger', 'tools/constants'],
function(Backbone, Bootbox, logger, constants) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',

        initialize: function(options) {
            logger.render('form dialog');
            this.categories = options.categories;
            this.users = options.users;
            this.type = options.type;
            this.selector = '#' + this.type + 'FormDialog';
            this.setElement(this.selector);
    
            this.render();
            this.bindBehaviors();
        },

        render: function() {
            // FIXME: remove global jquery selector
            $(this.selector).html(ich['formTemplate']({
                'currency': constants.currency,
                'users': this.users.getData(),
                'categories': this.categories.getData(),
                'type': this.type
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

        getCapitalisedType: function() {
            return this.type.charAt(0).toUpperCase() + this.type.slice(1);
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
                            Bootbox.alert(_self.getCapitalisedType() + " has been successfully added.");
                        }
                    });
                    // FIXME: provide fallback for ajax call above
                }
                event.preventDefault();
            });
        }
    });
});
