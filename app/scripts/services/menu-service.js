/**
 * Used for menu management
 * @type type
 */
angular.module('jwtApp')
    .service('MenuService', function($route, $location, JsonWebTokenService, $rootScope) {

        var listeners = {},
            hash, route;

        var requirements = {
            authenticated: function(event) {

                var token = JsonWebTokenService.getWebTokens().jwtToken;

                if (token) {
                    return true;
                } else {
                    console.log("YOU MUST BE LOGGED IN, IN ORDER TO ACCESS THIS PAGE");
                    event.preventDefault();
                    return false;
                }

            }
        };

        this.executeListener = function(key) {
            if (listeners[key]) {
                return listeners[key];
            } else {
                throw "Listener not registered";
            }
        };

        var checkRequirements = function(requirement, event) {
            return requirements[requirement](event);
        };

        var checkLocationPermission = function(event, next, current) {
            hash = next.substr(next.indexOf('#') + 1);

            //not logged in, therefore you can't access anything except login page
            if (!$rootScope.isLoggedIn && hash != '/') {
                event.preventDefault();
                $location.path("/");
                return;
            } else
            if ($rootScope.isLoggedIn && hash === '/') {
                event.preventDefault();
                $location.path('firstPage');
                return;
            }

            route = null;

            for (var key in $route.routes) {
                if ($route.routes[key].originalPath == hash) {
                    route = $route.routes[key];
                    if (route.requires) {
                        for (var i = 0; i < route.requires.length; i++) {
                            var res = checkRequirements(route.requires[i], event);
                            if (res) {
                                continue;
                            } else {
                                break;
                            }
                        }
                    }
                    break;
                };
            };

        };



        $rootScope.$on('$locationChangeStart', checkLocationPermission);


    });