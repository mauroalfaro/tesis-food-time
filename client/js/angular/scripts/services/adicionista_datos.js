angular
  .module('foodtimeApp')
  .factory('AdicionistaDatos', ['$http', function($http){
    var data = {};            

    $http
      .get('/api/mesas')
      .then(function(response){
        data.mesas=response.data;
        console.log(response);
      })
      .catch(function(error){
        console.log(error);
      }) 

    $http
      .get('/api/clientesparacobrar')
      .then(function(response){
        data.clientes=response.data;					
      }).catch(function(error){
        console.log(error);
      })          
      
    $http
      .get('/api/mediosDePago')
      .then(function(response){
        data.mediosdepago =response.data;        
      })
      .catch(function(error){
        console.log(error);
      }) 
    
    $http
        .get('/api/rubros')
        .then(function(response){
          data.rubros=response.data;
          console.log(response);
        })
        .catch(function(error){
          console.log(error);
        })        

      
    $http
      .get('/api/secciones')
      .then(function(response){
        data.secciones=response.data;
        console.log(response);
      })
      .catch(function(error){
        console.log(error);
      })       



    return {    	 
    	getData,
      recargarMesas,      
    }

    function recargarMesas (obj){
      $http
        .get('/api/mesas')
        .then(function(response){
          data.mesas=response.data;          
        })
        .catch(function(error){
          console.log(error);
        })         
    }	 

    function getData (){
      
    	return data;
    }	 


  }]);
