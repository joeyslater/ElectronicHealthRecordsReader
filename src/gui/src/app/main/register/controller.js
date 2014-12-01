//Register Module
angular.module('baymax.register', [
    'ngResource',
    'baymax.auth'
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
.controller('RegisterController', function($log, $scope, $rootScope, RegisterService, $http, AuthService, AuthEvents, $location) {

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
            $scope.formErrors.confirmPassword = "Password are not equal";
        } else {
            $scope.formErrors.confirmPassword = "";
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
            AuthService.register(credentials).then(
                function(res) {
                    $scope.setCurrentUser(res.data);
                    $rootScope.$broadcast(AuthEvents.loginSuccess);
                },
                function() {
                    $scope.formErrors.firstName = "";
                    $scope.formErrors.lastName = "";
                    $scope.formErrors.username = "";
                    $scope.formErrors.emailAddress = "";
                    $scope.formErrors.password = "";
                    $scope.formErrors.confirmPassword = "Please confirm your password ";
                    $('#username').focus();
                    $scope.credentials.password = '';
                    $scope.credentials.confirmPassword = '';
                    $scope.formError.username = "There was an error creating your account";
                });
        }
    };

    var isBlank = function(str) {
        return (!str || /^\s*$/.test(str));
    };
})

;
