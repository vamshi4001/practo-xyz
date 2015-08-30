(function() {
	"use strict";
	angular
		.module("suggestions")
		.controller("SuggestionsCtrl", SuggestionsCtrl);

	function SuggestionsCtrl(suggestedData) {
		var vm = this;
		vm.sols = {};
		vm.solList = solList;
		vm.meds = null;
		vm.docs = null;
		console.log(suggestedData)

		function renderView(data) {
			try {
				vm.sols = data;
			} catch(e) {
				alert("here")
				vm.sols = {};
			}
		}

		function solList(type) {

			switch(type) {
				case 'med':
					// Simple show and hide, so that it does not confuse shite out of readers
					vm.meds = true;
					vm.docs = false;
					try {
						vm.sols = suggestedData[0].response.suggestions;
					} catch(e) {
						vm.sols = {};
					}
					break;

				default:
					vm.meds = false;
					vm.docs = true;
					try {
						vm.sols = suggestedData[1].doctors;
						vm.sugs = suggestedData[0].suggestions;
					} catch(e) {
						vm.sols = {};
					}
					break;
			}
		}

		solList('docs');
	}

})();