(function(require){

    var vendorDir = '../vendor/js/';
    
    requirejs.config({
    //    enforceDefine: true, // jquery.validator is not defined
        baseUrl: 'js',
        paths: {
            jquery: vendorDir + 'jquery/jquery-1.8.3',
            jqueryValidate: vendorDir + 'jquery/jquery.validate',
            jstree: vendorDir + 'jstree/jquery.jstree',
            underscore: vendorDir + 'underscore',
            backbone: vendorDir + 'backbone',
            marionette: vendorDir + 'backbone.marionette',
            bootstrap: vendorDir + 'bootstrap/js/bootstrap',
            bootbox: vendorDir + 'bootstrap/bootbox',
            bootstrapModal: vendorDir + 'backbone.bootstrap-modal',
            icanhaz: vendorDir + 'icanhaz',
            text: vendorDir + 'text'
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
    
    define(['application'],
    function(Application) {
        Application.start();
    });
}(require));
