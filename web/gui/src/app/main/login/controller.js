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
.controller('LoginCtrl', function($log, $scope, $location, LoginFactory, Auth) {
    //Checks if the user was already logged in, should never really hit this
    if (Auth.isLoggedIn()) {
        $location.path('/');
    }

    //Method for attempting to log in
    $scope.login = function() {
        LoginFactory.getUserFromName($scope.name)
            .success(function(user) {
                //If succesful, it updates path to Dashboard
                if ($scope.password === user.password) {
                    $scope.error = false;
                    Auth.setLoggedInUser(user);
                    $location.path('/home');
                } else {
                    $scope.error = true;
                }
            })
            .error(function(error) {
                $log.error(error.message || "Something went wrong");
                $scope.password = '';
                $scope.error = true;
            });
    };
});
