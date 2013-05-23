requirejs.config({
//    enforceDefine: true,
    baseUrl: 'js',
    paths: {
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone',
        bootstrap: '//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min',
        icanhaz: '//cdnjs.cloudflare.com/ajax/libs/ICanHaz.js/0.10/ICanHaz.min'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: '$.fn.popover'
        },
        icanhaz: {
            deps: ['jquery'],
            exports: 'ich'
        }
    }
});

define(['app'],
function(app) {
    app.start();
});
