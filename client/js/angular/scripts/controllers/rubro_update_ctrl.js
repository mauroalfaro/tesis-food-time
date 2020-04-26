//$('.select').select2();

angular
  .module('foodtimeApp')
  .controller('RubroUpdateCtrl', ['$scope', '$http', '$window', '$state', '$stateParams',
    function($scope, $http, $window, $state, $stateParams){

        $scope.id= $stateParams.objId;

		$scope.rubro=$http
            .get('/api/rubros/'+$scope.id)
            .then(function(response){                
				$scope.rubro=response.data;				
            })
            .catch(function(error){
                console.log(error);
            })


        	$scope.cargar = function(){
				
                var obj =
                {
                   descripcion: $scope.rubro.descripcion,                  
                };
                var res = $http.put('/api/rubros/'+$scope.id,obj );
                res.success(function(data, status, headers, config) {

					$state.go('main.rubros');
                });
                res.error(function(data, status, headers, config) {
                });
                
			}

	}]);
