requirejs.config({
//    enforceDefine: true, // jquery.validator is not defined
    baseUrl: 'js',
    paths: {
        jquery: '../vendor/js/jquery/jquery-1.8.3',
        jqueryValidate: '../vendor/js/jquery/jquery.validate',
        underscore: '../vendor/js/underscore',
        backbone: '../vendor/js/backbone',
        marionette: '//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/1.0.1-bundled/backbone.marionette',
        bootstrap: '../vendor/js/bootstrap/js/bootstrap',
        bootbox: '../vendor/js/bootstrap/bootbox',
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
        jqueryValidate: {
            deps: ['jquery']
        },
        icanhaz: {
          deps: ['jquery'],
          exports: 'ich'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: '$.fn.popover'
        },
        bootbox: {
            deps: ['bootstrap'],
            exports: 'bootbox'
        },
        text: {
        },
    }
});

define(['jquery', 'bootstrap', 'bootbox', 'icanhaz', 'application', 'config',
    'duck/user_control', 'duck/user_dialog',
    'duck/category_control', 'duck/category_dialog',
    'duck/form_dialog', 'duck/main_control'],
function($, Bootstrap, Bootbox, ich, Application, Config,
    UserControl, UserDialog,
    CategoryControl, CategoryDialog,
    FormDialog, MainControl) {

    Application.start();
});
