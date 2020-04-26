
angular
  .module('foodtimeApp')
  .controller('UsuarioGrillaCtrl', ['$scope', '$http','UserSession', '$state',
    function($scope, $http, UserSession, $state){

		$scope.usuarios=[];
		$scope.filteredUsuarios = []
		,$scope.currentPage = 1
		,$scope.numPerPage = 10				
		,$scope.maxSize = 5;

		$scope.numPages = function () {
			return Math.ceil($scope.usuarios.length / $scope.numPerPage);
		};

        var user = UserSession.getUser();       

		$scope.init = function(){
	        $http
        	.get('/api/usuarios')
        	.then(function(response){
        		$scope.usuarios=response.data;
				$scope.totalItems = $scope.usuarios.length;
				$scope.$watch('currentPage + numPerPage', function() {
					var begin = (($scope.currentPage - 1) * $scope.numPerPage)
					, end = begin + $scope.numPerPage;										
					$scope.filteredUsuarios = $scope.usuarios.slice(begin, end);
				});
        	})
        	.catch(function(error){
        		console.log(error);
        	})
		}


	  $scope.borrar=function(id){
		  console.log(id);
		    var res = $http.delete('/api/usuarios/'+id);
            res.success(function(data, status, headers, config) {
                console.log("se borro" + id);
				$scope.init();
				$state.go('main.usuarios');
            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });
	  }

      $scope.init();

      $scope.update=function(obj){
          $state.go('main.usuariosModificar',{objId: obj._id});
      }
	  	  		
  }]);
