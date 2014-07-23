define([],
function() {

    'use strict';

    return {
        urlRoot: 'http://duck-api', // without trailing slash
        useFakeServer: true,
        logging_enabled: true,
        logged_events: ['change', 'sync']
    };
});
