//Login module
angular.module('medical-guru.main.login', [
    'medical-guru',
    'medical-guru.auth'
])

//Controller for Login
.controller('LoginController', function($log, $scope, $rootScope, AuthService, AuthEvents) {

    $scope.credentials = {
        username: '',
        password: ''
    };

    $scope.login = function(credentials) {
        AuthService.login(credentials).then(function(user) {
            $rootScope.$broadcast(AuthEvents.loginSuccess);
            $scope.setCurrentUser(user);
        });
    };


});
