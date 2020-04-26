   
angular
  .module('foodtimeApp')
  .controller('MesaNuevaMozoCtrl', ['$scope', '$http', '$window', 'UserSession', '$rootScope', '$state', 'MozoDatos','$stateParams',
    function($scope, $http, $window , UserSession, $rootScope, $state, MozoDatos, $stateParams){

      $scope.data = MozoDatos.getData();
      $scope.mesa = {};
      $scope.mesa.pedido = {};
      

      $http
          .get('/api/mesas/'+$stateParams.mesaId)
          .then(function(response){              
            $scope.mesa=response.data;
            //limpio el objeto pedido ya q voy a generar un pedido nuevo
            $scope.mesa.pedido={};
          
          })
          .catch(function(error){
              console.log(error);
          })      

     $scope.crearPedido = function(){
        $scope.mesa.estado = "abierta"; 
        var obj = {
            mozo: $scope.mesa.mozo,	
            mesa: $scope.mesa,
            comentarios : $scope.mesa.pedido.comentarios,
            //cliente : $scope.mesa.cliente,
            estado: "nuevo",
            cantPersonas : $scope.mesa.pedido.personas,
        };

        var res = $http.post('/api/pedidos',obj );
        res.success(function(data, status, headers, config) {
                        
            $scope.mesa.pedido = data;            
            
            var res2 = $http.put('/api/mesas/'+$scope.mesa._id,$scope.mesa);
            res2.success(function(data, status, headers, config) {                                           
                MozoDatos.recargarMesas();
                $state.go('mainMozo.mesa',{mesaId: $scope.mesa._id});				
            });            

        });      
        res.error(function(data, status, headers, config) {                    
        });	  
     }

  }])
