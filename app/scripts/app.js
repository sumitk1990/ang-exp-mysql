'use strict';
var AngWebApp = angular.module('AngWebApp', [ 'ui.router', 'ui.bootstrap', 'pascalprecht.translate', 'socialLogin' ])
	.config(
		[ '$controllerProvider',
			'$compileProvider',
			'$filterProvider',
			'$provide',
			'$translateProvider',
			'$stateProvider',
			'$urlRouterProvider',
			'$logProvider',
			'socialProvider',
			function($controllerProvider, $compileProvider, $filterProvider, $provide, $translateProvider, $stateProvider, $urlRouterProvider, $logProvider, socialProvider) {

				AngWebApp.controller = $controllerProvider.register;
				AngWebApp.directive = $compileProvider.directive;
				AngWebApp.filter = $filterProvider.register;
				AngWebApp.factory = $provide.factory;
				AngWebApp.service = $provide.service;

				//					if true then $log.debug will appear in browser console.
				//			        if false then $log.debug will not appear in browser console.
				$logProvider.debugEnabled(true);


			//					$translateProvider.translations('preferredLanguage', i18n);
			//					$translateProvider.preferredLanguage('preferredLanguage');
				socialProvider.setGoogleKey("456743858083-na0mf1k6ksj0nid9uj6eh0en3p89pnf0.apps.googleusercontent.com");
				//secret - RiuCjPa2s7At8v_zJW5uW5k8
//			    socialProvider.setLinkedInKey("LINKEDIN_CLIENT_ID");
			    socialProvider.setFbKey({appId: "159924964360412", apiVersion: "v2.5"});
			} ])

	.config([ '$provide', function($provide) {

		$provide.decorator('$log', [ '$delegate', function($delegate) {

			// Keep track of the original debug method, we'll need it later.
			var origDebug = $delegate.debug;

			/*
			 * Intercept the call to $log.debug() so we can add on
			 * our enhancement. We're going to add on a date and
			 * time stamp to the message that will be logged.
			 */
			$delegate.debug = function() {
				var args = [].slice.call(arguments);
				var date = new Date();
				var today = date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDate() + '-' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
				args[0] = [ '[' + today + ']' + ':[DEBUG]: - ' + args[0] ].join('');

				// Send on our enhanced message to the original debug method.
				origDebug.apply(null, args);
			};

			return $delegate;
		} ]);
	} ])
	.run(
		[ '$rootScope', '$state', '$stateParams', '$window', '$http',
			function($rootScope, $state, $stateParams, $window, $http) {

				// It's very handy to add references to $state and $stateParams to the $rootScope
				// so that you can access them from any scope within your applications.For example,
				// <li ui-sref-active="active }"> will set the <li> // to active whenever
				// 'contacts.list' or one of its decendents is active.
				$rootScope.$state = $state;
				$rootScope.$stateParams = $stateParams;
				$rootScope.isAuthenticated = false;

				//                console.log(" document.cookie  ",document.cookie['sessionID']);
				var isSessionExists = true;
				var name = 'sessionID' + "=";
				var decodedCookie = decodeURIComponent(document.cookie);
				var ca = decodedCookie.split(';');
				                console.log(" cookies ",ca);
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ') {
						c = c.substring(1);
					}
					                    console.log(" c.indexOf(name) ",c.indexOf(name));
					if (c.indexOf(name) == 0) {
						console.log("c.substring(name.length, c.length); ",c.substring(name.length, c.length))
						isSessionExists = true;
						var sessionCookie = c.substring(name.length, c.length);
						break;
					                        
					} else {
						isSessionExists = false;
					}
				}

				if ($window.sessionStorage["current_user"] && isSessionExists) {
					$rootScope.userData = JSON.parse($window.sessionStorage["current_user"]);
					$rootScope.isAuthenticated = true;
				} else {
					$window.sessionStorage.clear();
					$rootScope.userData = null;
					$rootScope.isAuthenticated = false;
				}

				//not needed as auth check is done at server side
				/*
				$rootScope.$on('$locationChangeStart', function(event, next, current) {
					if (!$rootScope.isAuthenticated) {
						$state.go('login');
					}
				});
*/


				// add JWT token as default auth header
				//                $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;
				//                console.log("$http.defaults.headers.common['Authorization'] ",$http);
				//                console.log("$window.jwtToken ",$window);


			}
		]
).filter('bindContentData', [
    '$sce',
    function($sce) {
        return function(content) {
            return $sce.trustAs('html', content);
        }
    }
]);
