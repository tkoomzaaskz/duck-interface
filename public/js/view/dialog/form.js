define(['backbone', 'bootbox', 'tools/logger', 'tools/constants'],
function(Backbone, Bootbox, logger, constants) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',

        getSelector: function() {
            return '#' + this.type + 'FormDialog';
        },
        
        getFormInput: function(input) {
            return this.getSelector() + " #" + input;
        },
        
        getTemplate: function() {
            return 'formTemplate';
        },
        
        clearFormInputs: function() {
            $(this.getFormInput("amount")).val("");
            $(this.getFormInput("username")).val("");
            $(this.getFormInput("category_id")).val("");
            $(this.getFormInput("comment")).val("");    
        },
        
        clearFormLayout: function() {
            $(this.getSelector() + " label.error").hide();
            $(this.getSelector() + " .error").removeClass("error");
            $(this.getSelector() + " .success").removeClass("success");
        },
        
        getCapitalisedType: function() {
            return this.type.charAt(0).toUpperCase() + this.type.slice(1);
        },

        render: function() {
            // FIXME: remove global jquery selector
            $(this.getSelector()).html(ich[this.getTemplate()]({
                'currency': constants.currency,
                'users': this.users.getData(),
                'categories': this.categories.getData(),
                'type': this.type
            }));
        },

        initialize: function(options) {
            logger.render('form dialog');
            this.categories = options.categories;
            this.users = options.users;
            this.type = options.type;
            var _self = this;
    
            //this.render();

            // validate form
            $(this.getSelector() + ' form').validate({
                rules: {
                    amount: {
                        money: true
                    },
                    comment: {
                        required: false
                    }
                },
                highlight: function(element) {
                    $(element).closest('.control-group')
                    .removeClass('success').addClass('error');
                },
                success: function(element) {
                    element
                    .addClass('valid').closest('.control-group')
                    .removeClass('error').addClass('success');
                }
            });
        
            // clear input data each time the dialog is shown
            $(this.getSelector()).on('show', function () {
                _self.clearFormInputs();
                _self.clearFormLayout();
            });
        
            // make ajax call after form is validated
            $(this.getSelector() + ' form').on( "submit", function( event ) {
                var form = $(this);
                // form validates
                if (form.validate().checkForm()) {
                    $.ajax({
                        type: form.attr('method'),
                        url: "../php/client/json.php",
                        data: form.serialize(),
                        success: function(data, status) {
                            $(_self.getSelector()).modal('hide');
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
