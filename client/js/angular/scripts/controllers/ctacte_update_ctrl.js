//$('.select').select2();

angular
  .module('foodtimeApp')
  .controller('CtacteUpdateCtrl', ['$scope', '$http', '$window', '$state', '$stateParams',
    function($scope, $http, $window, $state, $stateParams){

       // console.log($stateParams);

		var id=$stateParams.objId;
					 $scope.edit=true;
		
		 $scope.clientesupdate = new Array();
		 
		 function arrayUnique(array) {
			var a = array.concat();
			for(var i=0; i<a.length; ++i) {
				for(var j=i+1; j<a.length; ++j) {
					if(a[i]._id === a[j]._id)
						a.splice(j--, 1);
				}
			}

			return a;
		}

		 $scope.init=function(){
			 $scope.edit = true;
		$scope.ctacte=$http
            .get('/api/cuentasCorrientes/'+id)
            .then(function(response){	
			$scope.ctacte=response.data;
			$scope.ctacte.fecha=$scope.ctacte.fecha.substr(0, $scope.ctacte.fecha.indexOf('T')); 
			console.log($scope.ctacte);
			$scope.clientes=$scope.ctacte.clientes;

            })
            .catch(function(error){
                console.log(error);
            })
			
			/*$scope.clientes=$http
        	.get('/api/clientes')
        	.then(function(response){
        		$scope.clientes=response.data;
        		console.log($scope.clientes);
				$scope.clientes=arrayUnique($scope.clientesupdate.concat($scope.clientes));
				console.log($scope.clientes);

        	})
        	.catch(function(error){
        		console.log(error);
        	})*/}
			
		


        	$scope.cargar = function(){

                var obj =
                {
                    numero: $scope.ctacte.numero,
					descripcion: $scope.ctacte.descripcion,
					deuda: $scope.ctacte.deuda,
					clientes: $scope.list,
                };

                var res = $http.put('/api/cuentasCorrientes/'+id,obj );
                res.success(function(data, status, headers, config) {

                    console.log(data);
					$state.go('main.ctactes');
                });
                res.error(function(data, status, headers, config) {
                });

                //sendMessage(obj);
			}





	}]);
