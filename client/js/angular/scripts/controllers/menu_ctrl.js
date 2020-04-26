//$('.select').select2();
    
angular
  .module('foodtimeApp')
  .controller('MenuAltaCtrl', ['$scope', '$http', '$state',
  function($scope, $http, $state){
    
		
	$scope.subrubros = new Array();
	$scope.productos = new Array();
	$scope.menus = new Array();
    $scope.producto;
	$scope.list;
	var idrubro;
	var idsubrubro;

		$scope.init = function(){
	        $scope.rubros=$http
        	.get('/api/rubros')
        	.then(function(response){
        		$scope.rubros=response.data;
				$scope.rubrosprod=response.data;
				console.log($scope.rubros);


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
					console.log($scope.subrubros[i]._id);
					$scope.menus=$scope.subrubros[i].menus;
					console.log($scope.menus);
				}
			}
		}
		
			$scope.mostrarSubrubrosProd = function(id){
			for (i = 0; i < $scope.rubros.length; i++) {
				if ($scope.rubrosprod[i]._id == id)
				{
					console.log($scope.rubrosprod[i].descripcion);
					$scope.rubroprod = $scope.rubrosprod[i];
					$scope.subrubrosprod = $scope.rubroprod.subrubros;
				//	console.log($scope.rubroprod);
					//console.log($scope.subrubrosprod);
					
				}
			}
		}
		
		$scope.seleccionarSubrubroProd = function(id){
			console.log(id);
			for (i = 0; i < $scope.subrubrosprod.length; i++) {
				if ($scope.subrubrosprod[i]._id == id)
				{
					console.log($scope.subrubrosprod[i].productos);
					$scope.productosprod=$scope.subrubrosprod[i].productos;
					
					console.log($scope.productosprod);
				}
			}
		}
            
			$scope.cargar = function(){
				console.log($scope.list);
                var menu = 
                {
					descripcion: $scope.menu.descripcion,
					precio: $scope.menu.precio,
					productos : $scope.list,
                };
				console.log(menu);
				
			$scope.menus.push(menu);
		//	console.log($scope.menus);
			for (i = 0; i < $scope.subrubros.length; i++) {
				if ($scope.subrubros[i]._id == idsubrubro)
				{
					$scope.subrubros[i].menus=$scope.menus;
					console.log($scope.subrubros[i].menus);
				}
			}
			
			//console.log($scope.subrubros.menus);
			
			var obj = 
			{
				    descripcion: $scope.rubro.descripcion,
                   subrubros: $scope.subrubros,
			}
			console.log(obj);

				console.log(obj);
				console.log(idrubro);
                var res = $http.put('/api/rubros/'+idrubro,obj );
                res.success(function(data, status, headers, config) {
                    console.log(data);
					$state.go('main.menus');
                });
                res.error(function(data, status, headers, config) {
			});  
			} 	        
 

   
  }]);
