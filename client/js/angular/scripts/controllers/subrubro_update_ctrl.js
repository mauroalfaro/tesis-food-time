//$('.select').select2();

angular
  .module('foodtimeApp')
  .controller('SubrubroUpdateCtrl', ['$scope', '$http', '$window', '$state', '$stateParams',
    function($scope, $http, $window, $state, $stateParams){

	 // var ids= $stateParams.rubroId;
	   
	  /*var rubroid = ids.substr(0, ids.indexOf('-')); 
	   var subrubroid = ids.substr(ids.indexOf('-'));
	   var subrubroid = subrubroid.substr(1);*/

	   var rubroid = $stateParams.rubroId;
	   var subrubroId = $stateParams.subrubroId;
	   $scope.edit = true;
	   
		//console.log($scope.subrubro);
		//$scope.subrubros=new Array();
		$scope.subrubro;
		$scope.rubro;


			
		$http
		.get('/api/rubros')
		.then(function(response){
			debugger;
			$scope.rubros=response.data;

			$http
			.get('/api/subrubros/'+rubroid)
			.then(function(response){
				debugger;
				$scope.rubro=$scope.rubros.filter(function (rubro) {
															return rubro._id == response.data._id;
															})[0]
				$scope.subrubro = $scope.rubro.subrubros.filter(function (subrubro) {
															return subrubro._id == subrubroId;
															})[0]
		})		

			/*
			$scope.rubro=response.data;
			console.log($scope.rubro);
			$scope.subrubros = $scope.rubro.subrubros;
			for (i = 0; i < $scope.subrubros.length; i++) {
				if ($scope.subrubros[i]._id == subrubroid)
				{
					$scope.subrubro=$scope.subrubros[i];
					console.log($scope.subrubro);
				}
		}*/})
		.catch(function(error){
			console.log(error);
		})
		
		$scope.cargar = function(){
			
		/*$scope.rubro=$http
			.get('/api/rubros/'+rubroid)
		.then(function(response){
			$scope.rubro=response.data;
			console.log($scope.rubro);
			$scope.subrubros = $scope.rubro.subrubros;
			for (i = 0; i < $scope.subrubros.length; i++) {
				if ($scope.subrubros[i]._id == subrubroid)
				{
					$scope.subrubro=$scope.subrubros[i];
					console.log($scope.subrubro);
				}
		}})
		.catch(function(error){
			console.log(error);
		})*/
		/*
			for (i = 0; i < $scope.subrubros.length; i++) {
				if ($scope.subrubros[i]._id == $scope.subrubro._id)
				{
						$scope.subrubros[i].descripcion= $scope.subrubro.descripcion;
				}
		}

			var obj=
			{
				subrubros: $scope.subrubros,
			};*/

			//console.log(obj);
			var res = $http.put('/api/rubros/'+$scope.rubro._id,$scope.rubro );
			res.success(function(data, status, headers, config) {
				console.log(data);
				$state.go('main.subrubros');
			});
			res.error(function(data, status, headers, config) {
			});
			}
	}]);
