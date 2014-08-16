define([
    'backbone', 'tools/logger', 'tools/constants',
    'text!templates/dialog/chooseUsers.html', 'text!templates/dialog/userCheckbox.html', 'text!templates/partials/error.html'
], function(Backbone, logger, Constants, tpl, tplCheckbox, tplError) {

    'use strict';

    return Backbone.View.extend({
        template: _.template(tpl),
        templateCheckbox: _.template(tplCheckbox),
        templateError: _.template(tplError),
        loggerName: 'user dialog',

        initialize: function(options) {
            logger.view(this.loggerName);
            this.render();
        },

        render: function() {
            logger.render(this.loggerName);
            this.setElement(this.template());
            this.$('a.btn-info').popover({
                'placement': 'bottom'
            });
            this.bindBehaviors();
            return this;
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
                    ? self.templateError(Constants.ajaxError)
                    : self.templateCheckbox({
                        users: collection.toJSON()
                    });
                self.$('.modal-body').html(content);
            });

            this.$('.btn-primary').bind('click', function() {
                self.options.users.setChosen(self.getChecked());
                self.$el.modal('hide');
            });
        }
    });
});
