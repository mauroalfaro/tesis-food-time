//$('.select').select2();
    
angular
  .module('foodtimeApp')
  .controller('MesaAltaCtrl', ['$scope', '$http', '$state',
  function($scope, $http, $state){
    
        
	
    $scope.mesas;
	$scope.mozos = new Array();
   
			
	$scope.init = function(){
		$scope.secciones=$http
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
		}).catch(function(error){
			console.log(error);
		})
		}

                             
	$scope.cargar = function(){
		var obj = 
		{
			seccion: {descripcion:$scope.mesa.seccion.descripcion},
			numero: $scope.mesa.numero,
			nombre: "Mesa " + $scope.mesa.numero,

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
			estado: "libre",
		};
			
		var res = $http.post('/api/mesas',obj );
		res.success(function(data, status, headers, config) {
			
			console.log(data);
			$state.go('main.mesas');
		});
		res.error(function(data, status, headers, config) {

			alert( "failure message: " + JSON.stringify({data: data}));
		});		  
	}      

   
  }]);
