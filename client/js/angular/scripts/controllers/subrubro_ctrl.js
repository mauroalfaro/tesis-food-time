//$('.select').select2();
    
angular
  .module('foodtimeApp')
  .controller('SubrubroAltaCtrl', ['$scope', '$http', '$state',
  function($scope, $http, $state){	
  
    $scope.subrubro;
//	$scope.subrubros = new Array();	
$scope.edit = false;			
	
	$http
		.get('/api/rubros')
		.then(function(response){
			$scope.rubros=response.data;
			console.log(response);
		})
		.catch(function(error){
			console.log(error);
		})	
		

		$scope.cargar = function(){
	
			// si no tiene creada la coleccion la creio			
			$scope.rubro.subrubros.push($scope.subrubro);
			

		
			var res = $http.put('/api/rubros/'+$scope.rubro._id,$scope.rubro);
			res.success(function(data, status, headers, config) {
				console.log(data);
				$state.go('main.subrubros');
			});			
		}             
  }]);





/*



	
    $scope.subrubro;
	$scope.subrubros = new Array();
	
	
		
	   		$scope.init = function(){
	        $scope.rubros=$http
        	.get('/api/rubros')
        	.then(function(response){
        		$scope.rubros=response.data;
        		console.log(response);
			})
        	.catch(function(error){
        		console.log(error);
        	})
		}
		

		$scope.cargar = function(){
			var subr = {
				descripcion: $scope.subrubro.descripcion,
			};
			
			$scope.subrubros = $scope.rubro.subrubros;
			$scope.subrubros.push(subr);
			
			console.log($scope.subrubros);
			var id=$scope.rubro._id;
			$scope.rubro=$http
		     .get('/api/rubros/'+$scope.rubro._id)
            .then(function(response){
                
				$scope.rubro=response.data;
            })
            .catch(function(error){
                console.log(error);
            })

				var obj=
				{
					subrubros: $scope.subrubros,
				};

				console.log(obj);
                var res = $http.put('/api/rubros/'+id,obj );
                res.success(function(data, status, headers, config) {
                    console.log(data);
					$state.go('main.subrubros');
                });
                res.error(function(data, status, headers, config) {
                });
		}   


*/