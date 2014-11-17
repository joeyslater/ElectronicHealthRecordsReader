//FAQ Module
angular.module('baymax.faq', [
	'ui.bootstrap'
])

.controller("FaqController", function($scope, $location, $anchorScroll) {

	$scope.faqs = [{
		category: "Overview",
		questions: [{
			title: "First Question",
			content: "Content"
		}, {
			title: "Second Question",
			content: "Content"
		}, {
			title: "Third Question",
			content: "Content"
		}]
	}, {
		category: "Patient"
	}, {
		category: "Legal",
		questions: [{
			title: "How can you Baymax from Big Hero 6?",
			content: "As of right now, Baymax is a stand in until our media and legal teams decide on a name and character. For the intents of this beta, the team is claiming Fair Use."
		}]
	}];

	$scope.scrollTo = function(id) {
		$location.hash(id);
		$anchorScroll();
	};

})

;
