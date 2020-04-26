//$('.select').select2();
    
angular
  .module('foodtimeApp')
  .controller('LoginCtrl', ['$scope', '$http', '$state', 'UserSession',
    function($scope, $http, $state, UserSession){
    
    $scope.email = '';
    $scope.password = '';
    $scope.invalidUser = false;
        
    $scope.logChange = function() {
      $scope.invalidUser = false;
    }

    
   /* var socket = io.connect('/');	
    socket.on('MateriaPrimaAgotada', function (data) {  
      if($scope.user.userType == 'Administrador'){     
        console.log(data);              
          new PNotify({
              title: 'Informe de STOCK',
              text: 'La materia prima <b>' + data.descripcion + '</b> se encuentra por debajo del nivel de reposición. Punto de reposición: <b>'  + data.puntoReposicion + ' ' + data.unidadMedida + '</b>. Cantidad actual: <b>'+data.cantidadActual + ' ' + data.unidadMedida + '</b>',
              icon: 'icon-warning22',                  
              hide: false,
              type: 'warning'              
          });            
      }
    });*/

    $scope.submitLogin = function() {

        var res = $http.post('/login',{email: $scope.email, password :  $scope.password} );        
              res.success(function(data, status, headers, config) {                                        
                    UserSession.loadUser(data.user);
                    
                    $scope.user = data.user;

                    if(data.user.userType == "Administrador"){                      

                      $state.go('main.dashboard');

                    }else if(data.user.userType == "Encargado"){
                      $state.go('main.cocina');
                    }else if(data.user.userType == "Mozo"){
                      $state.go('mainMozo');
                    }else if(data.user.userType == "Adicionista"){
                      $state.go('main.adicionista');
                    }
                                     
                });
                res.error(function(data, status, headers, config) {                    
                  $scope.invalidUser = true;
                });		 
  
    }
    
        	
       
 

   
  }]);
