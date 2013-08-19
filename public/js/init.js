(function(require){

    var vendorDir = '../vendor/js/';
    var bowerDir = '../vendor-bower/';
    
    requirejs.config({
    //    enforceDefine: true, // jquery.validator is not defined
        baseUrl: 'js',
        paths: {
            jquery: bowerDir + 'jquery/jquery',
            jqueryValidate: vendorDir + 'jquery/jquery.validate',
            jstree: vendorDir + 'jstree/jquery.jstree',
            underscore: bowerDir + 'underscore/underscore',
            backbone: bowerDir + 'backbone/backbone',
            marionette: bowerDir + 'backbone.marionette/lib/backbone.marionette',
            bootstrap: bowerDir + 'bootstrap/docs/assets/js/bootstrap',
            bootbox: bowerDir + 'bootbox/bootbox',
            bootstrapModal: bowerDir + 'backbone.bootstrap-modal/src/backbone.bootstrap-modal',
            icanhaz: bowerDir + 'icanhazjs/ICanHaz',
            datatables: bowerDir + 'datatables/media/js/jquery.dataTables',
            text: bowerDir + 'requirejs-text/text'
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
            datatables: {
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
