//Module for the Dashboard which includes many of the tasks and actions
angular.module('medical-guru.main.dashboard', [
	'medical-guru'
])

//Controller for the Dashboard
.controller('DashboardCtrl', function($log, $scope, $location, $timeout, $http) {

	$scope.patient = undefined;

	$http.get('/marla').
	success(function(data, status, headers, config) {
		$log.info("Success");
		$scope.patient = data;
	}).
	error(function(data, status, headers, config) {
		$log.error("Unable to get Marla's Info");
	});


})

;
