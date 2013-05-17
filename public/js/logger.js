define(['config'],
function(config) {

    'use strict';

    return {
        log: function() {
            if (config.logging_enabled) {
                var args = Array.prototype.slice.call(arguments);
                var date = new Date();
                args.unshift(date.toTimeString());
                console.log.apply(console, args);
            }
        }
    };
});
