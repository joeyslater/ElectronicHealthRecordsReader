//Login module
angular.module('medical-guru.main.login', [
    'medical-guru'
])

//Factory for logging in a user, to get a user from a username
.factory('LoginFactory', ["$http", function($http) {
    return {
        getUserFromName: function(username) {
            return $http.get('/user/name/' + username);
        }
    };
}])

//Controller for Login
.controller('LoginController', function($log, $scope, $location, LoginFactory, Auth) {

    $scope.credentials = {
        username: '',
        password: ''
    };


});
