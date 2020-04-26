angular
  .module('foodtimeApp')
  .controller('MainCtrl', ['$scope', '$http', '$window', 'UserSession', '$rootScope', '$state',
    function($scope, $http, $window , UserSession, $rootScope, $state){

       UserSession.getUser().then(function(response){
           $scope.user =response.data;    
          /*if($scope.user.userType == "Administrador"){
            
            $http
              .get('/api/chequearstock')
              .then(function(response){   
                debugger;                     					
              });     
          }*/                             		
        })
        .catch(function(error){
          console.log(error);
        });     

        $scope.logout = function(){
          $http.get('/logout');

          $window.location = '/';
        }

        $scope.goTo = function(){
            if($scope.user.userType == "Administrador"){
              $state.go('main.dashboard');
            }else if($scope.user.userType == "Encargado"){
              $state.go('main.cocina');
            }else if($scope.user.userType == "Mozo"){
              $state.go('mainMozo');
            }else if($scope.user.userType == "Adicionista"){
              $state.go('main.adicionista');
            }
        }  


        $rootScope.$on('userChange', function(event, message) {
          UserSession.getUser().then(function(response){
              data.user =response.data;                      		
            })
            .catch(function(error){
              console.log(error);
            });         
        });

        
        var socket = io.connect('/');	
        socket.on('connect', function () {
          // socket connected
          if($scope.user.userType == "Administrador"){
            
            $http
              .get('/api/chequearstock')
              .then(function(response){   
                debugger;                     					
              });     
          }
        });
        socket.on('MateriaPrimaAgotada', function (data) {  
          if($scope.user.userType == 'Administrador'){     
            console.log(data);              
              new PNotify({
                  title: 'Informe de STOCK',
                  text: 'La materia prima <b>' + data.descripcion + '</b> se encuentra por debajo del nivel de reposición. Punto de reposición: <b>'  + data.puntoReposicion + ' ' + data.unidadMedida + '</b>. Cantidad actual: <b>'+ Math.round(data.cantidadActual) + ' ' + data.unidadMedida + '</b>',
                  icon: 'icon-warning22',                  
                  hide: false,
                  type: 'warning'              
              });            
          }
        });

   
  }]);
