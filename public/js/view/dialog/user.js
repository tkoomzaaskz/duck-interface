define(['backbone', 'duck/user_control', 'icanhaz'],
function(Backbone, UserControl, ich) {

    'use strict';

    return Backbone.View.extend({
        el: '#chooseUsersDialog',
        selector: '#chooseUsersDialog',
        initialize: function() {
            $(this.selector).html(ich.chooseUsersTemplate());
            
            var _self = this;
            var users = UserControl.getData();
    
            $(this.selector).on('show', function () {
                if (users == null) {
                    $(_self.selector + ' .modal-body').html(ich.errorTemplate({
                        'type': 'AJAX',
                        'message': 'could not load data from server'
                    }));
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
    });
});
