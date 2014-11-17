//Module for the Dashboard Tabs
angular.module('baymax.tab', [
	'ui.bootstrap'
])

//Controller for the Dashboard Tabs
.controller('TabController', function($scope) {
	$scope.subtabs = [{
		title: "Pathology"
	}, {
		title: "Oncology"
	}];

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

	$scope.calcAge = function() {
		var today = new Date();
		var birthday = $scope.parseStringToDate($scope.patient.birthTime.value);
		var age = today.getFullYear() - birthday.getFullYear();


		if (today.getMonth() < birthday.getMonth() - 1) {
			age--;
		}

		if (birthday.getMonth() - 1 === today.getMonth() && today.getDate() < birthday.getDate()) {
			age--;
		}
		return age;
	};

	$scope.patient = $scope.ccd.recordTarget.patientRole[0].patient;
	$scope.contactInfo = {};
	$scope.contactInfo.telecom = $scope.ccd.recordTarget.patientRole[0].telecom;
	$scope.contactInfo.address = $scope.ccd.recordTarget.patientRole[0].addr;
})

;
