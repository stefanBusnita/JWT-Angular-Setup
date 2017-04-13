/**
 * Resource used for login page
 * @type type
 */
angular.module('jwtApp')
    .service('RestLoginResource', function loginResource(settings, $resource) {
        var loginResources = $resource(settings.protocol + settings.api + 'login/', {}, {});
        return loginResources;
    });