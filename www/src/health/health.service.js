(function() {
	"use strict";
	angular
		.module("health")
		.service("healthService", healthService);

	function healthService($q, dataService) {
		// Public methods
		return {
			getHealthRep: getHealthRep
		}

		function success(resp) {
			return $q.resolve(resp.data);
		}

		function failure(err) {
			return $q.reject(err);
		} 

		function getHealthRep() {
			return dataService.get("data/health.json")
				.then(success).catch(failure);
		}
	}
})();