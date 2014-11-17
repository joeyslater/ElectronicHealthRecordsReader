angular.module('medical-guru.auth', [
	"ngCookies"
])

.factory('AuthService', function($http, $location, $cookies, Session) {
	var authService = {};

	authService.login = function(credentials) {
		return $http
			.post('/auth', credentials)
			.success(function(data, status, headers, config) {
				console.log("test");
				Session.create($cookies.session, data.username, data.role);
				return data.user;
			}).error(function(data, status, headers, config) {
				console.log("nope");
				return null;
			});
	};

	authService.isAuthenticated = function() {
		return !!Session.userId;
	};

	authService.isAuthorized = function(authorizedRoles) {
		if (!angular.isArray(authorizedRoles)) {
			authorizedRoles = [authorizedRoles];
		}
		return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
	};

	authService.redirectIfAuthenticated = function(route) {
		return function($location, $q) {

			var deferred = $q.defer();

			if (authService.isAuthenticated()) {
				deferred.reject();
				$location.path(route);
			} else {
				deferred.resolve();
			}

			return deferred.promise;
		};
	};

	authService.loginRequired = function($location, $q) {
		var deferred = $q.defer();

		if (!authService.isAuthenticated()) {
			deferred.reject();
			$location.path('/login');
		} else {
			deferred.resolve();
		}

		return deferred.promise;
	};




	return authService;
})

.service('Session', function() {
	this.create = function(sessionId, userId, userRole) {
		this.id = sessionId;
		this.userId = userId;
		this.userRole = userRole;
	};
	this.destroy = function() {
		this.id = null;
		this.userId = null;
		this.userRole = null;
	};
	return this;
})

.factory('AuthInterceptor', function($rootScope, $q, AuthEvents) {
	return {
		responseError: function(response) {
			$rootScope.$broadcast({
				401: AuthEvents.notAuthenticated,
				403: AuthEvents.notAuthorized,
				419: AuthEvents.sessionTimeout,
				440: AuthEvents.sessionTimeout
			}[response.status], response);
			return $q.reject(response);
		}
	};
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
