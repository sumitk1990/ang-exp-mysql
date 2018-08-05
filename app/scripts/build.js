/* global paths */
'use strict';
require.config({
    baseUrl: '/scripts',
    paths: {
//        affix: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix',
//        alert: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert',
        angular: '../../bower_components/angular/angular.min',
        'angular-route': '../../bower_components/angular-route/angular-route.min',
        'angular-translate': '../../bower_components/angular-translate/angular-translate.min',
//        button: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button',
        bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap.min',
//        carousel: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel',
//        collapse: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse',
//        dropdown: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown',
        'es5-shim': '../../bower_components/es5-shim/es5-shim.min',
        jquery: '../../bower_components/jquery/dist/jquery.min',
        json3: '../../bower_components/json3/lib/json3.min',
//        modal: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal',
        moment: '../../bower_components/moment/min/moment.min',
//        popover: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover',
        requirejs: '../../bower_components/requirejs/require',
//        scrollspy: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy',
//        tab: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab',
//        tooltip: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip',
//        transition: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition',
        'angular-ui-router': '../../bower_components/angular-ui-router/release/angular-ui-router.min',
        'angular-bootstrap': '../../bower_components/angular-bootstrap/ui-bootstrap-tpls.min'
    },
    shim: {
        angular: {
            deps: [
                'jquery'
            ]
        },
        'angular-ui-router': {
            deps: [
                'angular'
            ]
        },
        'angular-route': {
            deps: [
                'angular'
            ]
        },
        'angular-bootstrap': {
            deps: [
                'angular'
            ]
        },
        bootstrap: {
            deps: [
                'jquery'
            ]
        },
       /* modal: {
            deps: [
                'jquery'
            ]
        },
        tooltip: {
            deps: [
                'jquery'
            ]
        },*/
        'angular-translate': {
            deps: [
                'angular'
            ]
        }
    },
    packages: [

    ]
});

if (paths) {
    require.config({
        paths: paths
    });
}

require([
        'angular',
        'AngWebApp',
        'services/appService',
        'serviceConfig',
        '../src/index/IndexCtrl'
    ],
    function() {
        angular.bootstrap(document, ['AngWebApp']);
    }
);
