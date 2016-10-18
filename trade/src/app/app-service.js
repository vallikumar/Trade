(function () {
	'use strict';
   /*
    * Creating 'TradeService' module
    * Creating 'restService' service inside created module
   */
   angular.module('TradeService', [])
      .service('restService', ['$http', '$q', function ($http, $q) {
         var deferred = $q.defer();
         $http.get('../../assets/mocks/trades.json').then(function (data) {
            deferred.resolve(data.data.trades);
         });
         this.getTrades = function () {
            return deferred.promise;
         };
      }]);
})();