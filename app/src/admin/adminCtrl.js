'use strict';

angular.module('AngWebApp')
	.controller('adminCtrl', [ '$scope', '$log', 'serviceConfig', 'appService', function($scope, $log, serviceConfig, appService) {
		$scope.text = 'This is your admin page';


		function payload(){
			this.username = "";
		}
		
		$scope.preInitialize = function() {
			$scope.formModal = new payload();
			$log.debug(" $scope.preInitialize : serviceConfig baseAPIPath : ", serviceConfig.BASE_API_PATH);
			userSummaryCall();
		}

		$scope.getUserSecurityProfile =function(){
			var USER_SECURITY_PROFILE_API_URL = serviceConfig.BASE_API_PATH + '' + serviceConfig.ADMIN_API.NAME + '' + serviceConfig.ADMIN_API.PATH.userSecurityProfile; 
			$log.debug(USER_SECURITY_PROFILE_API_URL, ' ',$scope.formModal);

			appService
				.POSTMethod(USER_SECURITY_PROFILE_API_URL, $scope.formModal)
				.then(function(response) {
					$log.debug(USER_SECURITY_PROFILE_API_URL, ' response ', response);
					$scope.userSecurityProfile = response.responseData;
				});
			
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