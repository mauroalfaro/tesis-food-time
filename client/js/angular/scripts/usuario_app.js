//$('.select').select2();
    
angular
  .module('usuarioAltaApp',[])
  .controller('UsuarioAltaCtrl', function($scope, $http){
    
    
    
    $scope.submitForm = function(isValid) {

		// check to make sure the form is completely valid
  		if (isValid) { 
  			alert('Alta de usuario!!!!!');
  		}
    }
    
    $scope.usuarios;
   
  
        $http
        	.get('/api/usuarios')
        	.then(function(response){
        		
        		console.log(response);
        	})
        	.catch(function(error){
        		console.log(error);
        	})

        /*$http
            .get('/api/usuarios/57f04e8e5e81ba1ee818659e'/*, { params : {id : '57f04e8e5e81ba1ee818659e'} })*/
            /*.then(function(response){
                
                console.log('este es el find by id');
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            })*/
        	
        	var obj = 
            {
                name: 'usuario',
                surname:'pereeeeeeeeeeeeeeeeeeeeeeeeez',
                gender:'m',
                email:'jperez',
                password:'12345',
                dni:'a3111aaaaa1sd',
                userType: 
                {
                    description:'adicionista'
                }
            };

        /*
            
    var res = $http.put('/api/usuarios/57f04e8e5e81ba1ee818659e',obj );
            res.success(function(data, status, headers, config) {
                
                console.log(data);
            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });       

    var res = $http.delete('/api/usuarios/57f0761b7142a40e38e29101',obj );
            res.success(function(data, status, headers, config) {
                
                console.log(data);
            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });                                       
        	*/
   /*
            var res = $http.post('/api/usuarios',obj );
            res.success(function(data, status, headers, config) {
                console.log("function post");
                console.log(data);
            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });*/
            	
 
    })
  
