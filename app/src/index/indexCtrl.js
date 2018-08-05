'use strict';
angular.module('AngWebApp')
	.controller('indexCtrl', ['$scope', '$log', 'serviceConfig', 'appService', function($scope, $log, serviceConfig, appService) {
		
		$log.debug(" ------------------indexCtrl --------------");
		
		$scope.text = 'This is your Index page';
		
		
		baseContentCall();
		function baseContentCall() {
			$log.debug("baseContentCall ", serviceConfig.CONTENT.BASE_CONTENT);

			appService
			.GETMethod(serviceConfig.CONTENT.BASE_CONTENT)
			.then(function(response) {
				$log.debug("baseContentCall response ----------- ",serviceConfig.CONTENT.BASE_CONTENT, ' ', response);
				
				$scope.baseContent = response.content;
			});			
		}
	}]);
