requirejs.config({
    enforceDefine: true,
    baseUrl: 'js',
    paths: {
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone',
        marionette: '//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/1.0.1-bundled/backbone.marionette',
        bootstrap: '//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min',
        bootbox: '//bootboxjs.com/bootbox.js',
        icanhaz: '../vendor/js/icanhaz',
        text: '../vendor/js/text',
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        marionette: {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        },
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        icanhaz: {
          deps: ['jquery'],
          exports: 'ich'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: '$.fn.popover'
        },
        text: {
        },
    }
});

define(['application'],
function(Application) {
    Application.start();
});
