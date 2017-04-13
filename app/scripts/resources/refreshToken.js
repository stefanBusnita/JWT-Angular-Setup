/**
 * Access refresh token in order to renew claims in token and receive a new valid token
 * @type type
 */
angular.module('jwtApp')
    .service('RefreshTokenResource', function refreshToken(settings, $resource) {
        var refreshTokens = $resource(settings.protocol + settings.api + 'rest/auth/token', {}, {});
        return refreshTokens;
    });