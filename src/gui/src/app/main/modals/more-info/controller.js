//Module for the Modal Info 
angular.module('baymax.more-info-modal', [
	'ui.bootstrap'
])

//Controller for the More Info Modal
.controller('MoreInfoController', function($scope, $modal, $modalInstance, component) {
	$scope.component = component;
	$scope.notes = [];
	$scope.dates = [];

	$scope.currentPage = 0;
	$scope.pageSize = 8;

	$scope.close = function() {
		$modalInstance.dismiss();
	};

	$scope.isBlank = function(str) {
		return (!str || /^\s*$/.test(str));
	};

	$scope.getNotBlank = function(str1, str2) {
		if (str1 && !$scope.isBlank(str1)) {
			return str1.trim();
		} else if (str2 && !$scope.isBlank(str2)) {
			return str2.trim();
		}
	};

	$scope.showColumn = function(index) {
		return $scope.notes.indexOf(index) === -1;
	};

	$scope.parseStringToDate = function(dateString) {
		if (dateString) {
			var year = parseInt(dateString.substring(0, 4), 10);
			var month = parseInt(dateString.substring(4, 6), 10);
			var day = parseInt(dateString.substring(6, 8), 10);
			return new Date(year, month, day, 0, 0, 0, 0);
		} else {
			return new Date();
		}
	};

	$scope.init = function() {
		$scope.tableHeaders = component.section.text.table.thead.tr[0].th;
		angular.forEach($scope.tableHeaders, function(value, index) {
			if (value.toLowerCase().indexOf("date") !== -1) {
				$scope.dates.push(index);
			}
			if (value.toLowerCase().indexOf("note") !== -1) {
				$scope.notes.push(index);
			}
		});

		$scope.tableRows = [];
		angular.forEach(component.section.text.table.tbody.tr, function(value, index) {
			$scope.tableRows.push(value);
			for (var i = 0; i < $scope.notes.length; i++) {
				var tr = {};
				var td = value.td[$scope.notes[i]];
				tr.td = td;
				tr.notes = true;
				tr.colspan = value.td.length - 1;
				$scope.tableRows.push(tr);
			}
		});
	};

	$scope.init();

})

.filter('startFrom', function() {
	return function(input, start) {
		start = +start; //parse to int
		return input.slice(start);
	};
})

;
