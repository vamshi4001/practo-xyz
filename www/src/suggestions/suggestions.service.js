(function() {
	"use strict";
	angular
		.module("suggestions")
		.service("suggestionsService", suggestionsService);

	function suggestionsService($q, dataService) {
		// Public methods
		return {
			getSuggestions: getSuggestions
		}

		function success(resp) {
			return $q.resolve(resp.data);
		}

		function failure(err) {
			return $q.reject(err);
		} 

		function getDoctors(query) {
			var docType = "general-physician";
				if(query=="pain" || query=="fever" || query=="cold" || query=="cough"){
					docType = "general-physician";
				}
				else if( query== 'sugar'){
					docType = "Diabetologist"
				}
				else if( query== 'acne' || query=="burn"){
					docType = "Dermatologist";
				}
				else if(query=="asthma" || query=="tb"){
					docType = "Pulmonologist";
				}
				else if(query=="bp"){
					docType = "Cardiologist";
				}
			return dataService.get("https://api.practo.com/search/?city=bangalore&locality=richmond-town&speciality="+docType+"&searchfor=specialization&sort_by=practo_ranking", true)
				.then(success).catch(failure);
		}

		function getMeds(query) {
			return dataService.get('http://www.truemd.in/api/medicine_suggestions/?id=' + query +'&key=837d6359af088afae84cebefdc699d&limit=10')
				.then(success).catch(failure);
		}

		function getSuggestions(query) {
			console.log(query);
			return $q.all([getMeds(query), getDoctors(query)]);
		}
	}
})();