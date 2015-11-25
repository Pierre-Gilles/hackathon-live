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
            getParticipants: getParticipants,
            createProject: createProject,
            createParticipant: createParticipant,
            addScore: addScore
        };

        return service;

        function getProjects() {
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
        
        function getParticipants(token){
            var headers = {};
            headers.Authorization = token;
             return $http({method: 'GET', url: '/participant/index', headers: headers}).
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
        
        function createParticipant(participant, token){
            var headers = {};
            headers.Authorization = token; 
            
            return $http({method: 'POST', url: '/participant/create', headers: headers, data: participant}).
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
        
        function createProject(project, token) {
            var headers = {};
            headers.Authorization = token;
 
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
        
        function addScore(team, points , token){
            var headers = {};
            headers.Authorization = token; 
            
            return $http({method: 'POST', url: '/score/create', headers: headers, data: {team:team, points:points}}).
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