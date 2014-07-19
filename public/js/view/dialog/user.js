define(['backbone', 'icanhaz', 'tools/logger', 'tools/constants'],
function(Backbone, ich, logger, constants) {

    'use strict';

    return Backbone.View.extend({
        tagName: 'div',
        el: '#chooseUsersDialog',
        selector: '#chooseUsersDialog',

        initialize: function(options) {
            logger.render('user dialog');
            this.options = options;
            this.render();
            this.bindBehaviors();
        },

        render: function() {
            this.$el.html(ich.chooseUsersTemplate());
        },

        bindBehaviors: function() {
            var _self = this;
            var user_data = this.options.users.getData();

            $(this.selector).on('show', function () {
                if (user_data == null) {
                    $(_self.selector + ' .modal-body').html(ich.errorTemplate(constants.ajaxError));
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
                _self.options.users.setChosen(chosen);
                $(_self.selector).modal('hide');
            });
        }
    });
});
