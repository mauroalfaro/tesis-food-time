//$('.select').select2();

angular
  .module('foodtimeApp')
  .controller('MateriasPrimasUpdateCtrl', ['$scope', '$http', '$window', '$state', '$stateParams',
    function($scope, $http, $window, $state, $stateParams){

       // console.log($stateParams);

		var id=$stateParams.objId;
		$scope.edit=true;

		$scope.materiaprima=$http
            .get('/api/materiasprimas/'+id)
            .then(function(response){
                
				$scope.materiaprima=response.data;
				//console.log($scope.mediodepago);
            })
            .catch(function(error){
                console.log(error);
            })


        	$scope.cargar = function(){

                var obj = 
                {
					descripcion: $scope.materiaprima.descripcion,
					cantidadActual: $scope.materiaprima.cantidadActual,
					unidadMedida: $scope.materiaprima.unidadMedida,
					puntoReposicion: $scope.materiaprima.puntoReposicion,
                };
                    
                var res = $http.put('/api/materiasprimas/'+id,obj );
                res.success(function(data, status, headers, config) {
                    
                    console.log(data);
                    $state.go('main.materiasprimas');
                });
                res.error(function(data, status, headers, config) {                    
                });		  

			}



            var socket = io.connect('http://localhost:3000/');
           socket.on('asd', function (data) {
                alert('llego una notificacion');
                console.log(data);
            });

           /* function sendMessage(obj) {
                socket.emit('news', { data: obj });
            }*/



	}]);
