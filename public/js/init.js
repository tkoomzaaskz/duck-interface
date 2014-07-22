(function(require){

    var vendorDir = '../vendor/';
    var staticDir = vendorDir + 'static/';

    requirejs.config({
    //    enforceDefine: true, // jquery.validator is not defined
        baseUrl: 'js',
        paths: {
            jquery: vendorDir + 'jquery/jquery',
            jqueryCookie: vendorDir + 'jquery.cookie/jquery.cookie',
            jqueryValidate: vendorDir + 'jquery.validation/jquery.validate',
            jstree: vendorDir + 'jstree/jquery.jstree',
            underscore: vendorDir + 'underscore/underscore',
            underscoreString: vendorDir + 'underscore.string/lib/underscore.string',
            backbone: vendorDir + 'backbone/backbone',
            marionette: vendorDir + 'backbone.marionette/lib/backbone.marionette',
            bootstrap: vendorDir + 'bootstrap/docs/assets/js/bootstrap',
            bootbox: vendorDir + 'bootbox/bootbox',
            bootstrapModal: vendorDir + 'backbone.bootstrap-modal/src/backbone.bootstrap-modal',
            icanhaz: vendorDir + 'icanhazjs/ICanHaz',
            datatables: vendorDir + 'datatables/media/js/jquery.dataTables',
            text: vendorDir + 'requirejs-text/text',
            // FIXME: try to load chart from bower package
            chartjs: staticDir + 'Chart',
            // FIXME: try to load sinon from bower package
            sinon: staticDir + 'sinon',
            tree: vendorDir + 'tree/src/tree'
        },
        shim: {
            jquery: {
                exports: '$'
            },
            jqueryCookie: {
                deps: ['jquery']
            },
            jqueryValidate: {
                deps: ['jquery']
            },

            underscore: {
                exports: '_'
            },
            underscoreString: {
                deps: ['underscore']
            },

            backbone: {
                deps: ['jquery', 'underscore'],
                exports: 'Backbone'
            },
            marionette: {
                deps: ['jquery', 'underscore', 'backbone'],
                exports: 'Marionette'
            },

            bootstrap: {
                deps: ['jquery'],
                exports: '$.fn.popover'
            },
            bootstrapModal: {
                deps: ['bootstrap', 'backbone']
            },
            bootbox: {
                deps: ['bootstrap'],
                exports: 'bootbox'
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
            text: {
            },
            tree: {
                exports: 'Tree'
            }
        }
    });

    define(['require', 'application',
        'underscore', 'underscoreString',
        'jquery', 'jqueryCookie', 'jqueryValidate'],
    function(require, Application, _) {
        _.mixin(_.str.exports());
        Application.start();
    });
}(require));
