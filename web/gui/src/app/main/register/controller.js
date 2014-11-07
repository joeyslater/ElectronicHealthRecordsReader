//Register Module
angular.module('medical-guru.main.register', [
    'ngResource',
    'medical-guru'
])

//Service for registering users
.factory('RegisterUserService', ["$http", function($http) {
    return {
        addNewUser: function(user) {
            return $http.post('/user', {
                name: user.name,
                password: user.password
            });
        }
    };
}])

//Controller for registering user
.controller('RegisterCtrl', function($log, $scope, RegisterUserService, $http, Auth, $location) {
    //Set defaults 
    $scope.user = {};
    $scope.confirmPasswordError = false;
    $scope.duplicateUserError = false;

    //checks to see if passwrod is matched with confirm password
    $scope.checkPasswords = function() {
        if ($scope.confirmPassword !== $scope.password) {
            $scope.confirmPasswordError = true;
        } else {
            $scope.confirmPasswordError = false;
        }
    };

    //method for adding user
    $scope.addUser = function() {
        //ensures that no field is empty and password matches confirmed password
        if (!($scope.name)) {
            //Emtpy task name
            $scope.needUserNameError = true;
            $scope.needPasswordError = false;
            $scope.needConfirmPasswordError = false;
            $scope.confirmPasswordError = false;
            $scope.duplicateUserError = false;
        } else if (!($scope.password)) {
            //Empty password field
            $scope.needUserNameError = false;
            $scope.needPasswordError = true;
            $scope.needConfirmPasswordError = false;
            $scope.confirmPasswordError = false;
            $scope.duplicateUserError = false;
        } else if (!($scope.confirmPassword)) {
            //Empty confirmed password field
            $scope.needUserNameError = false;
            $scope.needPasswordError = false;
            $scope.needConfirmPasswordError = true;
            $scope.confirmPasswordError = false;
            $scope.duplicateUserError = false;
        } else if ($scope.password !== $scope.confirmPassword) {
            //password and confirmed password do not math
            $scope.needUserNameError = false;
            $scope.needPasswordError = false;
            $scope.needConfirmPasswordError = false;
            $scope.confirmPasswordError = true;
            $scope.duplicateUserError = false;
        } else {
            //succeeds and can attempt to add user
            $scope.user.name = $scope.name;
            $scope.user.password = $scope.password;
            RegisterUserService.addNewUser($scope.user)
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
        }
    };
});
