//$('.select').select2();
    
angular
  .module('foodtimeApp')
  .controller('SeccionAltaCtrl', ['$scope', '$http', '$state',
  function($scope, $http, $state){
    
    
    $scope.submitForm = function(isValid) {

		// check to make sure the form is completely valid
		if (isValid) { 
			alert('Alta de seccion');
		}
    }
  
    $scope.secciones;
	
			$scope.init = function(){
	        $scope.mesas=$http
        	.get('/api/mesas')
        	.then(function(response){
        		$scope.mesas=response.data;
        		console.log(response);
        	})
        	.catch(function(error){
        		console.log(error);
        	})
		}
   
			$scope.cargar = function(){

                var obj = 
                {
                   descripcion: $scope.seccion.descripcion,
					
                };
                    
                var res = $http.post('/api/secciones',obj );
                res.success(function(data, status, headers, config) {
                    
                    console.log(data);
					$state.go('main.secciones');
                });
	  

			}      

 


   
}]);
