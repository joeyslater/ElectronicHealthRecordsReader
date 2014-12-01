//Module for the Patient Portal
angular.module('baymax.patient-portal', [
	'ui.bootstrap',
	'baymax.more-info-modal',
	'baymax.chart',
	'googlechart'
])

//Controller for the PatientPortal
.controller('PatientPortalController', function($scope, $http, $modal, $filter, ChartService, $timeout) {
	$scope.openInput = function() {
		$timeout(function() {
			$('#ccdInput').trigger('click');
		});
	};

	$scope.uploadCcd = function(element) {
		$scope.url = "";
		$http.get('uploadCcd')
			.success(function(data, status, headers) {
				$scope.url = data;
				$http({
						method: "post",
						url: $scope.url,
						headers: {
							'Content-Type': undefined
						},
						transformRequest: function(data) {
							var formData = new FormData();
							formData.append("file", data);
							formData.append("id", $scope.currentUser.Id);
							return formData;
						},
						data: element.files[0]
					}).success(function() {
						$scope.startUp();
					})
					.error(function() {});
			});
	};

	$scope.isEmpty = function(obj) {

		// null and undefined are "empty"
		if (obj === null) {
			return true;
		}

		if (!obj) {
			return true;
		}

		// Otherwise, does it have any properties of its own?
		// Note that this doesn't handle
		// toString and valueOf enumeration bugs in IE < 9
		for (var key in obj) {
			if (hasOwnProperty.call(obj, key)) {
				return false;
			}
		}

		// Assume if it has a length property with a non-zero value
		// that that property is correct.
		if (obj.length > 0) {
			return false;
		}
		if (obj.length === 0) {
			return true;
		}



		return true;
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

	$scope.startUp = function() {
		$http.get('ccd/' + $scope.currentUser.Id + '?' + new Date())
			.success(function(result) {
				if (!$scope.isEmpty(result)) {
					$scope.ccd = result;
					$scope.patient = $scope.ccd.recordTarget.patientRole[0].patient;
					$scope.contactInfo = {};
					$scope.contactInfo.telecom = $scope.ccd.recordTarget.patientRole[0].telecom;
					$scope.contactInfo.address = $scope.ccd.recordTarget.patientRole[0].addr;
					$scope.components = $scope.ccd.component.structuredBody.component;
					$scope.birthTime = $scope.parseStringToDate($scope.patient.birthTime.value);
					$scope.age = $scope.calcAge();

					$scope.setUpCharts();
				}
			})
			.error(function(reuslt) {});
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

	$scope.getUpdatedSectionTitle = function(string) {
		if (string.toLowerCase() === 'problems') {
			return 'Conditions';
		}
		return string;
	};

	$scope.viewMore = function(component) {
		var modalInstance = $modal.open({
			templateUrl: 'main/modals/more-info/main.tpl.html',
			controller: 'MoreInfoController',
			size: 'lg',
			windowClass: 'more-info',
			resolve: {
				component: function() {
					return component;
				}
			}
		});
	};

	$scope.setUpCharts = function() {
		angular.forEach($scope.components, function(value, index) {
			if (value.section.code.code === '46240-8' && value.section.text) {
				var chartMap = [];
				angular.forEach(value.section.text.table.thead.tr[0].th, function(thValue, thIndex) {
					var chart = {};
					chart.title = thValue;
					chart.data = [];
					chartMap.push(chart);
				});
				angular.forEach(value.section.text.table.tbody.tr, function(trValue, trIndex) {
					angular.forEach(trValue.td, function(tdValue, tdIndex) {

						var chart = chartMap[tdIndex];
						if (chart.title.toLowerCase().indexOf("date") === -1) {
							var val = tdValue.text.match(/\d+/g);
							if (val !== null) {
								if (val.length > 1) {
									var vals = [];
									for (var i = 0; i < val.length; i++) {
										vals.push(val[i]);
										chart.data.push(vals);
									}
								} else {
									chart.data.push(val[0]);
								}
							}
						} else {
							var date = $scope.parseStringToDate(tdValue.text.trim());
							date = $filter('date')(date, "MM/dd/yyyy");
							chart.data.push(date);
						}
					});
				});
				$scope.chartHeight = ChartService.createLineChart("Height", chartMap, 0, 4);
				$scope.chartWeight = ChartService.createLineChart("Weight", chartMap, 0, 5);
				$scope.chartPulse = ChartService.createLineChart("Pulse", chartMap, 0, 6);
				$scope.chartRespiration = ChartService.createLineChart("Respiration", chartMap, 0, 7);
				$scope.chartBloodPressure = ChartService.createLineChart("Blood Pressure", chartMap, 0, 8);
			} else if (value.section.code.code === '8716-3') {
				var vitalsChartMap = [];
				angular.forEach(value.section.text.table.thead.tr[0].th, function(thValue, thIndex) {
					var chart = {};
					chart.title = thValue;
					chart.data = [];
					vitalsChartMap.push(chart);
				});
				angular.forEach(value.section.text.table.tbody.tr, function(trValue, trIndex) {
					angular.forEach(trValue.td, function(tdValue, tdIndex) {
						var chart = vitalsChartMap[tdIndex];
						if (chart.title.toLowerCase().indexOf("date") === -1) {
							var val = tdValue.content.value.match(/\d+/g);
							if (val !== null) {
								if (val.length > 1) {
									var vals = [];
									for (var i = 0; i < val.length; i++) {
										vals.push(val[i]);
										chart.data.push(vals);
									}
								} else {
									chart.data.push(val[0]);
								}
							}
						} else {
							var date = $scope.parseStringToDate(tdValue.text.trim());
							date = $filter('date')(date, "MM/dd/yyyy");
							chart.data.push(date);
						}
					});
				});
				$scope.chartVitalsHeight = ChartService.createLineChart("Height", vitalsChartMap, 0, 1);
				$scope.chartVitalsWeight = ChartService.createLineChart("Weight", vitalsChartMap, 0, 2);
				$scope.chartVitalsBloodPressure = ChartService.createLineChart("Blood Pressure", vitalsChartMap, 0, 3);
			}
		});
	};

	$scope.startUp();

})

.filter('capitalize', function() {
	return function(input, all) {
		return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}) : '';
	};
})

;
