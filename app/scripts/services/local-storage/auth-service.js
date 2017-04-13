/**
 * Keep authentification details and inject where needed.
 * @type type
 */
angular.module('jwtApp')
    .service('AuthService', function($rootScope, $mdDialog, DateResource, RefreshTokenResource, constants, $location, JsonWebTokenService, ProfileResource) {

        var authDetails = {},
            listeners = {};

        this.getAuthDetails = function() {
            return authDetails;
        }

        this.addLoginErrorListener = function(key, listener) {
            listeners[key] = listener;
        };

        this.executeListener = function(key, values) {
            listeners[key](values);
        };

        this.setNewToken = function(response) {
            _setNewToken(response.token);
        }

        this.getDate = function() {
            var parts = authDetails.currentDate.split('/');
            var today = new Date(parts[2], parts[1] - 1, parts[0]);
            return today;
        }

        this.refreshToken = function() {
            RefreshTokenResource.get(function(response) {
                _setNewToken(response);
            });
        }

        /**
         * Set authentification details to local storage
         */
        this.succesfullAuth = function(authResponse) {
            if (authResponse && authResponse.token) {
                JsonWebTokenService.setWebTokens(authResponse.token);
                _getProfile();
            }
        };
        /**
         * Do logout from application
         */
        this.doLogout = function() {
            this.authDetails = {};
            $rootScope.isLoggedIn = false;
            $mdDialog.cancel();
            JsonWebTokenService.emptyStorage();
            $location.path(constants.DefaultLogoutRedirect);
        };

        /**
         * Get profile information from jwt
         * Call get menu for selected user
         * @returns {undefined}
         */
        function _getProfile() {
            ProfileResource.get(function(profile) {
                $rootScope.isLoggedIn = true;
                authDetails = angular.copy(profile);
                $location.path(constants.DefaultLoginRedirect);

            }, function(error) {
                throw "Profile can't be retrieved, please check token presence and validity.";
            });
        };

        /**
         * Check if the token has needed authorities
         * @param {type} authorities
         * @param {type} check
         * @returns {Boolean}
         */
        function searchAuthority(authorities, check) {
            for (var i = 0; i < authorities.length; i++) {
                if (String(authorities[i].authority).toUpperCase() == String(check).toUpperCase()) {
                    return false;
                }
            }
            return true;
        }

        /**
         * To be used in conjunction with ng-hide for rights
         * @param {type} check
         * @returns {Boolean}
         */
        $rootScope.contains = function(check) {
            if (authDetails && authDetails.authorities) {
                if (!check) {
                    var path = (String)($location.path()).substring(1, $location.path().length);
                    var camelCased = path.replace(/-([a-z])/g, function(g) {
                        return g[1].toUpperCase();
                    });
                    check = 'ROLE_' + camelCased;
                }
                return searchAuthority(authDetails.authorities, check);
            } else {
                return true;
            }
        }

        this.hasRights = function() {
            DateResource.get(function(data) {
                authDetails.currentDate = data.currentDate;
            });
            $location.path(constants.DefaultLoginRedirect);
        }

        this.noRightsAssigned = function() {
            $location.path('/no-grant'); 
        };

        function _setNewToken(response) {
            console.log("NEW TOKEN IS SET SUCCESFULLY.");
            JsonWebTokenService.setWebTokens(response.token);
        }

    });