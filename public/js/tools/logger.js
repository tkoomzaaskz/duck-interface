define(['config'],
function(config) {

    'use strict';

    return {
        log: function() {
            if (config.logging_enabled) {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(new Date().toTimeString());
                console.log.apply(console, args);
            }
        },

        event: function() {
            var args = Array.prototype.slice.call(arguments);
            args.unshift("EVENT");
            this.log.apply(this, args);
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
        }
    };
});
