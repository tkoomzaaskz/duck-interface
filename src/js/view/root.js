define([
    'backbone', 'tools/logger', 'component/auth',
    'view/languages', 'view/homepage',
    // pre-loaded only:
    'text!templates/root.html', 'text!templates/partials/error.html'
], function(Backbone, logger, Auth,
    LanguagesView, HomepageView,
    tpl, tplError) {

    'use strict';

    return Backbone.View.extend({
        template: _.template(tpl),
        templateError: _.template(tplError), // FIXME: is this needed here?
        loggerName: 'root',

        events: {
            'click #menu_logout': 'logout'
        },

        initialize: function(options) {
            logger.view(this.loggerName);
        },

        render: function() {
            logger.render(this.loggerName);
            this.$el.html(this.template());
//            var languagesView = new LanguagesView();
//            languagesView.setElement(this.$('.container#header')).render();
            return this;
        },

        openHomepage: function() {
            var homepageView = new HomepageView();
            homepageView.setElement(this.$('.container#main'));
            homepageView.render();
        },

        logout: function() {
            Auth.logout();
            this.trigger('logout');
        }
    });
});
