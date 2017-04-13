/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('jwtApp')
    .service('LoggingResource', function loggingResource(settings, $resource) {
        var resources = $resource(settings.protocol + settings.api + 'rest/log-error', {}, {});
        return resources;
    });