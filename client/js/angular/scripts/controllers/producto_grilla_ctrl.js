//$('.select').select2();

angular
  .module('foodtimeApp')
  .controller('ProductoGrillaCtrl', ['$scope', '$http', '$location', '$state', '$window',
    function($scope, $http, $location, $state, $window){
		$scope.productos=[];
		$scope.filteredProductos = []
		,$scope.currentPage = 1
		,$scope.numPerPage = 10			
		,$scope.maxSize = 5;
	
			$scope.numPages = function () {
			return Math.ceil($scope.productos.length / $scope.numPerPage);
		};
	
	
		$scope.init = function(){
	        $scope.rubros=$http
        	.get('/api/rubros')
        	.then(function(response){
        		$scope.rubros=response.data;
				console.log($scope.rubros);


        	})
        	.catch(function(error){
        		console.log(error);
        	})
		}
		
			$scope.mostrarSubrubros = function(id){
			idrubro = id;
			console.log(idrubro);
			for (i = 0; i < $scope.rubros.length; i++) {
				if ($scope.rubros[i]._id == id)
				{
					console.log($scope.rubros[i].descripcion);
					$scope.subrubros=$scope.rubros[i].subrubros;
					console.log($scope.subrubros);
				}
			}
		}
		
		$scope.mostrarProductos = function(id){
					for (i = 0; i < $scope.subrubros.length; i++) {
							if ($scope.subrubros[i]._id == id)
								{
									$scope.productos=$scope.subrubros[i].productos;
																$scope.totalItems = $scope.productos.length;
				$scope.$watch('currentPage + numPerPage', function() {
					var begin = (($scope.currentPage - 1) * $scope.numPerPage)
					, end = begin + $scope.numPerPage;										
					$scope.filteredProductos = $scope.productos.slice(begin, end);
				});	
									console.log($scope.subrubros);
								}

						}
				}


	  $scope.borrar=function(obj){
		  //console.log(obj);
		  var index = $scope.productos.indexOf(obj);
		  console.log(index);
		  $scope.productos.splice(index,1);
		  console.log("borreeeeeeeee" + obj.descripcion);
		  $scope.subrubros.productos=$scope.productos
				var obj=
				{
					subrubros: $scope.subrubros,
				};
				console.log(obj);
                var res = $http.put('/api/rubros/'+idrubro,obj );
                res.success(function(data, status, headers, config) {
                    console.log(data);
					//$state.go('main.productos');
										$window.location.reload();
					$scope.mostrarProductos(idrubro);
                });
                res.error(function(data, status, headers, config) {
                });
	  }

       $scope.update=function(rub, sub,prod){
		   var obj = rub + "-" + sub + "_" + prod;
		   $state.go('main.productosModificar',{obj: obj});
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
