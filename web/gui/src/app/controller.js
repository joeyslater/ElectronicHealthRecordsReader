'use strict';

//Module for the application
angular.module('medical-guru', [
    'ngRoute',
    'ngCookies',
    'templates-app',
    'templates-common',
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

//Authentication Service factory, allows modules to see if user is logged in as well as dealing with the cookie store
.factory('Auth', function($http, $cookieStore, $log) {
    var loggedInUser;
    return {
        setLoggedInUser: function(user) {
            $cookieStore.put('user', user.id);
            loggedInUser = user;
        },
        getLoggedInUser: function() {
            var id = $cookieStore.get('user');
            return $http.get('/user/id/' + id);
        },
        isLoggedIn: function() {
            if ($cookieStore.get('user') && $cookieStore.get('user') !== 'notloggedin') {
                return true;
            } else {
                return false;
            }
        },
        logout: function() {
            $cookieStore.put('user', 'notloggedin');
            loggedInUser = null;
        }
    };
})

//Empty Controller
.controller('AppCtrl', function($log, $scope) {});
