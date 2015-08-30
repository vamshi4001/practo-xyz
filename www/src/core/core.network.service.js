(function() {
    "use strict";
    angular
        .module("core")
        .service("networkService", networkService);

        function networkService(){
            return {
                getConnectionStatus: getConnectionStatus
            }
            function getConnectionStatus(){                 
                var networkState = navigator.connection.type;
                if(networkState == "wifi"){return true;}
                else if(networkState == "cellular"){return true;}
                else if(networkState == "4g"){return true;}
                else if(networkState == "3g"){return true;}
                else if(networkState == "2g"){return true;}
                else if(networkState == "unknown"){return true;}
                else if(networkState == "ethernet"){return true;}
                else{return false;}
            }
        }
    
})();