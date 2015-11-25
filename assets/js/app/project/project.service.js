/**
 * Hackathon UTC 2015 
 * @author: Pierre-Gilles Leymarie
 */

(function () {
    'use strict';

    angular
        .module('hackathonUTC')
        .factory('projectService', projectService);

    projectService.$inject = ['$http'];

    function projectService($http) {

        var service = {
            getProjects: getProjects,
            create: create
        };

        return service;

        function getProjects(sensor) {
           return $http({method: 'GET', url: '/Score/index'}).
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
        
        function create(name, repo, token) {
            var headers = {};
            headers.Authorization = token;
            
            var project = {
                name:name, 
                repository: repo
            };
            return $http({method: 'POST', url: '/team/create', headers: headers, data: project}).
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