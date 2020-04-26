//$('.select').select2();
    
angular
  .module('foodtimeApp')
  .controller('ProductoAltaCtrl', ['$scope', '$http', '$state',
  function($scope, $http, $state){
    
    
	$scope.subrubros = new Array();
	$scope.productos = new Array();
    $scope.producto;
	var idrubro;
	var idsubrubro;

		$scope.init = function(){
	        $scope.rubros=$http
        	.get('/api/rubros')
        	.then(function(response){
        		$scope.rubros=response.data;
				console.log($scope.rubros);


        	})
			$scope.recetas=$http
        	.get('/api/recetas')
        	.then(function(response){
        		$scope.recetas=response.data;
				console.log($scope.recetas);


        	})
        	.catch(function(error){
        		console.log(error);
        	})
		}
		
		$scope.mostrarSubrubros = function(id){
			idrubro = id;
			console.log(idrubro);
			for (i = 0; i < $scope.rubros.length; i++) {
				if ($scope.rubros[i]._id == id)
				{
					console.log($scope.rubros[i].descripcion);
					$scope.subrubros=$scope.rubros[i].subrubros;
					console.log($scope.subrubros);
				}
			}
		}
		
		$scope.seleccionarSubrubro = function(id){
			idsubrubro = id;
			console.log(idsubrubro);
			for (i = 0; i < $scope.subrubros.length; i++) {
				if ($scope.subrubros[i]._id == id)
				{
					$scope.productos=$scope.subrubros[i].productos;
					console.log($scope.productos);
				}
			}
		}

        	
        	$scope.cargar = function(){
				
                var prod = 
                {
                   codigo : $scope.producto.codigo,
				   descripcion : $scope.producto.descripcion,
				   unidadMedida : $scope.producto.unidadMedida,
				   carta : $scope.producto.carta,
				   cocina: $scope.producto.cocina,
				   menu: $scope.producto.menu,
				   receta: $scope.receta,
				   precio : $scope.producto.precio,
                };
				
			$scope.productos.push(prod);
			console.log($scope.productos);
			$scope.subrubros.productos=$scope.productos;
			console.log($scope.subrubros.productos);
			
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

   
  }]);
