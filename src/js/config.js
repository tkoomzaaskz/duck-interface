define([
], function() {

    'use strict';

    return {
        urlRoot: 'http://duck-api', // without trailing slash
        useFakeServer: true,
        fakeServerDelay: 1500,
        logging_enabled: true,
        logged_events: ['change', 'sync']
    };
});
