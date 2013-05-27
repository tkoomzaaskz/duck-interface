(function() {
	QUnit.config.autostart = false;

	require.config({
		baseUrl: '../public/js',
		shim : {
			'jquery-ui' : {
				deps : ['jquery']
			},
			underscore : {
				exports : '_'
			},
			backbone : {
				deps : ['underscore', 'jquery'],
				exports : 'Backbone'
			},
			icanhaz : {
				deps : ['jquery'],
				exports : 'ich'
			},
		},
		paths : {
			'jquery' : '../../public/vendor/js/jquery',
			'jquery-ui' : '../../public/vendor/js/jquery-ui',
			'underscore' : '../../public/vendor/js/underscore',
			'backbone' : '../../public/vendor/js/backbone',
			'icanhaz' : '../../public/vendor/js/icanhaz',
		}
	});

	require([
			'../../test/js/model/usertest'
		], 
		function() {
			QUnit.module('model');
			QUnit.start();
		},
		function(err) {
			alert(JSON.stringify(err));
		});
})();
