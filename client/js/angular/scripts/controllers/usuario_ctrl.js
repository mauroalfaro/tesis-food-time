
//$('.select').select2();
    
angular
  .module('foodtimeApp')
  .controller('UsuarioAltaCtrl', ['$scope', '$http', '$state',
    function($scope, $http, $state){
    
    $scope.usuarios;
		$scope.gender="m";
	$scope.edit=false;
   
    $scope.cargar = function(){


        var obj = 
        {
            
            name: $scope.usuario.name,
            surname: $scope.usuario.surname,
            email: $scope.usuario.email,
            gender: $scope.gender,
            password: $scope.usuario.password,
            userType: $scope.usuario.userType,
            dni: $scope.usuario.dni,
            cuil: $scope.usuario.cuil,
            province: $scope.usuario.province,
            locality: $scope.usuario.locality,
            street: $scope.usuario.street,
            number: $scope.usuario.number,
            
        };
            //console.log($scope.usuario.userType.description);
        var res = $http.post('/api/usuarios',obj );
        res.success(function(data, status, headers, config) {
            
            console.log(data);
            $state.go('main.usuarios');
        });
        res.error(function(data, status, headers, config) {

        });		  

    }

        
            
    /*var res = $http.put('/api/clientes/57f04e8e5e81ba1ee818659e',obj);
            res.success(function(data, status, headers, config) {
                
                console.log(data);
            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });    

    var res = $http.delete('/api/clientes/57f04e8e5e81ba1ee818659e',obj);
            res.success(function(data, status, headers, config) {
                
                console.log(data);
            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });     */                                   
 

   
  }]);
