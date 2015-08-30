(function() {
	"use strict";
	angular
		.module("health")
		.controller("HealthCtrl", HealthCtrl);

	function HealthCtrl(illnessData, $log, $state, networkService, $window, $timeout, $ionicPlatform) {
		var vm = this;
		vm.recognizeSpeech = recognizeSpeech;
		vm.illness = illnessData.illness;
		vm.getHelp = getHelp;	
		
  		function getHelp(data, validity) {
  			var master = angular.copy(data);
  			if(validity && networkService.getConnectionStatus()) {  				
  				try {
  					$state.go("suggestions", {'type':master.symptom});
  				} catch(e) {
  					console.log(e);
  				}
  			}
  			else if(validity && !networkService.getConnectionStatus()){
  				if(SMS) {
	  				SMS.sendSMS("51115", "@practo "+ master.symptom, function(){
  						console.log("message sending successful");
	  				},
	  				function(){
	  					console.log("message sending failed");
	  				});	
	  			}
  			}
  		}

  		function recognizeSpeech() {
            var maxMatches = 5;
            var promptString = "Speak now"; // optional
            var language = "en-US";                     // optional
            $window.plugins.speechrecognizer.startRecognize(function(result){
            	
            	var master = {
            		'symptom': result[0]
            	};
           		getHelp(master, true);

            }, function(errorMessage){
                console.log("Error message: " + errorMessage);
            }, maxMatches, promptString, language);
        }
	}

})();