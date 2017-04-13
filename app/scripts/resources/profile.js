/**
 * Get person profile information
 * @type type
 */
angular.module('jwtApp')
    .service('ProfileResource', function profileResource(settings, $resource) {
        var profileResources = $resource(settings.protocol + settings.api + 'rest/me', {}, {});
        return profileResources;
    });