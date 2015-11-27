/**
 * Hackathon UTC 2015 
 * @author: Pierre-Gilles Leymarie
 */

(function () {
    'use strict';

    angular
        .module('hackathonUTC')
        .factory('adminService', adminService);

    adminService.$inject = ['$http', 'BASE_API'];

    function adminService($http, BASE_API) {

        var service = {
           	login: login
        };

        return service;

        function login(name, password) {
			var data = {
				name:name,
				password: password
			};
           return $http({method: 'POST', url: '/admin/login', data: data}).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    return data;
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }
    }
})();