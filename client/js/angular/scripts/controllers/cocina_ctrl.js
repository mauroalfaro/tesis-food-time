   
angular
  .module('foodtimeApp')
  .controller('CocinaCtrl', ['$scope', '$http', '$window', 'CocinaDatos', '$rootScope', '$state',
    function($scope, $http, $window , CocinaDatos, $rootScope, $state){

      $scope.data = CocinaDatos.getData();
      
      $scope.mostrarPedidosNuevos = function(item){
        return item.estado == 'nuevo';
      }

      $scope.mostrarPedidosListos = function(item){
        return item.estado == 'listo';
      }

      $scope.mostrarItem = function(item){
        return item.cocina;
      }

      $scope.toTimestamp = function(item) {
        if(item != null){                  
          var now = new Date();
          var diff = now - new Date(item.fechaSolicitud);
          var minutes = Math.round(diff /1000 / 60);
          return minutes + " minutos";
        }        
      }

    $scope.servirPedido = function(pedido) {

        pedido.estado = 'listo';   

        var res = $http.put('/api/pedidolisto/'+pedido._id, pedido);
        res.success(function(data, status, headers, config) {                                                              
            var res2 = $http.put('/api/mesaactualizarpedido/'+pedido.mesa._id,pedido);
            res2.success(function(data, status, headers, config) {                   
                console.log(data);				
            });
        });      
    }
    
    $scope.cancelarPedido = function(pedido) {

        pedido.estado = 'cancelado';
        var res = $http.put('/api/pedidocancelado/'+pedido._id, pedido);
        res.success(function(data, status, headers, config) {                                                              
            var res2 = $http.put('/api/mesaactualizarpedido/'+pedido.mesa._id,pedido);
            res2.success(function(data, status, headers, config) {                   
                console.log(data);				
            });
        });              
      
    }



  }])
