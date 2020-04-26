//$('.select').select2();

angular
  .module('foodtimeApp')
  .controller('SeccionUpdateCtrl', ['$scope', '$http', '$window', '$state', '$stateParams',
    function($scope, $http, $window, $state, $stateParams){

       // console.log($stateParams);

		var id=$stateParams.objId;

		$scope.seccion=$http
            .get('/api/secciones/'+id)
            .then(function(response){
                
				$scope.seccion=response.data;
				//console.log($scope.mediodepago);
            })
            .catch(function(error){
                console.log(error);
            })


        	$scope.cargar = function(){

                var obj = 
                {
						descripcion: $scope.seccion.descripcion,
					
                };
                var res = $http.put('/api/secciones/'+id,obj );
                res.success(function(data, status, headers, config) {

                    console.log(data);
					$state.go('main.secciones');
                });
                res.error(function(data, status, headers, config) {
                });

                //sendMessage(obj);
			}



	}]);
