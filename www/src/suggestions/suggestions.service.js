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

		function getDoctors() {
			var queryData = ["pain","sugar","bp","burn","acne","fever","cold","cough","asthma","tb"];
			var docType = "general-physician";
			queryData.forEach(function(v){
				if(v=="pain" || v=="fever" || v=="cold" || v=="cough"){
					docType = "general-physician";
				}
				else if( v== 'sugar'){
					docType = "Diabetologist"
				}
				else if( v== 'acne' || v=="burn"){
					docType = "Dermatologist";
				}
				else if(v=="asthma" || v=="tb"){
					docType = "Pulmonologist";
				}
				else if(v=="bp"){
					docType = "Cardiologist";
				}
			})
			return dataService.get("https://api.practo.com/search/?city=bangalore&locality=richmond-town&speciality="+docType+"&searchfor=specialization&sort_by=practo_ranking", true)
				.then(success).catch(failure);
		}

		function getMeds(query) {
			return dataService.get('http://www.truemd.in/api/medicine_suggestions/?id=' + query +'&key=837d6359af088afae84cebefdc699d&limit=10')
				.then(success).catch(failure);
		}

		function getSuggestions(query) {
			return $q.all([getMeds(query), getDoctors()]);
		}
	}
})();