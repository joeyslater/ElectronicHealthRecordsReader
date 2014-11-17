//Login module
angular.module('medical-guru.main.login', [
	'medical-guru.auth'
])

//Controller for Login
.controller('LoginController', function($log, $scope, $rootScope, AuthService, AuthEvents) {
	$scope.formError = {};

	$scope.credentials = {
		username: '',
		password: ''
	};

	$scope.login = function(credentials) {
		$scope.formError = {};
		if (isBlank(credentials.username)) {
			$scope.formError.username = "Enter your email address";
			$("#username").focus();
		} else if (isBlank(credentials.password)) {
			$scope.formError.password = "Enter your password";
			$("#password").focus();
		} else {
			AuthService.login(credentials).then(
				function(user) {
					$rootScope.$broadcast(AuthEvents.loginSuccess);
					$scope.setCurrentUser(user);
				},
				function() {
					$scope.formError.password = "The email or password you entered is incorrect";
					$scope.credentials.password = "";
					$("#password").focus();
				});
		}
	};

	var isBlank = function(str) {
		return (!str || /^\s*$/.test(str));
	};

});
