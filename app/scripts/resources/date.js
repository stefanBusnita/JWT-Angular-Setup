/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('jwtApp')
    .service('DateResource', function loginResource(settings, $resource) {
        var resources = $resource(settings.protocol + settings.api + 'rest/current-date', {}, {});
        return resources;
    });