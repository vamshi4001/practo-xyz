(function() {
    'use strict';

    angular
        .module('core')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'Four0Four',
                config: {
                    url: '/404',
                    template: '<ion-view><ion-content></ion-content></ion-view>',
                    title: 'Four Oh! Four'
                }
            }
        ];
    }
})();