'use strict';
define(['AngWebApp'], function(AngWebApp) {

	AngWebApp.directive('sample', function() {
		return {
			restrict: 'E',
			template: '<span>Sample</span>'
		};
	});
});
