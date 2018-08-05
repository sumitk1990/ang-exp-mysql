angular.module('AngWebApp')
		.factory('serviceConfig', [ function() {
			
	return {
        BASE_API_PATH: '/API',
        
        COMMON_API: {
        	NAME: '/common',
        	PATH: {
        		homeInitial: '/initialize'
        	}
        },
        LOGIN_API: {
        	NAME: '/login',
        	PATH: {
        		loginSubmit: '/loginSubmit',
        		logoutSubmit: '/logoutSubmit',
        		registerUser:'/registerUser'
        	}
        },
        HOME_API: {
        	NAME: '/home',
        	PATH: {
        		homeInitial: '/initialize'
        	}
        },
        ABOUT_API: {
        	NAME: '/about',
        	PATH: {
        		aboutInitial: '/initialize'
        	}
        },
        CONTACT_API: {
        	NAME: '/contact',
        	PATH: {
        		contactInitial: '/initialize'
        	}
        },
        USER_API: {
        	NAME: '/user',
        	PATH: {
        		userInitial: '/initialize',
        		userSummary: '/userSummary'
        	}
        },
        ADMIN_API: {
        	NAME: '/admin',
        	PATH: {
        		userInitial: '/initialize',
        		userSecurityProfile: '/userSecurityProfile'
        	}
        },
        ORDER_API: {
        	NAME: '/order',
        	PATH: {
        		orderInitial: '/initialize',
        		orderSummary: '/orderSummary',
        		addOrder: '/addOrder'
        	}
        },
        MATERIAL_API: {
        	NAME: '/material',
        	PATH: {
        		materialInitial: '/initialize',
        		materialSummary: '/materialSummary',
        		addMaterial: '/addMaterial'
        	}
        },
        
        CONTENT : {
        	BASE_CONTENT: '/content/baseContent.json',
        	HOME_CONTENT: '/content/homeContent.json'
        }
    }
}]);
/*'use strict';

define([], function() {
	
	console.log(" service config loded.... ");
	
    return {
        BASE_API_PATH: '/API',
        
        COMMON_API: {
        	NAME: '/common',
        	PATH: {
        		homeInitial: '/initialize'
        	}
        },
        LOGIN_API: {
        	NAME: '/login',
        	PATH: {
        		loginSubmit: '/loginSubmit',
        		registerUser:'/registerUser'
        	}
        },
        HOME_API: {
        	NAME: '/home',
        	PATH: {
        		homeInitial: '/initialize'
        	}
        },
        ABOUT_API: {
        	NAME: '/about',
        	PATH: {
        		aboutInitial: '/initialize'
        	}
        },
        CONTACT_API: {
        	NAME: '/contact',
        	PATH: {
        		contactInitial: '/initialize'
        	}
        },
        USER_API: {
        	NAME: '/user',
        	PATH: {
        		userInitial: '/initialize',
        		userSummary: '/userSummary'
        	}
        },
        CONTENT : {
        	
        }
    };
});
*/