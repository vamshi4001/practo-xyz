(function() {
    'use strict';

    angular
        .module('suggestions')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'suggestions',
                config: {
                    url: '/suggestions/:type/:locality',
                    templateUrl: 'src/suggestions/templates/suggestions.html',
                    controller: 'SuggestionsCtrl as vm',
                    resolve: {
                        suggestedData: function($stateParams, suggestionsService) {
                            var type = $stateParams.type;
                            var locality = $stateParams.locality;
                            return suggestionsService.getSuggestions(type, locality);
                        }
                    },
                    title: 'Suggestions'
                }
            }
        ];
    }
})();