'use strict';


angular.module('AngWebApp')
	.controller('userCtrl', [ '$scope', '$log', 'serviceConfig', 'appService', function($scope, $log, serviceConfig, appService) {

		$scope.preInitialize = function() {
			$log.debug(" $scope.preInitialize : serviceConfig baseAPIPath : ", serviceConfig.BASE_API_PATH);
			userSummaryCall();
		}

		function userSummaryCall() {
			$log.debug(serviceConfig.BASE_API_PATH + '' + serviceConfig.USER_API.NAME + '' + serviceConfig.USER_API.PATH.userSummary, ' ');

			appService
				.GETMethod(serviceConfig.BASE_API_PATH + '' + serviceConfig.USER_API.NAME + '' + serviceConfig.USER_API.PATH.userSummary)
				.then(function(response) {
					$log.debug(serviceConfig.BASE_API_PATH + '' + serviceConfig.USER_API.NAME + '' + serviceConfig.USER_API.PATH.userSummary, ' ', response);
					$scope.users = response.responseData
				});
		}

	} ]);