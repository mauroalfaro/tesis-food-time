angular
  .module('foodtimeApp')
  .controller('RecetasAltaCtrl', ['$scope', '$http', '$window','$state',
    function($scope, $http, $window, $state){
$scope.mpreceta = new Array();

			$scope.init = function(){
							$scope.materiasprimas=$http
        	.get('/api/materiasprimas')
        	.then(function(response){
        		$scope.materiasprimas=response.data;        		
        	})
        	.catch(function(error){
        		console.log(error);
        	})
			}
			
			$scope.agregarMP = function(mp){
				if(mp.cantidadNecesaria > 0){
									 var mp = 
                {
					_id: $scope.materiaprima._id,
					descripcion: $scope.materiaprima.descripcion,
					cantidadNecesaria: $scope.materiaprima.cantidadNecesaria,
					unidadMedida: $scope.materiaprima.unidadMedida,
                };
				$scope.mpreceta.push(mp);
				console.log($scope.mpreceta);
				}
			}
			
			$scope.borrarMP = function(mp){
			      var index = ($scope.mpreceta.indexOf(mp));
				  console.log(index);
				  $scope.mpreceta.splice(index,1);
			}
                       	
        	$scope.cargar = function(){

                var obj = 
                {
					descripcion: $scope.receta.descripcion,
					materiasprimas: $scope.mpreceta,
                };
                    
                var res = $http.post('/api/recetas',obj );
                res.success(function(data, status, headers, config) {
                    
                    console.log(data);
                    $state.go('main.recetas');
                });
                res.error(function(data, status, headers, config) {                    
                });		  

			}

/*
            function sendMessage(obj) {
                socket.emit('news', { data: obj });
            }*/


   
	}]);