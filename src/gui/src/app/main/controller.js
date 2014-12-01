angular.module('baymax.main', [
	'baymax.login',
	'baymax.register',
	'baymax.dashboard',
	'baymax.admin-dash',
	'baymax.profile',
	'baymax.patient-portal',
	'baymax.tabs',
	'baymax.tab',
	'baymax.home'
])

.controller('MainCtrl', function($scope, $location, AuthService) {
	$scope.template = "main/dashboard/main.tpl.html";

	if (AuthService.isAuthorized(["doctor"])) {
		$scope.template = "main/dashboard/main.tpl.html";
	} else if (AuthService.isAuthorized(["admin"])) {
		$scope.template = "main/admin/main.tpl.html";
	} else if (AuthService.isAuthorized(["patient"])) {
		$scope.template = "main/portal/main.tpl.html";
	} else {
		$scope.template = "main/portal/main.tpl.html";
	}
});
