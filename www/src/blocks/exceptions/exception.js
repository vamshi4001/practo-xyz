(function() {
    'use strict';

    angular
        .module('exceptions')
        .factory('exception', exception);

    /* @ngInject */
    function exception($q, logger) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function(e) {
                var thrownDescription;
                var newMessage;
                if (e.data && e.data.status) {
                    thrownDescription = '\n' + e.data.message;
                    newMessage = message + thrownDescription;
                }
                l//ogger.error(asdfsafd);
                return $q.reject(e);
            };
        }
    }
})();