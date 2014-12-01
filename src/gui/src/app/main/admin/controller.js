angular.module('baymax.admin-dash', [
	'baymax.auth',
	'ui.bootstrap.alert'
])

.controller('AdminController', function($scope, $http, Session) {
	$scope.newField = {};
	$scope.editing = false;
	$scope.old = {};

	$scope.alerts = [];

	$scope.addAlert = function(type, message) {
		$scope.alerts.length = 0;
		$scope.alerts.push({
			type: type,
			message: message
		});
	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.getUsers = function() {
		return $http.get('/users');
	};

	$scope.edit = function(user) {
		user.editMode = true;
	};

	$scope.cancel = function(user, $index) {
		angular.copy($scope.old[$index], user);
		user.editMode = false;
		user.deleteMode = false;
	};

	$scope.confirm = function(user, $index) {
		if (user.editMode) {
			return $http
				.put('/user', user)
				.success(function(data, status, headers, config) {
					var promise = $scope.getUsers();
					promise.then(function(result) {
						$scope.users = result.data;
						$scope.old = angular.copy(result.data);
						$scope.addAlert('success', 'Succesfully Updated User: ' + user.username);
					});
				}).error(function(data, status, headers, config) {
					$scope.addAlert('error', 'Unable to Update User: ' + $scope.old[$index].username);
				});
		} else if (user.deleteMode) {
			//$http.delete breaks
			return $http({
					method: 'delete',
					url: '/user/' + user.Id
				})
				.success(function(data, status, headers, config) {
					var promise = $scope.getUsers();
					promise.then(function(result) {
						$scope.users = result.data;
						$scope.old = angular.copy(result.data);
						$scope.addAlert('success', 'Succesfully Deleted User: ' + user.username);
					});
				}).error(function(data, status, headers, config) {
					$scope.addAlert('danger', 'Unable to Delete User: ' + user.username);
				});
		}

		user.editMode = false;
		user.deleteMode = false;
	};

	$scope.deleteUser = function(user) {
		user.deleteMode = true;
	};

	var promise = $scope.getUsers();
	promise.then(function(result) {
		$scope.users = result.data;
		$scope.old = angular.copy(result.data);
	});
})

;
