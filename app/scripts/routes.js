'use strict';

AngWebApp.config(function($stateProvider, $urlRouterProvider) {
	//
	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/home");
	// Now set up the states
	$stateProvider
	.state('login', {
		url : "/login",
		templateUrl: '/src/login/login.html',
		controller : 'loginCtrl',
		data : {
			displayName : 'Login'
		}
	})
	.state('home', {
		url : "/home",
		templateUrl: '/src/home/home.html',
		controller : 'homeCtrl',
		data : {
			displayName : 'Home'
		}
	})
	.state('about', {
		url : "/about",
		templateUrl: '/src/about/about.html',
		controller : 'aboutCtrl',
		data : {
			displayName : 'About'
		}
	})
	.state('contact', {
		url : "/contact",
		templateUrl: '/src/contact/contact.html',
		controller : 'contactCtrl',
		data : {
			displayName : 'Contact'
		}
	})	
	.state('user', {
		url : "/users",
		templateUrl: '/src/user/user.html',
		controller : 'userCtrl',
		data : {
			displayName : 'user'
		}
	})
	.state('admin', {
		url : "/admin-panel",
		templateUrl: '/src/admin/admin.html',
		controller : 'adminCtrl',
		data : {
			displayName : 'admin'
		}
	})
});

/*'use strict';

define([], function() {
    return {
        defaultRoutePath: '/home',
        
        routes: {
        	'index': {
        		url: '/',
        		state: 'index',
        		templateUrl: '/src/index.html',
                controller: 'IndexCtrl',
                controllerPath: '../src/Index',
                displayName: 'Index'
        	},
        	'login': {
        		url: '/login',
        		state: 'login',
        		templateUrl: '/src/login/login.html',
                controller: 'LoginCtrl',
                controllerPath: '../src/login',
                displayName: 'Login'
        	},
        	'home': {
        		url: '/home',
        		state: 'home',
        		templateUrl: '/src/home/home.html',
                controller: 'HomeCtrl',
                controllerPath: '../src/home',
                displayName: 'Home'
        	},
        	'about': {
        		url: '/about',
        		state: 'about',
        		templateUrl: '/src/about/About.html',
                controller: 'AboutCtrl',
                controllerPath: '../src/about',
                displayName: 'About'
        	},
        	'contact': {
        		url: '/contact',
        		state: 'contact',
        		templateUrl: '/src/contact/Contact.html',
                controller: 'ContactCtrl',
                controllerPath: '../src/contact',
                displayName: 'Contact'
        	},
        	'user': {
        		url: '/users',
        		state: 'user',
        		templateUrl: '/src/user/user.html',
                controller: 'UserCtrl',
                controllerPath: '../src/user',
                displayName: 'User'
        	}
        }
    };
});

	define([], function() {
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: '/views/home.html',
                controller: 'HomeCtrl'
            },
            '/contact': {
                templateUrl: '/views/contact/Contact.html',
                controller: 'ContactCtrl'
            },
            '/about': {
                templateUrl: '/views/about/About.html',
                controller: 'AboutCtrl'
            }
             ===== yeoman hook ===== 
             Do not remove these commented lines! Needed for auto-generation 
        }
    };
});
*/
/*'use strict';

define([], function() {
    return {
        defaultRoutePath: '/home',
        
        routes: {
        	'index': {
        		url: '/',
        		state: 'index',
        		templateUrl: '/src/index.html',
                controller: 'IndexCtrl',
                controllerPath: '../src/Index',
                displayName: 'Index'
        	},
        	'login': {
        		url: '/login',
        		state: 'login',
        		templateUrl: '/src/login/login.html',
                controller: 'LoginCtrl',
                controllerPath: '../src/login',
                displayName: 'Login'
        	},
        	'home': {
        		url: '/home',
        		state: 'home',
        		templateUrl: '/src/home/home.html',
                controller: 'HomeCtrl',
                controllerPath: '../src/home',
                displayName: 'Home'
        	},
        	'about': {
        		url: '/about',
        		state: 'about',
        		templateUrl: '/src/about/About.html',
                controller: 'AboutCtrl',
                controllerPath: '../src/about',
                displayName: 'About'
        	},
        	'contact': {
        		url: '/contact',
        		state: 'contact',
        		templateUrl: '/src/contact/Contact.html',
                controller: 'ContactCtrl',
                controllerPath: '../src/contact',
                displayName: 'Contact'
        	},
        	'user': {
        		url: '/users',
        		state: 'user',
        		templateUrl: '/src/user/user.html',
                controller: 'UserCtrl',
                controllerPath: '../src/user',
                displayName: 'User'
        	}
        }
    };
});

	define([], function() {
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: '/views/home.html',
                controller: 'HomeCtrl'
            },
            '/contact': {
                templateUrl: '/views/contact/Contact.html',
                controller: 'ContactCtrl'
            },
            '/about': {
                templateUrl: '/views/about/About.html',
                controller: 'AboutCtrl'
            }
             ===== yeoman hook ===== 
             Do not remove these commented lines! Needed for auto-generation 
        }
    };
});
*/