'use strict';

/**
 * @ngdoc service
 * @name jwtApp.jsonWebToken
 * @description
 * # jsonWebToken
 * Service in the jwtApp user for local storage of the web tokens.
 */
angular.module('jwtApp')
    .service('JsonWebTokenService', function() {

        var webTokens = {};


        this.setWebTokens = function(jwtToken) {
            webTokens = {
                jwtToken: jwtToken
            };
        };

        this.getWebTokens = function() {
            return webTokens;
        };

        this.emptyStorage = function() {
            webTokens = {};
        };

    });