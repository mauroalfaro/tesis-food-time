//$('.select').select2();
    
angular
  .module('foodtimeApp')
  .controller('BandaHorariaGrillaCtrl', ['$scope', '$http', '$location', '$state',
    function($scope, $http, $location, $state){
		
		$scope.init = function(){
	        $scope.bandashorarias=$http
        	.get('/api/bandasHorarias')
        	.then(function(response){
        		$scope.bandashorarias=response.data;
        		console.log(response);
        	})
        	.catch(function(error){
        		console.log(error);
        	})
		}

	  
	  $scope.borrar=function(id){
		  console.log(id);
		    var res = $http.delete('/api/bandasHorarias/'+id);
            res.success(function(data, status, headers, config) {
                console.log("se borro" + id);
				$scope.init();
				$state.go('main.bandashorarias');
            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            }); 
	  }
	  
	      $scope.update=function(obj){
				$state.go('main.bandashorariasModificar',{objId: obj._id});
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
