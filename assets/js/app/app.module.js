/**
 * Hackathon UTC 2015 
 * @author: Pierre-Gilles Leymarie
 */
 
(function() {
    'use strict';

    angular
        .module('hackathonUTC', ['ngStorage']);
        
    angular
        .module('hackathonUTC')
        .constant('BASE_API', 'http://localhost:1337');
})();