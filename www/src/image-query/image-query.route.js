(function() {
    'use strict';

    angular
        .module('image-query')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'image',
                config: {
                    url: '/image',
                    templateUrl: 'src/image-query/templates/image-query.html',
                    controller: 'ImageQueryCtrl as vm',
                    title: 'Query with Image'
                }
            }
        ];
    }
})();