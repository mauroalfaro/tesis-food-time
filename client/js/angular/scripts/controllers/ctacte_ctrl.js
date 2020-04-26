//$('.select').select2();
    
angular
  .module('foodtimeApp')
  .controller('CtacteAltaCtrl', ['$scope', '$http', '$state',
    function($scope, $http, $state){
    

	
 $scope.clientes;
 $scope.list = new Array();

   
   	   		$scope.init = function(){
				$scope.edit=false;
			var date = new Date();

				
	        $scope.clientes=$http
        	.get('/api/clientes')
        	.then(function(response){
        		$scope.clientes=response.data;
				console.log($scope.FromDate);
        		console.log($scope.clientes);
        	})
        	.catch(function(error){
        		console.log(error);
        	})
		}
  
    $scope.ctactes;

        
        	$scope.cargar = function(){

                var obj = 
                {
                   
                    numero: $scope.ctacte.numero,
					descripcion: $scope.ctacte.descripcion,
					deuda: $scope.ctacte.deuda,
					clientes: new Array(),
                };
                    
                var res = $http.post('/api/cuentasCorrientes',obj);
                res.success(function(data, status, headers, config) {
                    console.log(obj);
					$state.go('main.ctactes');
                });         

			}    
 

   
  }]);
