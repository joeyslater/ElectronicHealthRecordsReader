angular.module('baymax.auth', [
	"ngCookies"
])

.factory('AuthService', function($http, $rootScope, $location, $cookies, $cookieStore, Session, AuthEvents) {
	var authService = {};

	authService.login = function(credentials) {
		return $http
			.post('/auth', credentials)
			.success(function(data, status, headers, config) {
				Session.create(data.Id, data.username, data.role, data);
				return data;
			}).error(function(data, status, headers, config) {
				return status;
			});
	};

	authService.register = function(credentials) {
		return $http
			.post('/register', credentials)
			.success(function(data, status, headers, config) {
				Session.create(data.Id, data.username, data.role, data);
				return data;
			}).error(function(data, status, headers, config) {
				return status;
			});
	};

	authService.logout = function() {
		return $http
			.post('/logout')
			.success(function(data, status, headers, config) {
				Session.destroy();
				$rootScope.$broadcast(AuthEvents.logoutSuccess);
			}).error(function(data, status, headers, config) {
				Session.destroy();
				$rootScope.$broadcast(AuthEvents.logoutSuccess);
			});
	};

	authService.isAuthenticated = function() {
		return !!$cookieStore.get('userId');
	};

	authService.isAuthorized = function(authorizedRoles) {
		if (!angular.isArray(authorizedRoles)) {
			authorizedRoles = [authorizedRoles];
		}
		return (authService.isAuthenticated() && authorizedRoles.indexOf($cookieStore.get('userRole')) !== -1);
	};

	authService.redirectIfAuthenticated = function(route, $location, $q) {
		var defer = $q.defer();
		if (authService.isAuthenticated()) {
			$location.path(route);
		}
		defer.resolve();
		return defer.promise;
	};

	authService.loginRequired = function($location, $q) {
		var deferred = $q.defer();
		if (!authService.isAuthenticated()) {
			deferred.reject();
			$location.path('login');
		} else {
			deferred.resolve();
		}
		return deferred.promise;
	};

	return authService;
})

.service('Session', function($cookieStore) {
	this.create = function(id, userId, userRole, user) {
		this.id = id;
		this.userId = userId;
		this.userRole = userRole;
		this.user = user;
		$cookieStore.put('id', this.id);
		$cookieStore.put('userId', this.userId);
		$cookieStore.put('userRole', this.userRole);
		$cookieStore.put('user', this.user);
	};
	this.destroy = function() {
		this.id = null;
		this.userId = null;
		this.userRole = null;
		this.user = null;
		$cookieStore.remove('id');
		$cookieStore.remove('userId');
		$cookieStore.remove('userRole');
		$cookieStore.remove('user');
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
