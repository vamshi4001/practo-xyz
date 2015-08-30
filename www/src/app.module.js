(function() {
	"use strict";
	angular
		.module("practoxz", ['ionic', 'core', 'health', 'suggestions'])
		.run(run);

	function run($ionicPlatform, $rootScope) {
		$ionicPlatform.ready(function() {
			$ionicPlatform.ready(function() {
			    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			    // for form inputs)
			    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			      cordova.plugins.Keyboard.disableScroll(true);

			    }
			    if (window.StatusBar) {
			      // org.apache.cordova.statusbar required
			      StatusBar.styleLightContent();
			    }

			    $rootScope.recognizeSpeech = function() {
                var maxMatches = 5;
                var promptString = "Speak now"; // optional
                var language = "en-US";                     // optional
                window.plugins.speechrecognizer.startRecognize(function(result){
                	console.log(result)
                    alert(result);
                }, function(errorMessage){
                    console.log("Error message: " + errorMessage);
                }, maxMatches, promptString, language);
            }
			 });
		});
	}
})();