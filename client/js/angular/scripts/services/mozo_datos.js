angular
  .module('foodtimeApp')
  .factory('MozoDatos', ['$http','UserSession', function($http,UserSession){
    var data = {};        
    

  UserSession.getUser().then(function(response){
        data.user = response.data;
        recargarMesas();                   
      })
      .catch(function(error){
        console.log(error);
      }); 

    $http
        .get('/api/rubros')
        .then(function(response){
          data.rubros=response.data;
          console.log(response);
        })
        .catch(function(error){
          console.log(error);
        })  


      var recargarMesas = function(){
          $http
              .get('/api/mesasmozo/'+  data.user._id)
              .then(function(response){                
                  data.mesas=response.data;				
              })
              .catch(function(error){
                  console.log(error);
              })
      }
        

    return {
    	cargarMesa, 
    	getData,
      recargarMesas
    }

    function cargarMesa (obj){
    	data.mesa = obj;        
    }	 

    function getData (){
      
    	return data;
    }	 

  }]);
