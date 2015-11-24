
(function () {
    'use strict';

    angular
        .module('hackathonUTC')
        .controller('projectCtrl', projectCtrl);

    projectCtrl.$inject = ['projectService'];

    function projectCtrl(projectService) {
        
		/* jshint validthis: true */
        var vm = this;
        
		vm.project = [];

        activate();

        function activate() {
            getProjects();
        }
		
		function getProjects(){
            projectService.getProjects()
                .then(function(data){
                   vm.projects = data.data; 
                });
        }

    }
})();