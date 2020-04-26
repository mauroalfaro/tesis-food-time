//$('.select').select2();

angular
  .module('foodtimeApp')
  .controller('ProductoUpdateCtrl', ['$scope', '$http', '$window', '$state', '$stateParams',
    function($scope, $http, $window, $state, $stateParams){

		var ids= $stateParams.obj;			
		var rubroid = ids.substr(0, ids.indexOf('-')); 
		var productoid = ids.substr(ids.indexOf('_'));
		var productoid = productoid.substr(1, ids.indexOf('_'));
		var subrubroid = ids.substring(ids.lastIndexOf("-")+1,ids.lastIndexOf("_"))
		
		
		$scope.subrubros = new Array();
		$scope.subrubro;
		$scope.rubro;
		$scope.productos;
		$scope.producto;

		$scope.edit=true;
		

		$http
			.get('/api/recetas')
			.then(function(response){
				$scope.recetas  = response.data; 			
			});
		
		$http
			.get('/api/rubros')
			.then(function(response){
				$scope.rubros  = response.data; 

				$scope.rubro = $scope.rubros.filter(function(rubro){
					return rubroid == rubro._id;
				})[0];

				$scope.subrubros = $scope.rubro.subrubros;
				for (i = 0; i < $scope.subrubros.length; i++) {
					if ($scope.subrubros[i]._id == subrubroid)
					{
						$scope.subrubro=$scope.subrubros[i];
						$scope.productos=$scope.subrubro.productos;						
					}
				}
				for (i = 0; i < $scope.productos.length; i++) {
					if($scope.productos[i]._id==productoid){						
						$scope.producto=$scope.productos[i];
						$scope.receta=$scope.producto.receta;
					}
				}
								
				$scope.receta = $scope.recetas.filter(function(receta){
					return $scope.receta._id == $scope.receta._id; 					
				})[0];							
			});									

		$scope.cargar = function(){

			for (i = 0; i < $scope.productos.length; i++) {
				if ($scope.productos[i]._id == $scope.producto._id)
				{
						$scope.productos[i]= $scope.producto;
				}
		}
		
		$scope.subrubros.productos=$scope.productos;		
		
		var obj = 
		{
				descripcion: $scope.rubro.descripcion,
				subrubros: $scope.subrubros,
		}


			console.log(obj);
			var res = $http.put('/api/rubros/'+idrubro,obj );
			res.success(function(data, status, headers, config) {
				console.log(data);
				$state.go('main.productos');
			});
			res.error(function(data, status, headers, config) {
		});
		}



		var socket = io.connect('http://localhost:3000/');
		socket.on('asd', function (data) {
			alert('llego una notificacion');
			console.log(data);
		});       

	}]);
