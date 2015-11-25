
(function () {
    'use strict';

    angular
        .module('hackathonUTC')
        .controller('adminCtrl', adminCtrl);

    adminCtrl.$inject = ['$scope','adminService', 'projectService', '$localStorage'];

    function adminCtrl($scope, adminService, projectService, $localStorage) {
        
		/* jshint validthis: true */
        var vm = this;
        vm.login = login;
        vm.logout = logout;
        vm.errors = null;
        vm.loggedIn = loggedIn();

        activate();
        

        function activate() {
            
        }
        
        function loggedIn (){
            if($localStorage.token){
                return true;
            }else{
                return false;
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
       
    }
})();