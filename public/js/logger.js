define([],
function() {

    'use strict';

    return {
        enabled: true,
        log: function() {
            if (this.enabled) {
                var args = Array.prototype.slice.call(arguments);
                var date = new Date();
                args.unshift(date.toTimeString());
                console.log.apply(console, args);
            }
        }
    };
});
