'use strict';

define(['routes', 
	'services/dependencyResolverFor',
	'i18n/i18nLoader!',
	'angular',
	'angular-route',
	'angular-ui-router',
	'bootstrap',
//	'angular-bootstrap',
	'angular-translate'],
	function(config, dependencyResolverFor, i18n) {
		var AngWebApp = angular.module('AngWebApp', [
			'ui.router',
			'ngRoute',
//			'ui.bootstrap',
			'pascalprecht.translate'
		]);
		AngWebApp
		 	.run(
		 			['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {

//				       It's very handy to add references to $state and $stateParams to the $rootScope
//				       so that you can access them from any scope within your applications.For example,
//				       <li ui-sref-active="active }"> will set the <li> // to active whenever
//				       'contacts.list' or one of its decendents is active.
		 				$rootScope.$state = $state;
		 				$rootScope.$stateParams = $stateParams;
		 				}
		 			]
				)
			.config(
				['$routeProvider',
				'$controllerProvider',
				'$compileProvider',
				'$filterProvider',
				'$provide',
				'$translateProvider',
				'$stateProvider', 
				'$urlRouterProvider',
				'$logProvider',
				function($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $translateProvider, 	$stateProvider, $urlRouterProvider, $logProvider) {

					AngWebApp.controller = $controllerProvider.register;
					AngWebApp.directive = $compileProvider.directive;
					AngWebApp.filter = $filterProvider.register;
					AngWebApp.factory = $provide.factory;
					AngWebApp.service = $provide.service;

//					if true then $log.debug will appear in browser console.
//			        if false then $log.debug will not appear in browser console.
					$logProvider.debugEnabled(true);
					
					/*
					 * if (config.routes !== undefined) {
						angular.forEach(config.routes, function(route, path) {
							$routeProvider.when(path, {templateUrl: route.templateUrl, resolve: dependencyResolverFor(['controllers/' + route.controller]), controller: route.controller, gaPageTitle: route.gaPageTitle});
						});
					}*/
					if (config.routes !== undefined) {
						angular.forEach(config.routes, function(route, path) {
							$stateProvider.state(route.state,
									{url: route.url, templateUrl: route.templateUrl, resolve: dependencyResolverFor([route.controllerPath + '/' + route.controller]), onEnter: function() {
											console.log('Enter ' + route.state + '.... ');
										}
									});
						});
					}
					
					if (config.defaultRoutePath !== undefined) {
//						$routeProvider.otherwise({redirectTo: config.defaultRoutePath});
						$urlRouterProvider.otherwise(config.defaultRoutePath);
					}

					$translateProvider.translations('preferredLanguage', i18n);
					$translateProvider.preferredLanguage('preferredLanguage');
				}])
			.config(['$provide', function ($provide) {

				$provide.decorator('$log', ['$delegate', function ($delegate) {
					
					// Keep track of the original debug method, we'll need it later.
					var origDebug = $delegate.debug;
					
					/*
					 * Intercept the call to $log.debug() so we can add on
					 * our enhancement. We're going to add on a date and
					 * time stamp to the message that will be logged.
					 */
					$delegate.debug = function () {
						var args = [].slice.call(arguments);
						var date = new Date();
						var today = date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDate() + '-' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
						args[0] = ['[' + today + ']' + ':[DEBUG]: - ' + args[0]].join('');
						
						// Send on our enhanced message to the original debug method.
						origDebug.apply(null, args);
						};
						
						return $delegate;
					}]);
    }]);
		
		return AngWebApp;
	}
);
