angular.module('medical-guru.auth', [])

.factory('AuthService', function($http, Session) {
	var authService = {};

	authService.login = function(credentials) {
		return $http
			.post('/login', credentials)
			.then(function(res) {
				Session.create(res.data.id, res.data.user.id, res.data.user.role);
				return res.data.user;
			});
	};
})

.service('Session', function() {

})

.constant('UserRoles', {
	all: '*',
	admin: 'admin',
	doctor: 'doctor',
	nurse: 'nurse',
	patient: 'patient'
})

.constant('AuthEvents', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
})

;
