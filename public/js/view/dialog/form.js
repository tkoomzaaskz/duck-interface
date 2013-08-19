define(['backbone', 'bootbox', 'duck/main_control', 'tools/logger'],
function(Backbone, Bootbox, MainControl, logger) {

    'use strict';

    return Backbone.View.extend({

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
        
        initialize: function(options) {
            logger.render('form dialog');
            this.categoryControl = options.categoryControl;
            this.userControl = options.userControl;
            this.type = options.type;
            var _self = this;
    
            // render templates
            $(this.getSelector()).html(ich[this.getTemplate()]({
                'currency': MainControl.getCurrency(),
                'users': this.userControl.getData(),
                'categories': this.categoryControl.getData(),
                'type': this.type
            }));
        
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
                            bootbox.alert(_self.getCapitalisedType() + " has been successfully added.");
                        }
                    });
                }
                event.preventDefault();
            });
        }
    });
});
