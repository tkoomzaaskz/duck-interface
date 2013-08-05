(function() {
// http://www.nathandavison.com/posts/view/17/using-qunit-and-requirejs-to-build-modular-unit-tests
	require.config({
		baseUrl: '../public/js',
		shim : {
			'QUnit': {
				deps: ['jquery'],
				exports: 'QUnit',
				init: function() {
					QUnit.config.autoload = false;
					QUnit.config.autostart = false;
				}
			},
			'jquery-ui': {
				deps: ['jquery']
			},
			underscore: {
				exports : '_'
			},
			backbone: {
				deps: ['underscore', 'jquery'],
				exports: 'Backbone'
			},
			icanhaz: {
				deps: ['jquery'],
				exports: 'ich'
			},
		},
		paths : {
			'QUnit': '//cdnjs.cloudflare.com/ajax/libs/qunit/1.11.0/qunit',
			'jquery': 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery',
			'jquery-ui': '../../public/vendor/js/jquery-ui',
			'underscore': 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore',
			'backbone': 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone',
			'icanhaz': '../../public/vendor/js/icanhaz',
		}
	});

	require(
		['QUnit', '../../test/js/model/usertest'],
		function(QUnit, UserTest) {
			UserTest.run();
			QUnit.load();
			QUnit.start();
		},
		function(err) {
			console.log(err);
			alert(JSON.stringify(err));
		});
})();
