//$('.select').select2();
    
angular
  .module('bandaHorariaApp',[])
  .controller('bandaHorariaCtrl', function($scope/*, $http*/){
    
    
    
    $scope.submitForm = function(isValid) {

		// check to make sure the form is completely valid
		if (isValid) { 
			alert('Alta de rubro');
		}
    }
  
//  $scope.mesaSelected = {};
  /*
  $scope.seleccionarMesa = function(mesa){
    $scope.mesaSelected = mesa;
  }*/
  
  
  /*

 	$scope.mostrarInfoMesa = function($event){
    	console.log($event);
      $scope.mesaClassContainer = $($event.currentTarget).attr('class') == 'panel' ? 'panel panel-white' : $($event.currentTarget).attr('class');
      $scope.mesa = $($event.currentTarget).find('h6').text();
    };
    
 	$scope.enviar = function(){
    	console.log($scope.form);

    };

    */
    
/*
    $http
    	.get('./scripts/personas.json')
    	.then(function(response){
    		$scope.personas = response.data;
    		console.log(response);
    	})
    	.catch(function(){
    		console.log(error);
    	})*/

   
  })
