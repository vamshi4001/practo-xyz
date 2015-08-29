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
			return dataService.get("https://api.practo.com/search/?city=bangalore&locality=richmond-town&speciality=general-physician&searchfor=specialization&sort_by=practo_ranking", true)
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