//$('.select').select2();
    
angular
  .module('foodtimeApp')
  .controller('MateriasPrimasAltaCtrl', ['$scope', '$http', '$window','$state',
    function($scope, $http, $window, $state){

                       	
        	$scope.cargar = function(){

                var obj = 
                {
					descripcion: $scope.materiaprima.descripcion,
					cantidadActual: $scope.materiaprima.cantidadActual,
					unidadMedida: $scope.materiaprima.unidadMedida,
					puntoReposicion: $scope.materiaprima.puntoReposicion,
                };
                    
                var res = $http.post('/api/materiasprimas',obj );
                res.success(function(data, status, headers, config) {
                    
                    console.log(data);
                    $state.go('main.materiasprimas');
                });
                res.error(function(data, status, headers, config) {                    
                });		  

			}

/*
            function sendMessage(obj) {
                socket.emit('news', { data: obj });
            }*/


   
	}]);
