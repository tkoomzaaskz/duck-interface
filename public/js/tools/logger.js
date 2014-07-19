define(['underscore', 'config'],
function(_, config) {

    'use strict';

    return {
        log: function() {
            if (config.logging_enabled) {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(new Date().toTimeString());
                console.log.apply(console, args);
            }
        },

        error: function() {
            if (config.logging_enabled) {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(new Date().toTimeString());
                console.error.apply(console, args);
            }
        },

        event: function() {
            var args = Array.prototype.slice.call(arguments);
            if (_.indexOf(config.logged_events, args[0][0]) > -1) {
                args.unshift("EVENT");
                this.log.apply(this, args);
            }
        },

        render: function() {
            var args = Array.prototype.slice.call(arguments);
            args.unshift("RENDER");
            this.log.apply(this, args);
        },

        init: function() {
            var args = Array.prototype.slice.call(arguments);
            args.unshift("INIT");
            this.log.apply(this, args);
        },

        model: function() {
            var args = Array.prototype.slice.call(arguments);
            args.unshift("MODEL");
            this.log.apply(this, args);
        },

        collection: function() {
            var args = Array.prototype.slice.call(arguments);
            args.unshift("COLLECTION");
            this.log.apply(this, args);
        }
    };
});
