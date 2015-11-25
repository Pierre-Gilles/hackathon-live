
(function () {
    'use strict';

    angular
        .module('hackathonUTC')
        .controller('adminCtrl', adminCtrl);

    adminCtrl.$inject = ['$scope','adminService', 'projectService', '$localStorage'];

    function adminCtrl($scope, adminService, projectService, $localStorage) {
        
		/* jshint validthis: true */
        var vm = this;
        
        // functions
        vm.login = login;
        vm.logout = logout;
        vm.createParticipant = createParticipant;
        vm.createProject = createProject;
        vm.refreshProject = refreshProject;
        
        // variables
        vm.errors = null;
        vm.loggedIn = loggedIn();
  
        vm.participants = [];
        vm.projects = [];
        
        vm.newProject = {};
        vm.newParticipant = {};
        
        activate();

        function activate() {
            getProjects();
            waitForChange();
            if(vm.loggedIn){
                 getParticipants();
            }
        }
        
        function loggedIn (){
            if($localStorage.token){
                return true;
            }else{
                return false;
            }
        }
        
        function waitForChange(){
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
		
		function login(name, password){
            return adminService.login(name, password)
                .then(function(data){
                    if(data.data && data.data.token){
                       $localStorage.token = data.data.token;
                       vm.loggedIn = true;
                       vm.errors = null;
                       console.log('Welcome ' + name + ', connected with success');
                       activate();
                    }
                })
                .catch(function(err){
                    vm.errors = 'Wrong name/password';
                });
        }
        
        function logout(){
            $localStorage.token = null;
            vm.loggedIn = false;
            vm.errors = null;
        }
        
                
        function getParticipants() {
            projectService.getParticipants($localStorage.token)
                .then(function(data){
                   vm.participants = data.data; 
                });
        }
        
        function createParticipant(participant){
            projectService.createParticipant(participant, $localStorage.token)
                .then(function(data){
                       //vm.participants.push(data.data);
                       getParticipants();
                       vm.newParticipant.name = '';
                })
                .catch(function(err){
                    console.log(err.data);
                });
        }
        
        function createProject(project){
            projectService.createProject(project, $localStorage.token)
                .then(function(data){
                    vm.projects.push(data.data); 
                    vm.newProject.name = '';
                    vm.newProject.repository = '';
                });
        }
        
        function getProjects(){
            projectService.getProjects()
                .then(function(data){
                   vm.projects = data.data; 
                });
        }
        
        function refreshProject(repository){
            projectService.refreshProject(repository)
                .then(function(data){
                    console.log(data.data); 
                });
        }
        
        
       
    }
})();