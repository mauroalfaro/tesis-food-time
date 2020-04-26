//$('.select').select2();

angular
  .module('foodtimeApp')
  .controller('RubroAltaCtrl', ['$scope', '$http', '$state',
  function($scope, $http, $state){   

		$scope.cargar = function(){
			
                var obj =
                {
                   descripcion: $scope.rubro.descripcion,
                };

                var res = $http.post('/api/rubros',obj );
                res.success(function(data, status, headers, config) {

                    console.log(data);
					$state.go('main.rubros');
                });   
		}        
/*
			$scope.cargar = function(){
			
				
				 angular.forEach($scope.subrubros, function($value, $key) {
                var subrubro =
                {
					_id: $value._id,
                   descripcion: $value.descripcion,
                };
					$scope.list.push(subrubro);
					console.log($scope.list);
				});
                var obj =
                {
                   descripcion: $scope.rubro.descripcion,
                   //subrubros: $scope.list
                };

                var res = $http.post('/api/rubros',obj );
                res.success(function(data, status, headers, config) {

                    console.log(data);
					$state.go('main.rubros');
                });
                res.error(function(data, status, headers, config) {

                    alert( "failure message: " + JSON.stringify({data: data}));
                });

			}*/
  }]);
