//Module for the Dashboard Tabs
angular.module('baymax.tabs', [
	'ui.bootstrap'
])

//Controller for the Dashboard Tabs
.controller('TabsController', function($scope, $http, $log) {
	var promise = $http.get('/marla');
	promise.then(function(result) {
		$scope.ccd = result.data;

		$scope.tabs = [{
			title: "Marla Dixon",
			content: "Test",
			ccd: $scope.ccd
		}];
	});

	$scope.removeTab = function(index) {
		var tab = $scope.tabs[index];
		if (tab) {
			$scope.tabs.splice(index, 1);
		}
	};
})

.directive("ccd", function() {
	return {
		restrict: "A",
		scope: {
			ccd: '@ccd'
		}
	};
})

;
