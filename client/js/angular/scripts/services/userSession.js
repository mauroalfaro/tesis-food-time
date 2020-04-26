angular
  .module('foodtimeApp')
  .factory('UserSession', ['$http', function($http){
   var userPromise = {};        
    
  
    userPromise = $http
        .get('/currentuser'); 

            userPromise = $http
        .get('/currentuser');
    return {
    	loadUser, 
    	getUser,
      getData,
    }

    function loadUser (){
    	userPromise = $http
        .get('/currentuser');
    }	 


    function getData (){
      
    	return data;
    }	 
    function getUser (){
      
    	return userPromise;
    }	 

  }]);
