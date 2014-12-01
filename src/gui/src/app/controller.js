'use strict';

//Module for the application
angular.module('baymax', [
	'ngRoute',
	'ngCookies',
	'templates-app',
	'templates-common',
	'baymax.auth',
	'baymax.main',
	'baymax.faq',
	'baymax.image',
	'baymax.more-info-modal'
])

//Configures the route provider
.config(function($routeProvider, UserRoles) {
	$routeProvider
		.when('/dashboard', {
			templateUrl: 'main/main.tpl.html',
			resolve: {
				loginRequired: function(AuthService, $location, $q) {
					return AuthService.loginRequired($location, $q);
				},
				isAuthenticated: function(AuthService, $location, $q) {

				}
			}
		})
		.when('/register', {
			templateUrl: 'main/register/main.tpl.html',
			resolve: {
				redirectIfAuthenticated: function(AuthService, $location, $q) {
					return AuthService.redirectIfAuthenticated("dashboard", $location, $q);
				}
			}
		})
		.when('/login', {
			templateUrl: 'main/login/main.tpl.html',
			resolve: {
				redirectIfAuthenticated: function(AuthService, $location, $q) {
					return AuthService.redirectIfAuthenticated("dashboard", $location, $q);
				}
			}
		})
		.when('/profile', {
			templateUrl: 'main/profile/main.tpl.html',
			resolve: {
				loginRequired: function(AuthService, $location, $q) {
					return AuthService.loginRequired($location, $q);
				}
			}
		})
		.when('/faq', {
			templateUrl: 'main/faq/main.tpl.html'
		})
		.otherwise({
			redirectTo: '/dashboard'
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

.controller('AppCtrl', function($scope, $location, UserRoles, AuthService, AuthEvents, $cookieStore, ImageService) {
	$scope.currentUser = null;
	$scope.profileImage = null;
	$scope.userRoles = UserRoles;
	$scope.isAuthorized = AuthService.isAuthorized;

	$scope.setCurrentUser = function(user) {
		$scope.currentUser = user;
		$scope.getProfileImage();
	};

	$scope.$on(AuthEvents.loginSuccess, function() {
		$location.path("dashboard");
	});

	$scope.$on(AuthEvents.logoutSuccess, function() {
		$location.path("login");
	});

	$scope.getProfileImage = function() {
		ImageService.getProfilePic($scope.currentUser.Id)
			.success(function(data, status, headers, config) {
				$scope.profileImage = '/profpic/' + $scope.currentUser.Id + '?' + new Date();
			}).error(function(data, status, headers, config) {
				$scope.profileImage = 'assets/images/blank_prof.png';
			});
	};

	if ($scope.currentUser === null && $cookieStore.get('user')) {
		$scope.currentUser = $cookieStore.get('user');
		$scope.getProfileImage();
	}
})

;
