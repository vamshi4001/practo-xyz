(function() {
	"use strict";
	angular
		.module("health")
		.controller("HealthCtrl", HealthCtrl);

	function HealthCtrl(illnessData, $log, $scope, $state, networkService, $window, $timeout, $ionicPlatform) {
		var vm = this;
    vm.city="Bangalore";
		vm.recognizeSpeech = recognizeSpeech;
		vm.illness = illnessData.illness;
    vm.cities = Object.keys(illnessData.cities);
    vm.locales = illnessData.cities[vm.city].localities;
		vm.getHelp = getHelp;	
		
  		function getHelp(data, validity) {
        var master = angular.copy(data);
  			if(validity && networkService.getConnectionStatus()) {  				
  				try {
  					$state.go("suggestions", {'type':master.symptom,"locality":master.locality});
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

      $scope.$watch("vm.illness.city",function(data){
        if(data !== undefined) {
          $scope.$broadcast("updateLocalities", { 'localities': illnessData.cities[data].localities });
        }
      })
	}

})();
