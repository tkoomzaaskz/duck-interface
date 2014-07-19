define(['backbone', 'icanhaz', 'tools/logger'],
function(Backbone, ich, logger) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',
        el: '#chooseUsersDialog',
        selector: '#chooseUsersDialog',

        initialize: function(options) {
            logger.render('user dialog');
            this.options = options;
            $(this.selector).html(ich.chooseUsersTemplate());

            var _self = this;
            var user_data = this.options.users.getData();

            $(this.selector).on('show', function () {
                if (user_data == null) {
                    $(_self.selector + ' .modal-body').html(ich.errorTemplate({
                        'type': 'AJAX',
                        'message': 'could not load data from server'
                    }));
                } else {
                    $(_self.selector + ' .modal-body').html(ich.userCheckboxTemplate({
                        'users': user_data
                    }));
                }
            });
    
            $(this.selector + ' .btn-primary').bind('click', function() {
                var chosen = $("input[name=user]:checked").map(function() {
                    return this.value;
                });
                this.users.setChosen(chosen);
                $(_self.selector).modal('hide');
            });
        }
    });
});
