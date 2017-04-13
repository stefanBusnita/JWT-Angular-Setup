/**
 * First page demo.
 */
angular.module('jwtApp')
    .controller('FirstPageCtrl', function($scope,Flash, AuthService,PermissionsTestResource, $exceptionHandler, AuthService) {

        var functions = {
            init: function() {
                $scope.authDetails = AuthService.getAuthDetails();
                $scope.retrievedData = "";
            },
            parseResult : function(result){
                Flash.create('info', result);
            }
        }

        $scope.pageFunctions = {
            getUserData : function(){
                PermissionsTestResource.get({type: 1},function(data){
                    functions.parseResult(data.response);
                },function(error){
                    functions.parseResult("Check console for 401");
                    //$exceptionHandler("An error has occurred.\nHTTP error: " + errorResponse.status + " on firstPage  " + " (" + errorResponse.statusText + ")");
                });
            },
            getGuestData : function(){
                PermissionsTestResource.get({type: 2},function(data){
                  functions.parseResult(data.response);
                },function(error){
                 functions.parseResult("Check console for 401");
                    //$exceptionHandler("An error has occurred.\nHTTP error: " + errorResponse.status + " on firstPage  " + " (" + errorResponse.statusText + ")");
                });
            },
            logout : function(){
                AuthService.doLogout();
            },
            getAdminData : function(){
                PermissionsTestResource.get({type: 3},function(data){
                  functions.parseResult(data.response);
                },function(error){
                 functions.parseResult("Check console for 401");
                    //$exceptionHandler("An error has occurred.\nHTTP error: " + errorResponse.status + " on firstPage  " + " (" + errorResponse.statusText + ")");
                });
            },
            refreshToken : function(){
                AuthService.refreshToken();
            }
        };


        functions.init();

    });