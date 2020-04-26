//$('.select').select2();

angular
  .module('foodtimeApp')
  .controller('UsuarioPerfilCtrl', ['$scope', '$http', '$state', 'UserSession',
    function($scope, $http, $state, UserSession){

            $scope.userPassword = '';
            $scope.newPassword = '';

            $http
                .get('/currentuser')
                .then(function(response){
                    $scope.usuario=response.data;            
                })
                .catch(function(error){
                    console.log(error);
                });
/*
            UserSession.getUser().then(function(response){
            $scope.userUpdated =response.data;       
            console.log(response.data); 		
            })
            .catch(function(error){
            console.log(error);
            });
*/

            $scope.updateProfile = function(){

                $scope.usuario.name = $scope.usuario.name;
                $scope.usuario.surname = $scope.usuario.surname;                    
                $scope.usuario.gender = $scope.usuario.gender;                  
                $scope.usuario.dni = $scope.usuario.dni;
                $scope.usuario.cuil = $scope.usuario.cuil;
                $scope.usuario.province = $scope.usuario.province;
                $scope.usuario.locality = $scope.usuario.locality;
                $scope.usuario.street = $scope.usuario.street;
                $scope.usuario.number = $scope.usuario.number;

                var res = $http.put('/api/usuarios/'+$scope.usuario._id,$scope.usuario );
                res.success(function(data, status, headers, config) {

                    UserSession.loadUser();
                    $scope.$emit('userChange');
                    

                    $state.go('main.dashboard');
                });

            }

            $scope.updatePassword = function(){

                var res = $http.put('/api/changePassword/'+$scope.usuario._id,{ id: $scope.usuario._id, userPassword : $scope.userPassword, newPassword : $scope.newPassword , email : $scope.usuario.email } );
                res.success(function(data, status, headers, config) {
                    
                    console.log(data);
                    $state.go('login');
                });
                
                 
            }


	}]);
