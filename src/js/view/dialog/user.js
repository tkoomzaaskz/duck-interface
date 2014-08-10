define(['backbone', 'icanhaz', 'tools/logger', 'tools/constants', 'tools/loader',
    'text!template/chooseUsers.ich', 'text!template/userCheckbox.ich', 'text!template/errorTemplate.ich'],
function(Backbone, ich, logger, Constants, Loader,
    template, templateCheckbox, templateError) {

    'use strict';

    return Backbone.View.extend({

        initialize: function(options) {
            logger.view('user dialog');
            Loader.addTemplate(template);
            Loader.addTemplate(templateCheckbox);
            Loader.addTemplate(templateError);
            this.render();
        },

        render: function() {
            logger.render('user dialog');
            this.setElement(ich.chooseUsersTemplate());
            this.$('a.btn-info').popover({
                'placement': 'bottom'
            });
            this.bindBehaviors();
        },

        getChecked: function() {
            return this.$("input[name=user]:checked").map(function() {
                return this.value;
            });
        },

        bindBehaviors: function() {
            var self = this;
            var collection = this.options.users;

            // FIXME: show or shown?
            this.$el.on('show.bs.modal', function () {
                var content = collection.length == 0
                    ? ich.errorTemplate(Constants.ajaxError)
                    : ich.userCheckboxTemplate({ 'users': collection.models });
                self.$('.modal-body').html(content);
            });

            this.$('.btn-primary').bind('click', function() {
                self.options.users.setChosen(self.getChecked());
                self.$el.modal('hide');
            });
        }
    });
});
