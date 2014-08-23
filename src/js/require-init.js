(function(require){

    requirejs.config({
        baseUrl: 'js/',
        paths: {
            text: '../vendor/requirejs-text/text',
            json: '../vendor/requirejs-plugins/src/json',
            jquery: '../vendor/jquery/dist/jquery',
            jqueryCookie: '../vendor/jquery.cookie/jquery.cookie',
            jqueryValidate: '../vendor/jquery.validation/jquery.validate',
            datatables: '../vendor/datatables/media/js/jquery.dataTables',
            jstree: '../vendor/jstree/jquery.jstree',
            underscore: '../vendor/underscore/underscore',
            underscoreString: '../vendor/underscore.string/lib/underscore.string',
            backbone: '../vendor/backbone/backbone',
            marionette: '../vendor/backbone.marionette/lib/backbone.marionette',
            bootstrap: '../vendor/bootstrap/dist/js/bootstrap',
            bootbox: '../vendor/bootbox/bootbox',
            bootstrapModal: '../vendor/backbone.bootstrap-modal/src/backbone.bootstrap-modal',
            tree: '../vendor/tree/src/tree',
            chartjs: '../vendor/chartjs/Chart',
            sinon: '../vendor/sinon/index',

            // application structure
            templates: '../templates',
            chart: 'chart',
            collection: 'collection',
            mock: 'mock',
            model: 'model',
            template: 'template',
            tools: 'tools',
            view: 'view'
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
            text: {
            },
            tree: {
                exports: 'Tree'
            }
        }
    });

    define([
        'application', 'underscore',
        // pre-loaded only:
        'underscoreString', 'jqueryCookie', 'jqueryValidate'
    ], function(Application, _) {
        _.mixin(_.str.exports());
        Application.start();
    });

}(require));
