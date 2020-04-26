//$('.select').select2();

angular
  .module('foodtimeApp')
  .controller('MenuUpdateCtrl', ['$scope', '$http', '$window', '$state', '$stateParams',
    function($scope, $http, $window, $state, $stateParams){

		var ids= $stateParams.obj;
		console.log(ids);
	
		var rubroid = ids.substr(0, ids.indexOf('-')); 
		var menuid = ids.substr(ids.indexOf('_'));
		var menuid = menuid.substr(1, ids.indexOf('_'));
		var subrubroid = ids.substring(ids.lastIndexOf("-")+1,ids.lastIndexOf("_"))
		//var subrubroid = subrubroid.substr(ids.indexOf('_'));
		
		console.log(rubroid);
		console.log(subrubroid);
		console.log(menuid);
		
		$scope.subrubros=new Array();
		$scope.subrubro;
		$scope.rubro;
		$scope.menus;
		$scope.menu;
		$scope.productos;
		$scope.producto;

	   		$scope.init = function(){
			$scope.edit=true;
			$scope.rubros=$http
        	.get('/api/rubros')
        	.then(function(response){
        		$scope.rubros=response.data;
        	})
			$scope.rubros=$http
		     .get('/api/rubros/'+rubroid)
            .then(function(response){
				$scope.rubro=response.data;
				console.log($scope.rubro);
				$scope.subrubros = $scope.rubro.subrubros;
				for (i = 0; i < $scope.subrubros.length; i++) {
					if ($scope.subrubros[i]._id == subrubroid)
					{
						$scope.subrubro=$scope.subrubros[i];
						$scope.menus=$scope.subrubro.menus;
						console.log($scope.menus);
					}
            }
				for (i = 0; i < $scope.menus.length; i++) {
					if($scope.menus[i]._id==menuid){
						console.log($scope.menus[i]);
						$scope.menu=$scope.menus[i];
							}
				}
			})	
            .catch(function(error){
                console.log(error);
            })
			}


        	$scope.cargar = function(){

				var subr = {
					descripcion: $scope.menu.subrubro.descripcion,
				}
                var obj = 
                {
					subrubro: subr,
                   descripcion: $scope.menu.descripcion,
				   precio: $scope.menu.precio,
				   productos: $scope.productosMenu,
					
                };

                var res = $http.put('/api/menus/'+id,obj );
                res.success(function(data, status, headers, config) {

                    console.log(data);
					$state.go('main.menus');
                });
                res.error(function(data, status, headers, config) {
                });

                //sendMessage(obj);
			}





	}]);
