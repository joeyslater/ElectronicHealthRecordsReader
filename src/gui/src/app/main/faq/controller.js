//FAQ Module
angular.module('baymax.faq', [
	'ui.bootstrap',
	'baymax.auth'
])

.controller("FaqController", function($scope, $location, $anchorScroll, AuthService) {

	$scope.isLoggedIn = function() {
		return AuthService.isAuthenticated();
	};

	$scope.faqs = [{
		category: "Overview",
		questions: [{
			title: "What is Baymax?",
			content: "Baymax is a healthcare assisntant web application which reads Continuity of Care documents (CCD) and displays the information in an easily navigable format. The information is broken into data types to support a physician’s mental model for a given patient’s clinical information."
		}, {
			title: "How do I signed up for Baymax?",
			content: "Click the 'Register' link the top right corner. Fill in the user information and password and select Register. You will be registered as a patient until and admin changes your role."
		}, {
			title: "I just logged on. Why don’t I see any information?",
			content: "If you are a user, please input a CCD to fill out your profile. If you are a doctor, then you have the opporutnity to open other users or upload a CCD for a quick snapshot."
		}, {
			title: "How do I upload a CCD?",
			content: "Click the 'Register' link the top right corner. Fill in the user information and password and select Register."
		}]
	}, {
		category: "Doctor",
		questions: [{
			title: "How come when I register, I am taken to the Patient Portal?",
			content: "For this Beta release, all new users will be added to as Patients and only admins can change the associated roles."
		}, {
			title: "How do I upload a CCD?",
			content: "Click the Quick CCD in your Home tab. This does not persist across sessions and will be deleted upon route change. You also can upload a CCD on a Patient stored in the system by going to the users' page and clicking the upload CCD."
		}, {
			title: "I added a CCD via the Quick Upload, where is that information?",
			content: "This information is displayed in a new tab up at the top of the screen, with the patient’s name as the label. By navigating to the tab you will find the patient demographic information on the left side of the screen as well as all clinical data on the right side of the screen."
		}, {
			title: "How can I find additional patients?",
			content: "At the time of the beta release, it was hopeful that the autcomplete searchbar would be helpful in finding other users. Until then, a list of patients will be displayed on the home page. Clicking the link will open a new patient tab."
		}, {
			title: "How can I view the information only relevant to a specific healthcare specialty?",
			content: "When you navigate to a patient’s tab, you are automatically brought to the overview display. This by default shows all the patient’s information. Just below the tab selection, there are menu buttons to switch between views for different physician specialties. Switching to these different views will focus the clinical information on the groups of data relevant to that physician."
		}]
	}, {
		category: "Patient",
		questions: [{
			title: "How do I upload a CCD?",
			content: "Click the Upload CCD in your patient portal sidebar. This will override the current CCD. Future features will include appending CCDs into stored data."
		}]
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
