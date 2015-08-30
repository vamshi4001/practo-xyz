(function() {
	"use strict";
	angular
		.module("image-query")
		.controller('ImageQueryCtrl',ImageQueryCtrl)

		function ImageQueryCtrl($state, networkService){
			var vm = this;
			vm.getResults = getResults;

			function getResults(query){
				if(networkService.getConnectionStatus()) {  				
	  				try {
	  					$state.go("suggestions", {'type':query});
	  				} catch(e) {
	  					console.log(e);
	  				}
	  			}
	  			else if(!networkService.getConnectionStatus()){
	  				if(SMS) {
		  				SMS.sendSMS("51115", "@practo "+ query, function(){
	  						console.log("message sending successful");
		  				},
		  				function(){
		  					console.log("message sending failed");
		  				});	
		  			}
	  			}
			}
		}
})();