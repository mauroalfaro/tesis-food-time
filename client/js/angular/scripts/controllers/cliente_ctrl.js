//$('.select').select2();
    
angular
  .module('foodtimeApp')
  .controller('ClienteAltaCtrl', ['$scope', '$http', '$state',
    function($scope, $http, $state){
  
	$scope.ctacte;
    $scope.clientes;
	$scope.gender="m";
	
		$scope.init = function(){

	        $scope.ctactes=$http
        	.get('/api/cuentasCorrientes')
        	.then(function(response){
        		$scope.ctactes=response.data;
        		console.log(response.data);
        	})
        	.catch(function(error){
        		console.log(error);
        	})
		}
		

			$scope.cargar = function(cta){
				
				console.log(cta);
				
                var obj = 
                {
                    name: $scope.cliente.name,
					surname: $scope.cliente.surname,
					gender: $scope.gender,
					dni: $scope.cliente.dni,
					cuil: $scope.cliente.cuil,
					phone: $scope.cliente.phone,
					ctacte: $scope.ctacte
                };
				
				
				var res = $http.post('/api/clientes',obj );
                res.success(function(data, status, headers, config) {
                    
                   console.log(data);
				   $state.go('main.clientes');

				   if (cta!=null) {
					   				   cta.clientes.push(data);
				   console.log(cta);
					   var res2 = $http.put('/api/cuentasCorrientes/'+cta._id,cta);
				   res2.success(function(data, status, headers, config) {
                    
                    console.log(data);
                res2.error(function(data, status, headers, config) {

                    alert( "failure message: " + JSON.stringify({data: data}));
                });
                });
				   }

				res.error(function(data, status, headers, config) {

                    alert( "failure message: " + JSON.stringify({data: data}));
                });		
                });
				/*var res2 = $http.put('/api/cuentasCorrientes/'+cta._id,cta);
				   res2.success(function(data, status, headers, config) {
                    
                    console.log(data);
                res2.error(function(data, status, headers, config) {

                    alert( "failure message: " + JSON.stringify({data: data}));
                });
                });*/

				
				
				/* var res2 = $http.put('/api/cuentasCorrientes/'+cta._id,cta);
                res2.success(function(data, status, headers, config) {
                    
                    console.log(data);
					$state.go('main.clientes');
                });
                res2.error(function(data, status, headers, config) {

                    alert( "failure message: " + JSON.stringify({data: data}));
                });*/		 
				

				
				                    
 

			}
                        
 

   
  }]);
