'use strict';

angular.module('AngWebApp')
	.controller('homeCtrl', [ '$rootScope', '$scope', '$log', '$http', 'serviceConfig', 'appService', 
		function($rootScope, $scope, $log, $http, serviceConfig, appService) {

		$scope.homePageText = 'This is your homepage';

		$scope.preInitialize = function() {
			$log.debug(" $scope.preInitialize : serviceConfig baseAPIPath : ", serviceConfig.BASE_API_PATH);
			homeContentCall();
			baseHomeServiceCall();

			$log.debug("$rootScope ", $rootScope);
		//				$log.debug("  $http.defaults.headers ", $http.defaults)
		}

		function baseHomeServiceCall() {
			$log.debug(serviceConfig.BASE_API_PATH + '' + serviceConfig.HOME_API.NAME + '' + serviceConfig.HOME_API.PATH.homeInitial, ' ');

			appService
				.GETMethod(serviceConfig.BASE_API_PATH + '' + serviceConfig.HOME_API.NAME + '' + serviceConfig.HOME_API.PATH.homeInitial)
				.then(function(response) {
					$log.debug(serviceConfig.BASE_API_PATH + '' + serviceConfig.HOME_API.NAME + '' + serviceConfig.HOME_API.PATH.homeInitial, ' ', response);

					$scope.sessions = response.responseData
				});
		}

		function homeContentCall() {
			$log.debug("baseHomeContentCall ", serviceConfig.CONTENT.HOME_CONTENT);

			appService
			.GETMethod(serviceConfig.CONTENT.HOME_CONTENT)
			.then(function(response) {
				$log.debug(serviceConfig.CONTENT.HOME_CONTENT, ' ', response);
				
				$scope.homeContent = response.content;
			});			
		}

	} ]);