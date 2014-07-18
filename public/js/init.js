(function(require){

    var vendorDir = '../vendor/';
    var staticDir = vendorDir + 'static/';

    requirejs.config({
    //    enforceDefine: true, // jquery.validator is not defined
        baseUrl: 'js',
        paths: {
            jquery: vendorDir + 'jquery/jquery',
            jqueryValidate: vendorDir + 'jquery.validation/jquery.validate',
            jstree: vendorDir + 'jstree/jquery.jstree',
            underscore: vendorDir + 'underscore/underscore',
            backbone: vendorDir + 'backbone/backbone',
            marionette: vendorDir + 'backbone.marionette/lib/backbone.marionette',
            bootstrap: vendorDir + 'bootstrap/docs/assets/js/bootstrap',
            bootbox: vendorDir + 'bootbox/bootbox',
            bootstrapModal: vendorDir + 'backbone.bootstrap-modal/src/backbone.bootstrap-modal',
            icanhaz: vendorDir + 'icanhazjs/ICanHaz',
            datatables: vendorDir + 'datatables/media/js/jquery.dataTables',
            text: vendorDir + 'requirejs-text/text',
//            sinon: vendorDir + 'sinon/lib/sinon',
//            sinonFakeXmlHttpRequest: vendorDir + 'sinon/lib/sinon/util/fake_xml_http_request',
//            sinonFakeServer: vendorDir + 'sinon/lib/sinon/util/fake_server',
            sinon: staticDir + 'sinon',
            tree: vendorDir + 'tree/src/tree'
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
            tree: {
                exports: 'Tree'
            }
        }
    });
    
    define(['application', 'tools/fake'],
    function(Application, Fake) {
        Fake.init();
        Application.start();
    });
}(require));
