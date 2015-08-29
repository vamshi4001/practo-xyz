(function() {
    'use strict';

    angular
        .module('health')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        var otherwise = '/health';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [
            {
                state: 'health',
                config: {
                    url: '/health',
                    templateUrl: 'src/health/templates/health.html',
                    controller: 'HealthCtrl as vm',
                    resolve: {
                        illnessData: function(healthService) {
                            return healthService.getHealthRep();
                        }
                    },
                    title: 'Health'
                }
            }
        ];
    }
})();