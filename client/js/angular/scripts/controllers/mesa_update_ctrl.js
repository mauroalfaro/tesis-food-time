//$('.select').select2();
    
angular
  .module('foodtimeApp')
  .controller('MesaUpdateCtrl', ['$scope', '$http', '$window', '$state', '$stateParams',
    function($scope, $http, $window, $state, $stateParams){
		       		
		var id=$stateParams.objId;


	$scope.mozos = new Array();

			
			$scope.init = function(){
				$http
				.get('/api/mesas/'+id)
				.then(function(response){
					
					$scope.mesa=response.data;
					console.log($scope.mesa);
				})
				.catch(function(error){
					console.log(error);
				})
				
				$http
				.get('/api/secciones')
				.then(function(response){
					$scope.secciones=response.data;
					console.log(response);
				})
				.catch(function(error){
					console.log(error);
				})

				$http
					.get('/api/mozos')
					.then(function(response){
						$scope.mozos=response.data;
						$scope.mesa.mozo = $scope.mozos.filter(function(mozo){
							return mozo._id == $scope.mesa.mozo._id;
						})[0]
	

					}).catch(function(error){
						console.log(error);
					})
				}
                            
        	
        	$scope.cargar = function(){
                var obj = 
                {
                    seccion: {descripcion:$scope.mesa.seccion.descripcion},
					numero: $scope.mesa.numero,
					capMaxima: $scope.mesa.capMaxima,
					mozo: {
						_id: $scope.mesa.mozo._id,
						name: $scope.mesa.mozo.name,
						surname: $scope.mesa.mozo.surname,
						email: $scope.mesa.mozo.email,
						gender: $scope.mesa.mozo.gender,
						password: $scope.mesa.mozo.password,
						userType: $scope.mesa.mozo.userType,
						dni: $scope.mesa.mozo.dni,
						cuil: $scope.mesa.mozo.cuil,
						province: $scope.mesa.mozo.province,
						locality: $scope.mesa.mozo.locality,
						street: $scope.mesa.mozo.street,
						number: $scope.mesa.mozo.number,
					},
					estado: $scope.mesa.estado,
                };
                    
                var res = $http.put('/api/mesas/'+id,obj );
                res.success(function(data, status, headers, config) {
                    
                    console.log(data);
					$state.go('main.mesas');
                });
                res.error(function(data, status, headers, config) {                    
                });		  	               
			}
   
	}]);
