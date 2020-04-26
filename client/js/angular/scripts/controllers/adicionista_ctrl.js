   
angular
  .module('foodtimeApp')
  .controller('AdicionistaCtrl', ['$scope', '$http', '$window', 'AdicionistaDatos','UserSession', '$rootScope', '$state',
    function($scope, $http, $window , AdicionistaDatos, UserSession, $rootScope, $state){

      $scope.data = AdicionistaDatos.getData();
      $scope.mesaSelected = null;
      moment.locale('es'); 



  /*  $('#pnotify-solid-custom').on('click', function () {
        new PNotify({
            title: 'Custom color notice',
            text: 'Check me out! I\'m a notice.',
            addclass: 'bg-teal'
        });
    });*/

      var socket = io.connect('/');
      socket.on('CobrarMesa', function (data) {        
        console.log(data);  
          new PNotify({
              title: 'Mesa ' + data.numero + ' ' + '('  + data.seccion.descripcion  +  ')',
              text: 'El mozo ' + data.mozo.name + ' ' + data.mozo.surname + ' solicita cobrar la mesa',
              icon: 'icon-info22',
              hide: false,
              addclass: 'bg-teal'
              //type: 'info'              
          });       
          console.log(data);
      });

      socket.on('SaldoCuentaCorriente', function (data) {        
        console.log(data);  
          new PNotify({
              title: 'Cuenta Corriente ' + data.descripcion,
              text: 'El saldo de la cuenta corriente es de ' + data.deuda + ' pesos',
              icon: 'icon-info22',
              hide: false,
              type: 'info',
              addClass : 'bg-notifaction-naranja'              
          });       
          console.log(data);
      });



      UserSession.getUser().then(function(response){
        $scope.data.user = response.data;                           
      })
      .catch(function(error){
        console.log(error);
      });    
      
      $scope.agregarItem = function(item){
        if($scope.mesaSelected.pedido.productos){
          $scope.mesaSelected.pedido.productos.push(item);
        }else{

        }                
      }
      $scope.mostrarItem = function(item){
        return item.carta;
      }

      $scope.borrarItem = function(index){
          $scope.mesaSelected.pedido.productos.splice(index,1);       
      }      
      $scope.toLocalTime = function(time){        
          return moment(time).format('LT');
      }
      
      $scope.seleccionarMesa = function(mesa){
        $scope.mesaSelected = mesa;
      }

      $scope.getNumeroFactura = function(){
        
        if($scope.pago && $scope.pago.pagoId){
          var str = "" + $scope.pago.pagoId;
          var pad = "00000";
          var ans = pad.substring(0, pad.length - str.length) + str;

          return ans;
          
        }else{
          return "";
        }

      }      

      $scope.confirmarPago = function(){
     //   $('#confirmarPago').button('loading');
        var res = $http.post('/api/pagos',$scope.pago );
        res.success(function(data, status, headers, config) {
        
            if($scope.mediodepago.description == 'Cuenta Corriente'){

               $scope.acreditarSaldo(); 
            }
console.log($scope.mesaSelected.pedido.productos);
            var res = $http.put('/api/modificarstock', $scope.mesaSelected.pedido.productos);
            res.success(function(data, status, headers, config) {                                                

            });       

            $scope.pago = data;
            $scope.mesaSelected.estado = 'cerrada';
            $scope.mesaSelected.pedido = {};

            var res2 = $http.put('/api/mesas/'+$scope.mesaSelected._id,$scope.mesaSelected);
            res2.success(function(data, status, headers, config) {                                           
                AdicionistaDatos.recargarMesas();                				
                $('#confirmarPago').button('success');
            //    $('#confirmarPago').prop('disabled',true);
            });            

        });      
        res.error(function(data, status, headers, config) {       
         // $('#confirmarPago').button('reset');            
        //  $('#confirmarPago').prop('disabled',true); 
        });	  
      }

      $scope.updatePedido = function(){
          $('#confirm-products').button('loading');

          var now = new Date(); 
          
          $scope.mesaSelected.pedido.fechaSolicitud = now;

console.log($scope.mesaSelected.pedido)
          var res = $http.put('/api/pedidos/'+$scope.mesaSelected.pedido._id, $scope.mesaSelected.pedido);
            res.success(function(data, status, headers, config) {                                                
              
                var res2 = $http.put('/api/mesas/'+$scope.mesaSelected._id,$scope.mesaSelected);
                res2.success(function(data, status, headers, config) {                   
                    console.log(data);				
                    $('#confirm-products').button('reset');
                });

            });                 
        }

       $scope.imprimirPago = function(){
           $window.print();
       }
            

      $scope.acreditarSaldo = function(){
  
          var res2 = $http.put('/api/acreditarcuentacorriente/'+$scope.pago.cliente.ctacte._id,{saldo:$scope.getTotal()});
          res2.success(function(data, status, headers, config) {                                           
              
          }); 
      }


     $scope.crearPedido = function(){
        $scope.mesaSelected.estado = "abierta"; 
        var obj = {
            mozo: $scope.mesaSelected.mozo,	
            mesa: $scope.mesaSelected,
            comentarios : $scope.mesaSelected.pedido.comentarios,
            //cliente : $scope.mesa.cliente,
            estado: "nuevo",
            cantPersonas : $scope.mesaSelected.pedido.personas,
        };

        var res = $http.post('/api/pedidos',obj );
        res.success(function(data, status, headers, config) {
                        
            $scope.mesaSelected.pedido = data;            
            
            var res2 = $http.put('/api/mesas/'+$scope.mesaSelected._id,$scope.mesaSelected);
            res2.success(function(data, status, headers, config) {                                           
                AdicionistaDatos.recargarMesas();                
            });            

        });      
        res.error(function(data, status, headers, config) {                    
        });	 

        console.log($scope.formAltaPedido);
        $scope.formAltaPedido.personas.$pristine = true;
        //$scope.formAltaPedido.$valid = true; 
     }      
      
      $scope.abrirMesa = function(){

        $scope.mesaSelected.estado = 'libre';               
        var res2 = $http.put('/api/mesas/'+$scope.mesaSelected._id,$scope.mesaSelected);
        res2.success(function(data, status, headers, config) {                                           
            AdicionistaDatos.recargarMesas();                				            
        });                                  
      }


      $scope.cobrarMesa = function(item){
        if($scope.mesaSelected != null && $scope.mesaSelected.estado == 'abierta'){
           
          $scope.pago = {
            pedido : $scope.mesaSelected.pedido,
            cajero : $scope.data.user,
            cliente : $scope.cliente,
            mediodepago : $scope.mediodepago,                
            importe : $scope.getTotal(),
            fecha : moment.utc().format()
          };  
                      
          $('#invoice').modal();
        }
      }

      $scope.convertToLocalTime = function(date){
        return moment(date).format('LLLL');
      }

      $scope.getTotal = function(){
          var total = 0;

          if($scope.mesaSelected && $scope.mesaSelected.estado == 'abierta' && $scope.mesaSelected.pedido.productos){
            for(var i=0;$scope.mesaSelected.pedido.productos.length>i;i++){
                total = total + $scope.mesaSelected.pedido.productos[i].precio;
            }
          }
          return total;
      }

      $scope.toTimestamp = function(mesa) {
          if($scope.mesaSelected != null && $scope.mesaSelected.estado == 'abierta'){                  
         /* var now = new Date();
          var diff = now - new Date(mesa.pedido.fechaInicio);
          var minutes = Math.round(diff /1000 / 60);
          return minutes + " minutos";*/

          return moment($scope.mesaSelected.pedido.fechaInicio).fromNow();

          }                        
      }

      $('#invoice').on('hidden.bs.modal', function () {    
        $('#confirmarPago').button('reset');
      });
    
  }])