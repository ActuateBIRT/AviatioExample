'use strict';

/* Services */


var myApp = angular.module('myApp.services', []);

myApp.service('dataService', function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.callService = function(url, dataType, method, data, headers) {
        // $http() returns a $promise that we can add handlers with .then()
        
        if (method === "GET") {
                return $http({
                    url: url,
                    dataType: dataType,
                    method: method,
                    params: data,
                    headers: headers
                });
            } else {
                return $http({
                    url: url,
                    dataType: dataType,
                    method: method,
                    data: data,
                    headers: headers
                });
            }
    }
});