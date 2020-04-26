//$('.select').select2();

angular
  .module('foodtimeApp')
  .controller('bandaHorariaUpdateCtrl', ['$scope', '$http', '$window', '$state', '$stateParams',
    function($scope, $http, $window, $state, $stateParams){

       // console.log($stateParams);

		var id=$stateParams.objId;

		$scope.bandahoraria=$http
            .get('/api/bandasHorarias/'+id)
            .then(function(response){
                
				$scope.bandahoraria=response.data;
				//console.log($scope.bandahoraria);
            })
            .catch(function(error){
                console.log(error);
            })


        	$scope.cargar = function(){

                var obj =
                {

                    description: $scope.bandahoraria.descripcion,
					variacion: $scope.bandahoraria.variacion,
                };

                var res = $http.put('/api/bandasHorarias/'+id,obj );
                res.success(function(data, status, headers, config) {

                    console.log(data);
					$state.go('main.bandashorarias');
                });
                res.error(function(data, status, headers, config) {
                });

                //sendMessage(obj);
			}



	}]);
