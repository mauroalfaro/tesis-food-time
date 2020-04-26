angular
  .module('foodtimeApp')
  .factory('CocinaDatos', ['$http','UserSession', function($http){
    var data = {};            

    $http
      .get('/api/pedidoscocina')
      .then(function(response){
        data.pedidos=response.data;
        console.log(response);
      })
      .catch(function(error){
        console.log(error);
      })    



    return {    	 
    	getData,      
    }

    function cargarMesa (obj){
    	data.mesa = obj;        
    }	 

    function getData (){
      
    	return data;
    }	 


  }]);
