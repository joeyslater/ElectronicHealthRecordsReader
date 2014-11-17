'use strict';

//Module for the application
angular.module('baymax', [
	'ngRoute',
	'ngCookies',
	'templates-app',
	'templates-common',
	'medical-guru.auth',
	'medical-guru.main',
	'baymax.faq'
])

//Configures the route provider
.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'main/main.tpl.html',
			resolve: {
				loginRequired: function(AuthService, $location, $q) {
					return AuthService.loginRequired($location, $q);
				}
			}
		})
		.when('/register', {
			templateUrl: 'main/register/main.tpl.html'
		})
		.when('/login', {
			templateUrl: 'main/login/main.tpl.html'
		})
		.when('/admin', {
			templateUrl: 'main/admin/main.tpl.html'
		})
		.when('/faq', {
			templateUrl: 'main/faq/main.tpl.html'
		})
		.otherwise({
			redirectTo: '/'
		});
})

.config(function($httpProvider) {
	$httpProvider.interceptors.push([
		'$injector',
		function($injector) {
			return $injector.get('AuthInterceptor');
		}
	]);
})

.run(function($rootScope, AuthEvents, AuthService) {
	$rootScope.$on('$stateChangeStart', function(event, next) {
		var authorizedRoles = next.data.authorizedRoles;
		if (!AuthService.isAuthorized(authorizedRoles)) {
			event.preventDefault();
			if (AuthService.isAuthenticated()) {
				$rootScope.$broadcast(AuthEvents.notAuthorized);
			} else {
				$rootScope.$broadcast(AuthEvents.notAuthenticated);
			}
		}
	});
})

.controller('AppCtrl', function($scope, $location, UserRoles, AuthService, AuthEvents) {
	$scope.currentUser = null;
	$scope.userRoles = UserRoles;
	$scope.isAuthorized = AuthService.isAuthorized;

	$scope.setCurrentUser = function(user) {
		$scope.currentUser = user;
	};

	$scope.$on(AuthEvents.loginSuccess, function() {
		$location.path("dashboard");
	});
})

;
