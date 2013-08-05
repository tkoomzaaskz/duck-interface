define(
	['underscore', '../../../public/js/model/user', 'view/users'],
	function(_, User, UsersView) {

		var run = function() {
			QUnit.module('model/user');

			var userModel = new User({id: 1, view: new UsersView()});
			userModel.fetch();

			QUnit.test('check nodes', function() {
				QUnit.ok(userModel.get('id') === 1);
			});
		}
		return {run: run};
	});
