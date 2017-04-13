/**
 * Check request response status
 * Display messages here
 * Reject requests
 * @type type
 */
angular.module('jwtApp')
    .factory('ResponseInterceptor', function(constants, $filter, $rootScope, $q, $injector, $location) {
        var AuthService,
            path = $location.path();

        function _getAuthService() {
            AuthService = $injector.get('AuthService');
        }

        function _addMessageToLogin(message) {
            _getAuthService();
            AuthService.executeListener('authErr', message);
        }

        function _checkMessageTypes(defer, rejection) {
            _getAuthService();
            var checks = {
                'JWT_EXPIRED': function() {
                    console.log("EXPIRED_TOKEN");
                    AuthService.doLogout();
                },
                'AUTH_RIGHTS_CHANGED': function() {
                    console.log("AUTH_RIGHTS_CHANGED");
                    AuthService.doLogout();
                }
            }

            var code = $filter('staticOptions')(rejection.data.errorCode, 'CUSTOM_SERVER_ERRS');

            checks[code]();
            return defer.promise;
        }



        return {

            'response': function(response) {
                if (response.status == constants.HttpCodes.OK && response.data.message) {
                    console.log("OK", response.data.message);
                }
                return response;
            },

            'responseError': function(rejection) {
                var defer = $q.defer();
                defer.reject(rejection);

                if (rejection.status == constants.HttpCodes.UNAUTHORIZED) {
                    if ($location.path() == constants.DefaultLogoutRedirect) {

                    } else {
                        return _checkMessageTypes(defer, rejection);
                    }
                }

                if (rejection.status == constants.HttpCodes.SERVER_ERROR) {
                    //an error occured when accesing server data
                    console.log("INTERNAL_ERR");
                }

                if (rejection.status == constants.HttpCodes.CONFLICT) {
                    console.log("ERR_CONFLICT");
                }

                if (rejection.status === constants.FatalError) {
                    console.log(" REST Server cannot be reached. ", path);
                }


                return defer.promise;
            }
        };
    });