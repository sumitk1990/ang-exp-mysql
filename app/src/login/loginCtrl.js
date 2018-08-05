'use strict';
angular.module('AngWebApp')
	.controller('loginCtrl', [ '$rootScope', '$scope', '$log', '$state', '$window', '$timeout', 'serviceConfig', 'appService', 'socialLoginService',
		function($rootScope, $scope, $log, $state, $window, $timeout, serviceConfig, appService, socialLoginService) {

			$scope.homePageText = 'This is your Login Page';

			$scope.preInitialize = function() {

				$log.debug("$rootscope.user --- ", $rootScope.userData);
				$scope.loginData = {
					"username" : "",
					"password" : ""
				}
				$scope.registerData = {
					"firstName" : "",
					"lastName" : "",
					"email" : "",
					"cnfEmail" : "",
					"password" : "",
					"cnfPassword" : ""
				}

				$scope.loginFormView = true;

				$log.debug(" $scope.preInitialize : serviceConfig baseAPIPath : ", serviceConfig.BASE_API_PATH);
			//				baseHomeServiceCall();
			}

			$scope.toggleLoginRegisterForm = function() {
				$scope.loginFormView = !$scope.loginFormView;
			}

			$scope.loginSubmit = function() {
				var LOGIN_URL = serviceConfig.BASE_API_PATH + '' + serviceConfig.LOGIN_API.NAME + '' + serviceConfig.LOGIN_API.PATH.loginSubmit;
				$log.debug(LOGIN_URL, ' ', $scope.loginData);

				appService.POSTMethod(LOGIN_URL, $scope.loginData).then(function(response) {

					$log.debug(LOGIN_URL, ' -----', response);

					if (response.error === false && response.responseData) {
						//						$state.go('home');

						$window.sessionStorage["current_user"] = JSON.stringify(response.responseData);
						$rootScope.userData = response.responseData;

						/*$timeout(function () {
											 $window.location.reload();
									    }, 1000);*/

						$window.location.reload();
					//						
					//						 
					/*$state.go('home', null, {
						reload : true
					});*/
					}

				});
			}

			$scope.logout = function() {
				var LOGOUT_URL = serviceConfig.BASE_API_PATH + '' + serviceConfig.LOGIN_API.NAME + '' + serviceConfig.LOGIN_API.PATH.logoutSubmit;
				$log.debug(LOGOUT_URL);

				appService.POSTMethod(LOGOUT_URL, $scope.loginData).then(function(response) {
					$log.debug(LOGOUT_URL, ' -----', response.responseData);
					$window.sessionStorage.clear();
					$rootScope.userData = null;
					$rootScope.isAuthenticated = false;
					$window.location.reload();
				});


			}

			$scope.registerSubmit = function() {
				var REGISTER_URL = serviceConfig.BASE_API_PATH + '' + serviceConfig.LOGIN_API.NAME + '' + serviceConfig.LOGIN_API.PATH.registerUser;
				$log.debug(REGISTER_URL, ' ', $scope.registerData);

				appService.POSTMethod(REGISTER_URL, $scope.registerData).then(function(responseData) {

					$log.debug('Response ', REGISTER_URL, ' ', responseData);
					//					

					if (responseData === 'SUCCESS') {
						$state.go('home');
					}

				});

			}

			$scope.signout = function(){
		    	socialLoginService.logout();
			}
			$scope.$on('event:social-sign-in-success', (event, userDetails)=> {
				$scope.result = userDetails;
				$scope.$apply();
			})
			$scope.$on('event:social-sign-out-success', function(event, userDetails){
				$scope.result = userDetails;
			})


		} ]);