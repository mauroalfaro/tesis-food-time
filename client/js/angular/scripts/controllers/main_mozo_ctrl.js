   
angular
  .module('foodtimeApp')
  .controller('MainMozoCtrl', ['$scope', '$http', '$window', '$rootScope', '$state', 'MozoDatos',
    function($scope, $http, $window , $rootScope, $state, MozoDatos){

        $scope.data = MozoDatos.getData();        
        
        $scope.logout = function(){
          $http.get('/logout');

          $window.location = '/';
        }



        var socket = io.connect('/');
        socket.on('PedidoListo', function (data) {   
          debugger;     
          console.log(data);
          if($scope.data.user._id == data.mesa.mozo._id){  
            new PNotify({
                title: 'Mesa ' + data.mesa.numero,
                text: 'La cocina ya tiene el pedido de la mesa <font color="green"><b>Listo</b></font>',
                icon: 'icon-info22',
                hide: false,
                type: 'info'              
            });
          }
        });
                
        socket.on('PedidoCancelado', function (data) {   
          debugger;     
          console.log(data);
          if($scope.data.user._id == data.mesa.mozo._id){  
            new PNotify({
                title: 'Mesa ' + data.mesa.numero,
                text: 'La cocina ha  <font color="red"><b>cancelado</b></font> el pedido',
                icon: 'icon-info22',
                hide: false,
                type: 'info'              
            });
          }
        });  




    
    $scope.verMesa = function(obj){
				if(obj.estado == 'abierta'){
          $state.go('mainMozo.mesa',{mesaId: obj._id});  
        }else if(obj.estado == 'libre'){
          $state.go('mainMozo.mesanueva',{mesaId: obj._id});
        }
		}         
  }])
