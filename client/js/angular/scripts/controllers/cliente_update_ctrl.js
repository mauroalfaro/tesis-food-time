//$('.select').select2();

angular
  .module('foodtimeApp')
  .controller('ClienteUpdateCtrl', ['$scope', '$http', '$window', '$state', '$stateParams',
    function($scope, $http, $window, $state, $stateParams){

       // console.log($stateParams);

		var id=$stateParams.objId;

		$scope.cliente=$http
            .get('/api/clientes/'+id)
            .then(function(response){

				$scope.cliente=response.data;				
				console.log($scope.ctacte);
				$scope.gender=$scope.cliente.gender;
            })
            .catch(function(error){
                console.log(error);
            })
			
			$scope.ctactes=$http
        	.get('/api/cuentasCorrientes')
        	.then(function(response){
        		$scope.ctactes=response.data;
				$scope.ctacte = $scope.ctactes.filter(function(ctate){
					return ctate._id == $scope.cliente.ctacte._id;
				})[0]
        	})
        	.catch(function(error){
        		console.log(error);
        	})

        	$scope.cargar = function(){
			
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

				
				var res = $http.put('/api/clientes/'+$scope.cliente._id,obj );
                res.success(function(data, status, headers, config) {                    				
                   console.log(data);
				  $scope.ctacte.clientes.push(data);
				   //console.log(cta);
				   res2 = $http.put('/api/cuentasCorrientes/'+$scope.ctacte._id,$scope.ctacte);
				   res2.success(function(data, status, headers, config) {
                    
                    console.log(data);
					$state.go('main.clientes');
                });
                res2.error(function(data, status, headers, config) {

                    alert( "failure message: " + JSON.stringify({data: data}));
                });
                });
                res.error(function(data, status, headers, config) {

                    alert( "failure message: " + JSON.stringify({data: data}));
                });	

                //sendMessage(obj);
			}





	}]);
