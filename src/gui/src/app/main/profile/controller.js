//Profile Module
angular.module('baymax.profile', [
	'ui.bootstrap',
	'baymax.auth'
])

//Controller for User Profile
.controller('ProfileController', function($scope, $http, $log, $modal, $timeout, Session) {
	$scope.editMode = false;
	$scope.user = angular.copy($scope.currentUser);

	$scope.alerts = [];

	$scope.addAlert = function(type, message) {
		$scope.alerts.length = 0;
		$scope.alerts.push({
			type: type,
			message: message
		});
	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};


	$scope.openInput = function() {
		$timeout(function() {
			$('#profPicFileInput').trigger('click');
		});
	};

	$scope.uploadProfPic = function(element) {
		$scope.url = "";
		$http.get('uploadProf')
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
						$scope.addAlert('success', 'Succesfully Updated Profile Picture');
						$scope.getProfileImage();
					})
					.error(function() {});
			});
	};

	$scope.selection = {
		ids: {}
	};

	$scope.specialties = ["Behavioral Health ",
		"Cardiology",
		"Data Entry and Coding",
		"Diabetes",
		"General Medicine",
		"HFI and Templates",
		"Inpatient",
		"Pediatric",
		"Pharmacy",
		"Public Health Nursing",
		"Urgent Care and ER",
		"Women's Health"
	];

	$scope.edit = function() {
		$scope.editMode = true;
	};

	$scope.cancel = function() {
		$scope.user = angular.copy($scope.currentUser);
		$scope.editMode = false;
	};

	$scope.submit = function(user) {
		return $http
			.put('/user', user)
			.success(function(data, status, headers, config) {
				Session.create(user.Id, user.username, user.role, user);
				$scope.setCurrentUser($scope.user);
				$scope.old = angular.copy($scope.user);
				$scope.addAlert('success', 'Succesfully Updated User: ' + user.username);
				$scope.editMode = false;
			}).error(function(data, status, headers, config) {
				$scope.addAlert('error', 'Unable to Update User: ' + $scope.old[$index].usernazme);
			});
	};

	$scope.submitSpecialties = function(user) {
		user.specialties = [];
		return $http
			.put('/user', user)
			.success(function(data, status, headers, config) {
				Session.create(user.Id, user.username, user.role, user);
				$scope.setCurrentUser($scope.user);
				$scope.old = angular.copy($scope.user);
				$scope.addAlert('success', 'Succesfully Updated User: ' + user.username);
				$scope.editMode = false;
			}).error(function(data, status, headers, config) {
				$scope.addAlert('error', 'Unable to Update User: ' + $scope.old[$index].username);
			});
	};
})

;
