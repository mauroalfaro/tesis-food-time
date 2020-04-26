//$('.select').select2();

angular
  .module('foodtimeApp')
  .controller('RecetasUpdateCtrl', ['$scope', '$http', '$window', '$state', '$stateParams',
    function($scope, $http, $window, $state, $stateParams){

       // console.log($stateParams);

		var id=$stateParams.objId;
		
		$scope.mpreceta = new Array();

		$scope.receta=$http
            .get('/api/recetas/'+id)
            .then(function(response){
                
				$scope.receta=response.data;
				$scope.mpreceta=$scope.receta.materiasprimas;
				console.log($scope.receta);
				console.log($scope.mpreceta);
            })
			$scope.materiasprimas=$http
        	.get('/api/materiasprimas')
        	.then(function(response){
        		$scope.materiasprimas=response.data;        		
        	})
        	.catch(function(error){
        		console.log(error);
        	})
            .catch(function(error){
                console.log(error);
            })

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
                    
                var res = $http.put('/api/recetas/'+id,obj );
                res.success(function(data, status, headers, config) {
                    
                    console.log(data);
                    $state.go('main.recetas');
                });
                res.error(function(data, status, headers, config) {                    
                });		  

			}



          /*  var socket = io.connect('http://localhost:3000/');
           socket.on('asd', function (data) {
                alert('llego una notificacion');
                console.log(data);
            });*/

           /* function sendMessage(obj) {
                socket.emit('news', { data: obj });
            }*/



	}]);
