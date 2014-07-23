(function(require){
    requirejs.config({
        baseUrl: 'js/',
        paths: {
            jquery: '../vendor/jquery/jquery',
            jqueryCookie: '../vendor/jquery.cookie/jquery.cookie',
            jqueryValidate: '../vendor/jquery.validation/jquery.validate',
            datatables: '../vendor/datatables/media/js/jquery.dataTables',
            jstree: '../vendor/jstree/jquery.jstree',
            underscore: '../vendor/underscore/underscore',
            underscoreString: '../vendor/underscore.string/lib/underscore.string',
            backbone: '../vendor/backbone/backbone',
            marionette: '../vendor/backbone.marionette/lib/backbone.marionette',
            bootstrap: '../vendor/bootstrap/docs/assets/js/bootstrap',
            bootbox: '../vendor/bootbox/bootbox',
            bootstrapModal: '../vendor/backbone.bootstrap-modal/src/backbone.bootstrap-modal',
            tree: '../vendor/tree/src/tree',
            icanhaz: '../vendor/icanhazjs/ICanHaz',
            text: '../vendor/requirejs-text/text',
            // FIXME: try to load chart from bower package
            chartjs: '../vendor/static/Chart',
            // FIXME: try to load sinon from bower package
            sinon: '../vendor/static/sinon',

            // application structure
            chart: 'chart',
            collection: 'collection',
            model: 'model',
            template: 'template',
            tools: 'tools',
            view: 'view',

            application: 'application',
            config: 'config',
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
