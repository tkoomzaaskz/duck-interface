define(
	['underscore', '../../../public/js/model/user'],
	function(_, User) {
		var userModel = new User();
		userModel.fetch({ async: false });

		QUnit.module('model/tree');

		QUnit.test('check nodes', function() {
			QUnit.ok(! _.contains(ids, '1'));
			QUnit.ok(_.contains(ids, something));
		});
	});
