define([
], function() {

    'use strict';

    return {
        currency: 'zł',
        treeError: {
            'type': 'jsTree',
            'message': 'couldn\'t construct tree structure, probably empty'
        },
        ajaxError: {
            'type': 'AJAX',
            'message': 'could not load data from server'
        }
    };
});
