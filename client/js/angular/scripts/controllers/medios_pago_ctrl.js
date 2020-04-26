//$('.select').select2();
    
angular
  .module('foodtimeApp')
  .controller('MediosPagoAltaCtrl', ['$scope', '$http', '$window','$state',
    function($scope, $http, $window, $state){
    
    
    
    $scope.submitForm = function(isValid) {

		// check to make sure the form is completely valid
		if (isValid) { 
			alert('Alta de medio de pago');
		}
    }
                       	
        	$scope.cargar = function(){

                var obj = 
                {
                   
                    description: $scope.mediodepago.description,
                };
                    
                var res = $http.post('/api/mediosDePago',obj );
                res.success(function(data, status, headers, config) {
                    
                    console.log(data);
                    $state.go('main.mediosdepago');
                });
                res.error(function(data, status, headers, config) {                    
                });		  

			}

            var socket = io.connect('http://localhost:3000/');
           socket.on('asd', function (data) {
                alert('llego una notificacion');
                console.log(data);
            });
/*
            function sendMessage(obj) {
                socket.emit('news', { data: obj });
            }*/


   
	}]);
