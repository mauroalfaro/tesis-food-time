   
angular
  .module('foodtimeApp')
  .controller('MesaMozoCtrl', ['$scope', '$http', '$window', 'UserSession', '$rootScope', '$state', 'MozoDatos','$stateParams',
    function($scope, $http, $window , UserSession, $rootScope, $state, MozoDatos, $stateParams){

      $scope.data = MozoDatos.getData();
      $scope.mesa = null;      
      $scope.rubro = {};

      moment.locale('es');
      var socket = io.connect('http://localhost:3000/');

      $scope.pedirCobroDeMesa = function(){  
      
          socket.emit('pedirCobroDeMesa',  $scope.mesa );
      }



      $http
          .get('/api/mesas/'+$stateParams.mesaId)
          .then(function(response){              
            $scope.mesa=response.data;                        
            if(!$scope.mesa.pedido.productos){
              $scope.mesa.pedido.productos = [];
            }
          })
          .catch(function(error){
              console.log(error);
          })      

      $scope.agregarItem = function(item){
        if($scope.mesa.pedido.productos){
          $scope.mesa.pedido.productos.push(item);
        }else{

        }                
      }

      $scope.toLocalTime = function(time){        
          return moment(time).format('LT');
      }

      $scope.mostrarItem = function(item){
        return item.carta;
      }

      $scope.borrarItem = function(index){
		   var index = ($scope.mesa.pedido.productos.indexOf(index));
          $scope.mesa.pedido.productos.splice(index,1);       
      }

      $scope.getTotal = function(){
          var total = 0;

          if($scope.mesa){
            for(var i=0;$scope.mesa.pedido.productos.length>i;i++){
                total = total + $scope.mesa.pedido.productos[i].precio;
            }
          }
          return total;
      }

        $scope.updatePedido = function(){
          $('#confirm-products').button('loading');

          var now = new Date(); 
          
          $scope.mesa.pedido.fechaSolicitud = now;

          var res = $http.put('/api/pedidos/'+$scope.mesa.pedido._id, $scope.mesa.pedido);
            res.success(function(data, status, headers, config) {                                                
              
                var res2 = $http.put('/api/mesas/'+$scope.mesa._id,$scope.mesa);
                res2.success(function(data, status, headers, config) {                   
                    console.log(data);				
                    $('#confirm-products').button('reset');
                });

            });       

             
        }

      $scope.toTimestamp = function() {
        if($scope.mesa != null){     
          debugger;   
         /* var dateSplitted = $scope.mesa.pedido.fechaInicio.split('-'); // date must be in DD-MM-YYYY format
          var formattedDate = dateSplitted[1]+'/'+dateSplitted[0]+'/'+dateSplitted[2];
          var now = new Date();
          var diff = now - new Date($scope.mesa.pedido.fechaInicio);
          var minutes = Math.round(diff /1000 / 60);
          return minutes;*/
          return moment($scope.mesa.pedido.fechaInicio).fromNow();
        }        
      };
      /*	$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
          $('.select').select2();
        });*/


  }])
