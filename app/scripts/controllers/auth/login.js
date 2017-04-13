'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the jwtApp
 * Responsible for login page management
 */

angular.module('jwtApp')
    .controller('LoginCtrl', function($scope, $timeout, $exceptionHandler, AuthService, RestLoginResource) {


        var functions = {
            init: function() {
                $scope.login = {};
                $scope.errors = [];
                AuthService.addLoginErrorListener('authErr', functions.addError);
            },
            addError: function(err) {
                $scope.errors.push(err);
            },
            clearErrors: function() {
                $scope.loginPressed = true;
                $scope.errors = [];
            }
        }


        $scope.scopedFunctions = {
            submit: function() {
                functions.clearErrors();
                if ($scope.loginForm.$valid) {

                    RestLoginResource.save($scope.login, function(response) {

                        AuthService.succesfullAuth(response);

                    }, function(errorResponse) {
                        $exceptionHandler("An error has occurred.\nHTTP error: " + errorResponse.status + " on login submit() " + " (" + errorResponse.statusText + ")");
                    });
                }
            }
        };


    });