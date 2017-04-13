'use strict';

/**
 *Settings for application deployment
 */
angular.module('jwtApp')
    .constant('settings', {
        api: 'localhost:8080/jwt/',
        protocol: 'http://'
    });