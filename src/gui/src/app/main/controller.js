angular.module('medical-guru.main', [
	'medical-guru.main.login',
	'medical-guru.main.register',
	'medical-guru.main.dashboard',
	'baymax.tabs',
	'baymax.tab'
])

.controller('MainCtrl', function($location, AuthService) {
	// if (!Auth.isLoggedIn()) {
	//     $location.path('/login');
	// }
});
