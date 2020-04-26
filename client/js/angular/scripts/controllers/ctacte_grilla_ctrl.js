//$('.select').select2();
    
angular
  .module('foodtimeApp')
  .controller('CuentaCorrienteGrillaCtrl', ['$scope', '$http', '$location', '$state',
    function($scope, $http, $location, $state){
		moment.locale('es'); 
		$scope.cuentasCorrientes=[];
		$scope.filteredCuentasCorrientes = []
		,$scope.currentPage = 1
		,$scope.numPerPage = 10			
		,$scope.maxSize = 5;

		$scope.numPages = function () {
			return Math.ceil($scope.cuentasCorrientes.length / $scope.numPerPage);
		};

		$scope.init = function(){
	        $scope.cuentasCorrientes=$http
        	.get('/api/cuentasCorrientes')
        	.then(function(response){
        		$scope.cuentasCorrientes = response.data;
				$scope.totalItems = $scope.cuentasCorrientes.length;
				$scope.$watch('currentPage + numPerPage', function() {
					var begin = (($scope.currentPage - 1) * $scope.numPerPage)
					, end = begin + $scope.numPerPage;										
					$scope.filteredCuentasCorrientes = $scope.cuentasCorrientes.slice(begin, end);
				});

        	})
        	.catch(function(error){
        		console.log(error);
        	})
		}

	  
	  $scope.borrar=function(id){
		  console.log(id);
		    var res = $http.delete('/api/cuentasCorrientes/'+id);
            res.success(function(data, status, headers, config) {
                console.log("se borro" + id);
				$scope.init();
				$state.go('main.ctactes');
            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            }); 
	  }

		$scope.init();

		$scope.update=function(obj){
			$state.go('main.ctactesModificar',{objId: obj._id});
		}

		$scope.convertToLocalTime = function(date){
			return moment(date).format('lll');
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
