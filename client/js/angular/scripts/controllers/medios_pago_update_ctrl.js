//$('.select').select2();

angular
  .module('foodtimeApp')
  .controller('MediosPagoUpdateCtrl', ['$scope', '$http', '$window', '$state', '$stateParams',
    function($scope, $http, $window, $state, $stateParams){

       // console.log($stateParams);

		var id=$stateParams.objId;

		$scope.mediosdepago=$http
            .get('/api/mediosDePago/'+id)
            .then(function(response){
                
				$scope.mediodepago=response.data;
				//console.log($scope.mediodepago);
            })
            .catch(function(error){
                console.log(error);
            })


        	$scope.cargar = function(){

                var obj =
                {

                    description: $scope.mediodepago.description,
                };

                var res = $http.put('/api/mediosDePago/'+id,obj );
                res.success(function(data, status, headers, config) {

                    console.log(data);
					$state.go('main.mediosdepago');
                });
                res.error(function(data, status, headers, config) {
                });

                //sendMessage(obj);
			}



            var socket = io.connect('http://localhost:3000/');
           socket.on('asd', function (data) {
                alert('llego una notificacion');
                console.log(data);
            });

           /* function sendMessage(obj) {
                socket.emit('news', { data: obj });
            }*/



	}]);
