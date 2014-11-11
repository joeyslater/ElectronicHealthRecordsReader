'use strict';

//Module for the application
angular.module('medical-guru', [
    'ngRoute',
    'ngCookies',
    'templates-app',
    'templates-common',
    'medical-guru.auth',
    'medical-guru.main',
    'medical-guru.main.login',
    'medical-guru.main.register',
    'medical-guru.main.dashboard'
])

//Configures the route provider
.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'main/main.tpl.html'
                // resolve: {
                //     auth: ["$q", "AuthService", function($q, AuthService) {
                //         if (AuthService.isAuthenticated()) {
                //             return $q.when(userInfo);
                //         } else {
                //             return $q.reject({
                //                 authenticated: false
                //             });
                //         }
                //     }]
        })
        .when('/register', {
            templateUrl: 'main/register/main.tpl.html'
        })
        .when('/login', {
            templateUrl: 'main/login/main.tpl.html'
        })
        .otherwise({
            redirectTo: '/'
        });
})

// .run(function($rootScope, AuthEvents, AuthService) {
//         $rootScope.$on('$stateChangeStart', function(event, next) {
//                 var authorizedRoles = next.data.authorizedRoles;
//                 if (!AuthService.isAuthorized(authorizedRoles)) {
//                     event.preventDefault();
//                     if (AuthService.isAuthenticated()) {
//                         $rootScope.$broadcast(AuthEvents.notAuthorized);
//                     } else {
//                         $rootScope.$broadcast(AuthEvents.notAuthenticated);
//                     }
//                 }
//             }
//         })

.controller('AppCtrl', function($scope, UserRoles, AuthService) {
    $scope.currentUser = null;
    $scope.userRoles = UserRoles;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.setCurrentUser = function(user) {
        $scope.currentUser = user;
    };

});
