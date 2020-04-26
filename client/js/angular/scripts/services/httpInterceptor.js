angular
  .module('foodtimeApp')
  .factory('sessionRecoverer', ['$q', '$injector','$location', '$window', function($q, $injector,$location,$window) {  
    var sessionRecoverer = {
        responseError: function(response) {
            // Session has expired
            if (response.status == 401 && response.data.error == 'Session Expired'){              

                $window.location = '/client/views/error_401.html';                                                      
            }else if(response.status == 400 && response.data.error.code == 'Duplicated record'){
              // Error alert
              
                  swal({
                      title: "Oops...",
                      text: "El valor: " + response.data.error.value + " ya se encuentra en la base de datos para el campo " + response.data.error.field,
                      confirmButtonColor: "#EF5350",
                      type: "error"
                  });                            
            }else if (response.status == 401 && response.data.error == 'Login Fail'){

            }else{
                swal({
                      title: "Oops...",
                      text: response.data.error.message,
                      confirmButtonColor: "#EF5350",
                      type: "error"
                  });               

            }
            return $q.reject(response);
        }
    };
    return sessionRecoverer;
}]);
angular
  .module('foodtimeApp')
  .config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('sessionRecoverer');
}]);

/*angular
  .module('foodtimeApp')
  .factory('myHttpResponseInterceptor',['$q','$location',function($q,$location){
  return {
    response: function(promise){
      return promise.then(
        function success(response) {
        return response;
      },
      function error(response) {
        if(response.status === 401){
          $location.path('/client');
          return $q.reject(response);
        }
        else{
          return $q.reject(response); 
        }
      });
    }
  }
}]);
//Http Intercpetor to check auth failures for xhr requests
angular
  .module('foodtimeApp').config(['$httpProvider',function($httpProvider) {
  $httpProvider.interceptors.push('myHttpResponseInterceptor');
}]);*/