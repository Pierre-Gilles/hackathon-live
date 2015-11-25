
(function () {
    'use strict';

    angular
        .module('hackathonUTC')
        .controller('projectCtrl', projectCtrl);

    projectCtrl.$inject = ['$scope','projectService', '$localStorage'];

    function projectCtrl($scope, projectService, $localStorage) {
        
		/* jshint validthis: true */
        var vm = this;
        
		vm.project = [];

        activate();

        function activate() {
            getProjects();
            waitForChanges();
        }
		
		function getProjects(){
            projectService.getProjects()
                .then(function(data){
                   vm.projects = data.data; 
                });
        }
        
        function createProject(name, repository){
            projectService.createProject(name, repository, $localStorage.token)
                .then(function(data){
                   console.log(data.data); 
                });
        }
        
        function waitForChanges(){
            
            // on change server side, we are notified
            io.socket.on('newScore', function (data) {
                $scope.$apply(function () {
                    updateElement(data);
                    console.log(data);
                });
            }); 
        }
        
        /**
         * Find one element by its ID and update it 
         */
        function updateElement(score){
            var found = false;
            var i = 0;
            while(!found && i < vm.projects.length){
                if(vm.projects[i].id === score.team){
                    found = true;
                    vm.projects[i].points = score.points;
                }
                i++;
            }
        }

    }
})();