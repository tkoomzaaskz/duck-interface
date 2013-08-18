requirejs.config({
//    enforceDefine: true, // jquery.validator is not defined
    baseUrl: 'js',
    paths: {
        jquery: '../vendor/js/jquery/jquery-1.8.3',
        jqueryValidate: '../vendor/js/jquery/jquery.validate',
        jstree: '../vendor/js/jstree/jquery.jstree',
        underscore: '../vendor/js/underscore',
        backbone: '../vendor/js/backbone',
        marionette: '../vendor/js/backbone.marionette',
        bootstrap: '../vendor/js/bootstrap/js/bootstrap',
        bootbox: '../vendor/js/bootstrap/bootbox',
        bootstrapModal: '../vendor/js/backbone.bootstrap-modal',
        icanhaz: '../vendor/js/icanhaz',
        text: '../vendor/js/text'
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
        jstree: {
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
        bootstrapModal: {
            deps: ['bootstrap', 'backbone']
        },
        text: {
        },
    }
});

define(['jquery', 'bootstrap', 'bootbox', 'bootstrapModal', 'icanhaz', 'application', 'config',
    'duck/user_control',
    'duck/category_control', 'duck/category_dialog',
    'duck/form_dialog', 'duck/main_control'],
function($, Bootstrap, Bootbox, BootstrapModal, ich, Application, Config,
    UserControl,
    CategoryControl, CategoryDialog,
    FormDialog, MainControl) {

    Application.start();
});
