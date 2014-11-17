angular.module('medical-guru.main.admin', [
	'medical-guru.main.auth'
])

.controller('AdminController', function($scope, $http, Session) {
	$scope.newField = {};
	$scope.editing = false;

	$scope.users = [{
		firstName: 'Joey',
		lastName: 'Slater',
		emailAddress: '',
		username: '',
		role: 'doctor'
	}, {
		firstName: '',
		lastName: '',
		emailAddress: 'truth',
		username: 'you know',
		role: 'admin'
	}];

	$scope.edit = function(field) {
		$scope.editing = $scope.users.indexOf(field);
		$scope.newField = angular.copy(field);
	};

	$scope.save = function(index) {

	};

	$scope.cancel = function(index) {

	};

	var getUsers = function() {
		$http
			.post('/users', Session.userId)
			.then(function(res) {
				$scope.users = res.data;
			});
	};

	getUsers();
})

;
