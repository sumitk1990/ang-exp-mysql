(function() {

	var appName = 'AngWebApp';
	var ctxPath = '/';
	var bootstrapName = 'angWebApp-bootstarp';

	var _loadCss = function(href) {
		if (!document.querySelector('head > link[href="' + href + '"]')) {
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = href;
			link.media = 'screen';
			document.getElementsByTagName('head')[0].appendChild(link);
		}
	}

	var _loadScripts = function(urls, elem, callback) {
		var response = [];

		var cb = function() {
			response.push(arguments);

			if (response.length == urls.length) {
				callback();
			}
		}


		var xhrcb = function() {
			if (this.readyState == 'loaded' || this.readyState == 'complete') {
				this.onreadystatechange = null;
				cb();
			}
		};

		if (urls.length == 0) {
			//if no urls to load, call the callback immediately
			callback();
		} else {
			for (var i = 0; i < urls.length; i++) {
				var scriptId = '';
				scriptId = 'script-' + urls[i].replace(/[^a-zA-Z]/g, "");

				if (document.getElementById(scriptId)) {
					console.log("URL Loading =========== ", i, " ", urls[i], " ", scriptId);
					//script already loaded, just notify callback
					cb();
				} else {
					var script = document.createElement('script');
					script.src = urls[i];
					script.type = 'text/javascript';
					script.id = scriptId;
					//real browsers
					script.onload = cb;
					//Internet Explorer
					script.onreadystatechange = xhrcb;
					elem.appendChild(script);
				}
			}
		}
	};


	var phase1 = [
			'./../bower_components/angular/angular.js',
			'./../bower_components/jquery/dist/jquery.min.js'
		],
		phase2 = [ './../bower_components/angular-route/angular-route.min.js',
			'./../bower_components/angular-translate/angular-translate.min.js',
			'./../bower_components/angular-ui-router/release/angular-ui-router.min.js'
		],

		phase3 = [ './../bower_components/bootstrap/dist/js/bootstrap.js',
			'./../bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
			'./../bower_components/moment/moment.js',
			'./../bower_components/angularjs-social-login/angularjs-social-login.js'
		],
		phase4 = [ './scripts/app.js',
			'./scripts/routes.js',
			'./scripts/services/serviceConfig.js',
			'./scripts/services/appService.js',
			'./src/index/IndexCtrl.js',
			'./src/home/homeCtrl.js',
			'./src/login/loginCtrl.js',
			'./src/home/homeCtrl.js',
			'./src/about/aboutCtrl.js',
			'./src/contact/contactCtrl.js',
			'./src/user/userCtrl.js',
			'./src/admin/adminCtrl.js'

		];

	_loadCss('./styles/main.css');

	setTimeout(function() {
		var root = document.getElementById(bootstrapName);

		_loadScripts(phase1, document.body, function() {
			_loadScripts(phase2, document.body, function() {
				_loadScripts(phase3, document.body, function() {
					_loadScripts(phase4, document.body, function() {
						angular.bootstrap(root, [ 'AngWebApp' ]);
					})
				})
			})
		})
	}, 0);

})();