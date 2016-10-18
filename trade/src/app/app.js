(function() {
	'use strict';
	/*
	 * Creating 'TradeApp' module for our application.
	 * Injecting 'TradeService' module.
	 * Creating 'TradeController' inside our main module 'TradeApp'.
	 */
	angular.module('TradeApp', ['TradeService'])
		.controller('TradeController', ['$scope', 'restService', function ($scope, restService) {
			// Calling getTrades() method using restService
			var promise = restService.getTrades();
			promise.then(function (trades) {
				$scope.tradeGroup = {};
				$scope.totalPl = 0;
				$scope.totalPlDisplay = false;
				$scope.sellPlDisplay = {};
				// Iterating JSON response and forming tradeGroup object
				angular.forEach(trades, function (value, index) {
					// Creating Symbol array inside tradeGroup object as it is not defined initially
					if ($scope.tradeGroup[value.Symbol] === undefined) {
						$scope.tradeGroup[value.Symbol] = [];
						$scope.sellPlDisplay['pl'+value.Symbol] = false;
					}
					// Creating Multidimentional Action array corresponding to its Symbol as it is not defined initially
					if ($scope.tradeGroup[value.Symbol][value.Action] === undefined) {
						$scope.tradeGroup[value.Symbol][value.Action] = [];
					}
					// Pushing all the elements inside Multidimentional array based on our table grouping requirements
					$scope.tradeGroup[value.Symbol][value.Action].push({
						TxnId: value.TxnId,
						Quantity: value.Quantity,
						Price: value.Price,
						MarketValue: value.MarketValue
					});
				});
			});
			/*
			 *'calculatePl' method to calculate P/L based on Buy and Sell values
			 * parameters for this methods are buy, sell and symbol passing from Calculate P/L button
			 */
			$scope.calculatePl = function (buy, sell, symbol) {
				$scope.totalPlDisplay = true;
				// Sorting Buy and Sell objects based on TxnId (requirement)
				buy.sort(function (a, b) { return a.TxnId-b.TxnId; });
				sell.sort(function (a, b) { return a.TxnId-b.TxnId; });
				/*
				 * Iterating Buy object and calculating P/L
				 * Individual P/L and Total P/L are assigned to a variable
				 */
				angular.forEach(buy, function (val, idx) {
					if (sell[idx]) {
						if ($scope.sellPlDisplay[symbol] === undefined) {
							$scope.sellPlDisplay[symbol] = [];
							$scope.sellPlDisplay['pl'+symbol] = true;
						}
						$scope['pl'+sell[idx].TxnId] = (buy[idx].Quantity - sell[idx].Quantity) > 0 ?
						((sell[idx].Price - buy[idx].Price) * sell[idx].Quantity) :
						((sell[idx].Price - buy[idx].Price) * buy[idx].Quantity);
						$scope.sellPlDisplay[symbol].push($scope['pl'+sell[idx].TxnId]);
						$scope.totalPl += $scope['pl'+sell[idx].TxnId];
					}
				});
			};
		}]);
})();