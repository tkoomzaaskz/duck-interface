requirejs.config({
    enforceDefine: true,
    baseUrl: 'js',
    paths: {
        jquery: '../vendor/js/jquery/jquery-1.8.3',
        jquery_validate: '../vendor/js/jquery/jquery.validate',
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
        'duck/template_engine', 'duck/template_manager',
        'duck/user_control', 'duck/user_dialog',
        'duck/category_control', 'duck/category_dialog',
        'duck/form_dialog', 'duck/main_control', 'duck/main'],
function($, Bootstrap, Bootbox, ich, Application, Config,
        TemplateEngine, TemplateManager,
        UserControl, UserDialog,
        CategoryControl, CategoryDialog,
        FormDialog, MainControl, Main) {

    window.url = Config.urlRoot;

    //Application.start();
});
