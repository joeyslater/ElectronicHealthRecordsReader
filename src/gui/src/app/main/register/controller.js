//Register Module
angular.module('medical-guru.main.register', [
    'ngResource', 'medical-guru.auth'
])

//Service for registering users
.factory('RegisterService', ["$http", function($http) {
    return {
        registerUser: function(credentials) {
            return $http.post('/register', {
                username: credentials.username,
                password: credentials.password,
                emailAddress: credentials.emailAddress,
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
        emailAddress: '',
        username: '',
        password: ''
    };

    $scope.formErrors = {};

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

    $scope.errorMessage = function() {
        return $scope.formErrors.firstName || $scope.formErrors.lastName || $scope.formErrors.username || $scope.formErrors.password || $scope.formErrors.confirmPassword;
    };

    //method for adding user
    $scope.register = function(credentials) {
        $scope.formErrors = {};
        if (isBlank(credentials.firstName)) {
            $scope.formErrors.firstName = "Please enter your first name";
            $("#firstName").focus();
        } else if (isBlank(credentials.lastName)) {
            $scope.formErrors.lastName = "Please enter your last name";
            $("#lastName").focus();
        } else if (isBlank(credentials.username)) {
            $scope.formErrors.username = "Please enter your username ";
            $("#userame").focus();
        } else if (isBlank(credentials.emailAddress)) {
            $scope.formErrors.emailAddress = "Please enter your emailAddress ";
            $("#emailAddress").focus();
        } else if (isBlank(credentials.password)) {
            $scope.formErrors.password = "Please enter your password ";
            $("#password").focus();
        } else if (isBlank(credentials.confirmPassword)) {
            $scope.formErrors.confirmPassword = "Please confirm your password ";
            $("#confirmPassword").focus();
        } else {
            console.log("Te");
            // RegisterService.registerUser($scope.credentials)
            //     .success(function(data) {
            //         // $scope.user.name = data.name;
            //         // $scope.user.password = data.password;
            //         // $scope.user.id = data.id;
            //         // $scope.user.optionShowCheckedItems = true;
            //         // Auth.setLoggedInUser($scope.user);
            //         // $location.path('/');
            //     })
            //     .error(function(data, status, headers, config) {
            //         // if (status === 409) {
            //         //     $scope.needUserNameError = false;
            //         //     $scope.needPasswordError = false;
            //         //     $scope.needConfirmPasswordError = false;
            //         //     $scope.confirmPasswordError = false;
            //         //     $scope.duplicateUserError = true;
            //         // }
            //     });
        }

    };

    var isBlank = function(str) {
        return (!str || /^\s*$/.test(str));
    };
})

//

;
