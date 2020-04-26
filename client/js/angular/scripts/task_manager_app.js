//$('.select').select2();
    
angular
  .module('taskManagerApp',[])
  .controller('MyTaskManagerAppCtrl', function($scope/*, $http*/){
        $scope.mesaClassContainer = 'panel panel-white';
    
  $scope.mesas = [
    {nombre: 'Mesa 1', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 2', seccion: 'Salon', personas: 0, estado: 'pedido cocina' },
    {nombre: 'Mesa 3', seccion: 'Salon', personas: 0, estado: 'cocina ok' },
    {nombre: 'Mesa 4', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 5', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 6', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 7', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 8', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 9', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 10', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 11', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 12', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 13', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 14', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 15', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 16', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 17', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 18', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 19', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 20', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 21', seccion: 'Salon', personas: 0, estado: 'abierta' },
    {nombre: 'Mesa 22', seccion: 'Salon', personas: 0, estado: 'abierta' },
  ]

 	$scope.mostrarInfoMesa = function($event){
    	console.log($event);
      $scope.mesaClassContainer = $($event.currentTarget).attr('class') == 'panel' ? 'panel panel-white' : $($event.currentTarget).attr('class');
      $scope.mesa = $($event.currentTarget).find('h6').text();
    };
    
 	$scope.enviar = function(){
    	console.log($scope.form);

    };

    
    
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
/*
.animation('.slide', [function() {
  return {
    // make note that other events (like addClass/removeClass)
    // have different function input parameters
    enter: function(element, doneFn) {
      jQuery(element).fadeIn(1000, doneFn);

      // remember to call doneFn so that angular
      // knows that the animation has concluded
    },

    move: function(element, doneFn) {
      jQuery(element).fadeIn(1000, doneFn);
    },

    leave: function(element, doneFn) {
      jQuery(element).fadeOut(1000, doneFn);
    }
  }
}])
*/