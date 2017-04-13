/**
 * USED ONLY FOR DEVELOPMENT PURPOSES
 * @type type
 */
angular.module('jwtApp')
    .service('PermissionsTestResource', function permissionsTestResource(settings, $resource) {
        var permissionsTestResource = $resource(settings.protocol + settings.api + 'rest/permissions-data', {}, {});
        return permissionsTestResource;
    });