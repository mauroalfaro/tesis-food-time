//$('.select').select2();
    
angular
  .module('foodtimeApp')
  .controller('SubrubrosGrillaCtrl', ['$scope', '$http', '$location', '$state',
    function($scope, $http, $location, $state){
		$scope.subrubros=[];
		$scope.filteredSubrubros = []
		,$scope.currentPage = 1
		,$scope.numPerPage = 10			
		,$scope.maxSize = 5;
	
			$scope.numPages = function () {
			return Math.ceil($scope.subrubros.length / $scope.numPerPage);
		};
		var idrubro;
		var idsubrubro;
		
		
	        $scope.subrubros=$http
        	.get('/api/subrubros')
        	.then(function(response){
				
        		$scope.subrubros=response.data;			
							$scope.totalItems = $scope.subrubros.length;
				$scope.$watch('currentPage + numPerPage', function() {
					var begin = (($scope.currentPage - 1) * $scope.numPerPage)
					, end = begin + $scope.numPerPage;										
					$scope.filteredSubrubros = $scope.subrubros.slice(begin, end);
				});					
        	})
        	.catch(function(error){
        		console.log(error);
        	})
							  
	  $scope.borrar=function(subrubro){

debugger;
			var res = $http.delete('/api/subrubros/'+subrubro.rubroId+'/'+subrubro.subrubro._id);
			res.success(function(data, status, headers, config) {
				console.log(data);
				//$state.reload();

				$state.go('main.subrubros', {},{
					reload: true,										
				});

				//$state.go('main.subrubros');
				//$scope.mostrarSubrubros(idrubro);
			});
			res.error(function(data, status, headers, config) {
			});
	  }
	  	  
       $scope.update=function(subrubro){

		   var obj = {rubroId:subrubro.rubroId,subrubroId:subrubro.subrubro._id}
		   $state.go('main.subrubrosModificar',obj);
    	}
   

		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			//you also get the actual event object
			//do stuff, execute functions -- whatever...

			$.extend( $.fn.dataTable.defaults, {
					autoWidth: false,
						responsive: true,
					columnDefs: [{ 
							orderable: false,
							width: '100px',
							targets: [ 2 ]
					}],
					dom: '<"datatable-header"fl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
					language: {
							search: '<span>Filtrar:</span> _INPUT_',
							lengthMenu: '<span>Mostrar:</span> _MENU_',
							zeroRecords: "No se encontraron resultados",
							info: "Mostrando de _START_ a _END_ de _TOTAL_ registros",
							infoFiltered: "(filtrado de un total de _MAX_ registros)",
							infoEmpty: "No hay registros disponibles",
							paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' },
					},
			});

			// Basic datatable
			$('.datatable-responsive').DataTable();			

			// Add placeholder to the datatable filter option
			$('.dataTables_filter input[type=search]').attr('placeholder','Escriba para filtrar...');

			// Enable Select2 select for the length option
			$('.dataTables_length select').select2({
					minimumResultsForSearch: Infinity,
					width: 'auto'
			});
		});

 
   
  }]);
