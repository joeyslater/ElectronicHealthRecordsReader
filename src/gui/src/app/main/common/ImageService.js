angular.module('baymax.image', [

])

.factory('ImageService', function($http) {

	var imageService = {};

	imageService.getProfilePic = function(id) {
		return $http.get('/profpic/' + id);
	};

	return imageService;

})

;
