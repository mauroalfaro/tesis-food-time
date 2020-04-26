//$('.select').select2();
    
angular
  .module('foodtimeApp')
  .controller('bandaHorariaAltaCtrl', ['$scope', '$http', '$state', '$stateParams',
    function($scope, $http, $state, $stateParams){
    
    
 
    $scope.submitForm = function(isValid) {

		// check to make sure the form is completely valid
		if (isValid) { 
			alert('Alta de cliente');
		}
    }
  
    $scope.ctactes;
   
   
        $http
        	.get('/api/bandasHorarias')
        	.then(function(response){
        		
        		console.log(response);
        	})
        	.catch(function(error){
        		console.log(error);
        	})
 
        	$scope.cargar = function(){

                var obj = 
                {
                   
                    descripcion: $scope.bandahoraria.descripcion,
					desde: $scope.bandahoraria.desde,
					hasta: $scope.bandahoraria.hasta,
					variacion: $scope.bandahoraria.variacion,
                };
                    
                var res = $http.post('/api/bandasHorarias',obj );
                res.success(function(data, status, headers, config) {
                    console.log(obj);
                    console.log(data);
					$state.go('main.bandashorarias');
                });
                res.error(function(data, status, headers, config) {

                    alert( "failure message: " + JSON.stringify({data: data}));
                });		  

                
			}     
 

   
  }]);
