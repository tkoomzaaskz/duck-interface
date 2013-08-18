define(['duck/user_control', 'icanhaz'],
function(UserControl, ich) {

    'use strict';

    var UserDialog = {
        selector: '#chooseUsersDialog',
        init: function() {
            $(this.selector).html(ich.chooseUsersTemplate());
            
            var _self = this;
            var users = UserControl.getData();
    
            $(this.selector).on('show', function () {
                if (users == null) {
                    $(_self.selector + ' .modal-body').html(TemplateManager.getRenderedError('AJAX'));
                } else {
                    $(_self.selector + ' .modal-body').html(ich.userCheckboxTemplate({
                        'users': users
                    }));
                }
            });
    
            $(this.selector + ' .btn-primary').bind('click', function() {
                var chosen = $("input[name=user]:checked").map(function() {
                    return this.value;
                });
                UserControl.setChosen(chosen);
                $(_self.selector).modal('hide');
            });
        }
    }

    return UserDialog;

});
