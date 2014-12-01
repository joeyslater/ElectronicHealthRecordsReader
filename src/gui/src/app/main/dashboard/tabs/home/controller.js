//Home Module
angular.module('baymax.home', [
	'ui.bootstrap'
])

//Controller for Home
.controller('HomeController', function($scope, $http, $timeout) {

	$scope.openCcdInput = function() {
		$timeout(function() {
			$('#ccdFileInput').trigger('click');
		});
	};

	$scope.uploadCcd = function(element) {
		$scope.url = "";
		$http.get('quickCcd')
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
							return formData;
						},
						data: element.files[0]
					}).success(function(res) {
						var name = res.recordTarget.patientRole[0].patient.name;
						$scope.$parent.tabs.push({
							title: name.given + " " + name.family,
							ccd: res,
							active: true
						});
					})
					.error(function() {});
			});
	};

	$scope.openPatientTab = function(user) {
		$http.get('ccd/' + user.Id).success(function(res) {
			if (!isEmpty(res)) {
				var name = res.recordTarget.patientRole[0].patient.name;
				$scope.$parent.tabs.push({
					title: name.given + " " + name.family,
					ccd: res,
					active: true
				});
				$scope.$parent.tabs[$scope.$parent.tabs.length - 1].active = true;
			} else {
				$scope.$parent.tabs.push({
					title: user.firstName + " " + user.lastName,
					ccd: null,
					user: user,
					active: true
				});
				$scope.$parent.tabs[$scope.$parent.tabs.length - 1].active = true;
			}

		});
	};

	var isEmpty = function(obj) {

		// null and undefined are "empty"
		if (obj === null) {
			return true;
		}

		// Assume if it has a length property with a non-zero value
		// that that property is correct.
		if (obj.length > 0) {
			return false;
		}
		if (obj.length === 0) {
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

		return true;
	};

	$scope.getPatients = function() {
		$http.get('patients').success(function(results) {
			$scope.patients = results;
		});
	};

	$scope.getPatients();

})

;
