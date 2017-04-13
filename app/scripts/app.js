'use strict';

/**
 * @ngdoc overview
 * @name jwtApp
 * @description
 * # jwtApp
 *
 * Main module of the application.
 */
angular
    .module('jwtApp', ['httpServicesModule',
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngMaterial',
        'ngFlash'
    ])
    .config(function($provide, $routeProvider, $locationProvider, $httpProvider,FlashProvider) {

        /**
         * Decorate exception handler to prompt error message to screen, also we should send this err to backend and log it
         */
        $provide.decorator("$exceptionHandler", function($delegate, $injector) {
            return function(exception, cause) {
                var $rootScope = $injector.get("$rootScope");
                // $rootScope.sendExceptionToLogsBackend({message: "Exception", reason: exception});
                $delegate(exception, cause);
            };
        });

        $routeProvider
            .when('/', {
                templateUrl: 'views/auth/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .when('/firstPage', {
                templateUrl: 'views/firstpage.html',
                controller: 'FirstPageCtrl',
                required: ['authenticated']
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.hashPrefix('');
        $httpProvider.interceptors.push('JwtInterceptor'); //intercept requests and add header
        $httpProvider.interceptors.push('ResponseInterceptor'); //intercept responses and act accordingly

        FlashProvider.setTimeout(4000);
            FlashProvider.setShowClose(true);

    });
/**
 * Run main application module
 * Add constants to the rootScope to use them in html templates
 * Avoid templateCaching.
 */
angular.module('jwtApp').run(function runApp($rootScope, LoggingResource, $window, constants, $document, $templateCache, MenuService) {

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (typeof(current) !== 'undefined') {
            $templateCache.remove(current.templateUrl);
        }
    });

    $rootScope.sendExceptionToLogsBackend = function(errorObject) {
        if (errorObject.reason) {
            LoggingResource.save(errorObject.reason, function() {}, function() {

            });
        }
    }

    $rootScope.$on('$viewContentLoaded', function(event) {
        console.log("view was loaded succesfully.", event);
    });

    $rootScope.constants = constants;

    //Use browser default message for F5 pressed by mistake
    $document.on('keydown', function(e) {
        if (e.which === 8) {
            if (e.target.nodeName === "INPUT" || e.target.nodeName === "SELECT" || e.target.nodeName === "TEXTAREA") {
                //nothing
            } else {
                e.preventDefault();
            }
        }
    });
});