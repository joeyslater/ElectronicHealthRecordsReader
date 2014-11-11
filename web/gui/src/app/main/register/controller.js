//Register Module
angular.module('medical-guru.main.register', [
    'ngResource',
    'medical-guru',
    'medical-guru.auth'
])

//Service for registering users
.factory('RegisterService', ["$http", function($http) {
    return {
        registerUser: function(credentials) {
            return $http.post('/register', {
                username: credentials.username,
                password: credentials.password,
                firstName: credentials.firstName,
                lastName: credentials.lastName
            });
        }
    };
}])

//Controller for registering user
.controller('RegisterController', function($log, $scope, RegisterService, $http, AuthService, $location) {

    //Set defaults 
    $scope.credentials = {
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    };

    $scope.errors = [];


    //checks to see if passwrod is matched with confirm password
    $scope.checkPasswords = function() {
        if ($scope.credentials.confirmPassword !== $scope.credentials.password) {
            $scope.confirmPasswordError = true;
            $scope.errors.length = 0;
            $scope.errors.push(
                "Password are not equal"
            );
        } else {
            $scope.confirmPasswordError = false;
        }
        return !$scope.confirmPasswordError;
    };

    //method for adding user
    $scope.register = function() {

        //succeeds and can attempt to add user
        $scope.user.name = $scope.name;
        $scope.user.password = $scope.password;
        RegisterService.registerUser($scope.credentials)
            .success(function(data) {
                $scope.user.name = data.name;
                $scope.user.password = data.password;
                $scope.user.id = data.id;
                $scope.user.optionShowCheckedItems = true;
                Auth.setLoggedInUser($scope.user);
                $location.path('/');
            })
            .error(function(data, status, headers, config) {
                if (status === 409) {
                    $scope.needUserNameError = false;
                    $scope.needPasswordError = false;
                    $scope.needConfirmPasswordError = false;
                    $scope.confirmPasswordError = false;
                    $scope.duplicateUserError = true;
                }
            });
    };
})

//

;
