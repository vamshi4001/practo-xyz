(function() {
	"use strict";
	angular
		.module("core")
		.service("dataService", dataService);

	function dataService($http, $q, $ionicLoading) {
		return {
			get: get
		};

		function success(data) {
			$ionicLoading.hide();
			return $q.resolve(data);
		}

		function failure(err) {
			$ionicLoading.hide();
			return $q.reject(err);
		}

		function get(address, hasheaders) {
			$ionicLoading.show();
			var config = null;
			
			if(hasheaders === true) {
				config = {
					method	: 'GET',
					url		: address,
					cache 	: false,
					headers: {
						"X-CLIENT-ID":  "8b288768-a2e4-4251-8ddf-e1ba742105bd",
						"X-API-KEY" : "dGgXz97dPUzu0DF0puEg3HnCZMA="
					}
				};	
			}
			else if(hasheaders === null || hasheaders === undefined) {
				config = {
					method	: 'GET',
					url		: address,
					cache	: false
				};
			}

			return $http(config)
				.then(success).catch(failure);
		}
	}
})();