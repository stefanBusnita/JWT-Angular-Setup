/**
 * Application wide constants
 * @type type
 */
angular.module('jwtApp').constant('constants', function() {
    var NumericBooleanFlag = {
            YES: 1,
            NO: 0
        },
        FATAL_ERROR_CODE = -1,
        JWT_TOKEN_EXPIRED = '3',
        HTTP_CODES = { UNAUTHORIZED: 401, SERVER_ERROR: 500, FORBIDDEN: 403, OK: 200, CONFLICT: 409 },
        DEFAULT_LOGIN_REDIRECT = '/firstPage',
        DEFAULT_LOGOUT_REDIRECT = '/'

    return {
        FatalError: FATAL_ERROR_CODE,
        HttpCodes: HTTP_CODES,
        DefaultLoginRedirect: DEFAULT_LOGIN_REDIRECT,
        DefaultLogoutRedirect: DEFAULT_LOGOUT_REDIRECT,
        TokenExpired: JWT_TOKEN_EXPIRED
    };
}());