//Module for the Dashboard Header 
angular.module('baymax.header', [
	'baymax.auth',
	'ui.bootstrap'
])

//Controller for the Dashboard Tabs
.controller('HeaderController', function($rootScope, $scope, AuthService, $http) {

	$scope.logout = function() {
		AuthService.logout();
	};

	$scope.getPatients = function(val) {
		return $http.get('/patients').then(function(response) {
			return response.data;
		});
	};

	$scope.getName = function(user) {
		if (user) {
			return user.firstName + ' ' + user.lastName + ' (' + user.username + ')';
		} else {
			return "";
		}
	};

	$scope.onSelect = function() {};

})

;
