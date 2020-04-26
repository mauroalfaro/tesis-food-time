var app = angular
  .module('foodtimeApp',['ui.router', 'isteven-multi-select','ngAnimate', 'ngSanitize', 'ui.bootstrap'])
  		  .filter('carta', function(){
			return function(item){
			  if(item== true){
				return 'Si';
			  }
			  if (item== null){
				return 'No';
			  }
    }
  })    		
  .config(function($stateProvider,$urlRouterProvider){

        $stateProvider
        .state('login',{

                        url:'/login',
                        controller: 'LoginCtrl',
                        templateUrl:'/client/views/login.html',
                      })
        $stateProvider.state('main',{
              abstract: true,

              url:'/main',
              controller: 'MainCtrl',
              templateUrl:'/client/views/main.html'

            })

        $stateProvider.state('mainMozo',{
              //abstract: true,
              url:'/mozo',
              controller: 'MainMozoCtrl',
              templateUrl:'/client/views/mainMozo.html'
            })

      $stateProvider.state('mainMozo.mesanueva',{            

            url:'/mesa-nueva/:mesaId',
            controller: 'MesaNuevaMozoCtrl',
            templateUrl:'/client/views/pedido_nuevo_mozo.html'
          })

      $stateProvider.state('mainMozo.mesa',{            

            url:'/mesa/:mesaId',
            controller: 'MesaMozoCtrl',
            templateUrl:'/client/views/pedido_mozo.html'
          })

     $stateProvider
        .state('main.cocina',{

                        url:'/cocina',
                        controller: 'CocinaCtrl',
                        templateUrl:'/client/views/pedidos_cocina.html'
                      })

    $stateProvider
        .state('main.adicionista',{

                url:'/adicionista',
                controller: 'AdicionistaCtrl',
                templateUrl:'/client/views/pedidos_adicionista.html'
                })                                    



        $stateProvider
        .state('main.dashboard',{

                        url:'/dashboard',
                        controller: 'DashboardCtrl',
                        templateUrl:'/client/views/dashboard.html'
                      })
        $stateProvider
        .state('main.mediosdepago',{

                        url:'/mediosdepago',
                        controller: 'MediosPagoGrillaCtrl',
                        templateUrl:'/client/views/medios_pago_grilla.html',
						onEnter: function($window){$window.document.title = "Food-Time | Medios de Pago"; }
                      })
		$stateProvider
        .state('main.mediosdepagoCargar',{

                        url:'/mediosdepago/cargar',
                        controller: 'MediosPagoAltaCtrl',
                        templateUrl:'/client/views/medios_pago_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Alta de Medios de Pago"; }
                      })
		$stateProvider
        .state('main.mediosdepagoModificar',{

                        url:'/mediosdepago/modificar/:objId',
                        controller: 'MediosPagoUpdateCtrl',
                        templateUrl:'/client/views/medios_pago_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Modificar Medio de Pago"; }
                      })
        $stateProvider
        .state('main.usuarios',{

                        url:'/usuarios',
                        controller: 'UsuarioGrillaCtrl',
                        templateUrl:'/client/views/usuarios_grilla.html',
						onEnter: function($window){$window.document.title = "Food-Time | Usuarios"; }
                      })
		$stateProvider
        .state('main.usuariosCargar',{

                        url:'/usuarios/cargar',
                        controller: 'UsuarioAltaCtrl',
                        templateUrl:'/client/views/usuarios_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Alta de Usuarios"; }
                      })
    $stateProvider
        .state('main.usuariosModificar',{
          url:'/usuarios/modificar/:objId',
          controller: 'UsuarioUpdateCtrl',
          templateUrl:'/client/views/usuarios_alta.html',
		  onEnter: function($window){$window.document.title = "Food-Time | Modificar Usuario"; }
        })
		$stateProvider
        .state('main.rubros',{

                        url:'/rubros',
                        controller: 'RubrosGrillaCtrl',
                        templateUrl:'/client/views/rubros_grilla.html',
						onEnter: function($window){$window.document.title = "Food-Time | Rubros"; }
                      })
		$stateProvider
        .state('main.rubrosCargar',{

                        url:'/rubros/cargar',
                        controller: 'RubroAltaCtrl',
                        templateUrl:'/client/views/rubros_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Alta de Rubros"; }
                      })
        .state('main.rubrosModificar',{

                        url:'/rubros/modificar/:objId',
                        controller: 'RubroUpdateCtrl',
                        templateUrl:'/client/views/rubros_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Modificar Rubros"; }
                      })
		$stateProvider
        .state('main.subrubros',{

                        url:'/subrubros',
                        controller: 'SubrubrosGrillaCtrl',
                        templateUrl:'/client/views/subrubros_grilla.html',
						onEnter: function($window){$window.document.title = "Food-Time | Subrubros"; }
                      })
		$stateProvider
        .state('main.subrubrosCargar',{

                        url:'/subrubros/cargar',
                        controller: 'SubrubroAltaCtrl',
                        templateUrl:'/client/views/subrubros_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Alta de Subrubros"; }
                      })
        .state('main.subrubrosModificar',{

                        url:'/subrubros/modificar/:rubroId/:subrubroId',
                        controller: 'SubrubroUpdateCtrl',
                        templateUrl:'/client/views/subrubros_alta.html'
						,
						onEnter: function($window){$window.document.title = "Food-Time | Modificar Subrubro"; }
                      })
		$stateProvider
        .state('main.menus',{

                        url:'/menus',
                        controller: 'MenusGrillaCtrl',
                        templateUrl:'/client/views/menus_grilla.html',
						onEnter: function($window){$window.document.title = "Food-Time | Menús"; }
                      })
		$stateProvider
        .state('main.menusCargar',{

                        url:'/menus/cargar',
                        controller: 'MenuAltaCtrl',
                        templateUrl:'/client/views/menus_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Alta de Menús"; }
                      })
		$stateProvider
        .state('main.menusModificar',{

                        url:'/menus/modificar/:obj',
                        controller: 'MenuUpdateCtrl',
                        templateUrl:'/client/views/menus_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Modificar Menús"; }
                      })
		$stateProvider
        .state('main.ctactes',{

                        url:'/ctactes',
                        controller: 'CuentaCorrienteGrillaCtrl',
                        templateUrl:'/client/views/cta_cte_grilla.html',
						onEnter: function($window){$window.document.title = "Food-Time | Cuentas Corrientes"; }
                      })
		$stateProvider
        .state('main.ctactesCargar',{

                        url:'/ctactes/cargar',
                        controller: 'CtacteAltaCtrl',
                        templateUrl:'/client/views/cta_cte_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Alta de Cuenta Corriente"; }
                      })
		$stateProvider
        .state('main.ctactesModificar',{

                        url:'/ctactes/cargar/modificar/:objId',
                        controller: 'CtacteUpdateCtrl',
                        templateUrl:'/client/views/cta_cte_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Modificar Cuenta Corriente"; }
                      })
		$stateProvider
        .state('main.clientes',{

                        url:'/clientes',
                        controller: 'ClientesGrillaCtrl',
                        templateUrl:'/client/views/clientes_grilla.html',
						onEnter: function($window){$window.document.title = "Food-Time | Cliente"; }
                      })
		$stateProvider
        .state('main.clientesCargar',{

                        url:'/clientes/cargar',
                        controller: 'ClienteAltaCtrl',
                        templateUrl:'/client/views/clientes_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Alta de Cliente"; }
                      })
		$stateProvider
        .state('main.clientesModificar',{

                        url:'/clientes/cargar/modificar/:objId',
                        controller: 'ClienteUpdateCtrl',
                        templateUrl:'/client/views/clientes_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Modificar Cliente"; }
                      })
		$stateProvider
        .state('main.materiasprimas',{

                        url:'/materiasprimas',
                        controller: 'MateriasPrimasGrillaCtrl',
                        templateUrl:'/client/views/materias_primas_grilla.html',
						onEnter: function($window){$window.document.title = "Food-Time | Materias Primas"; }
                      })
		$stateProvider
        .state('main.materiasprimasCargar',{

                        url:'/materiasprimas/cargar',
                        controller: 'MateriasPrimasAltaCtrl',
                        templateUrl:'/client/views/materias_primas_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Alta de Materia Prima";}
                      })
		$stateProvider
        .state('main.materiasprimasModificar',{

                        url:'/materiasprimas/modificar/:objId',
                        controller: 'MateriasPrimasUpdateCtrl',
                        templateUrl:'/client/views/materias_primas_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Modificar Materia Prima"; }
                      })					  
		$stateProvider
        .state('main.recetas',{

                        url:'/recetas',
                        controller: 'RecetasGrillaCtrl',
                        templateUrl:'/client/views/recetas_grilla.html',
						onEnter: function($window){$window.document.title = "Food-Time | Recetas"; }
                      })
		$stateProvider
        .state('main.recetasCargar',{

                        url:'/recetas/cargar',
                        controller: 'RecetasAltaCtrl',
                        templateUrl:'/client/views/recetas_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Alta de Recetas"; }
                      })
		$stateProvider
        .state('main.recetasModificar',{

                        url:'/recetas/modificar/:objId',
                        controller: 'RecetasUpdateCtrl',
                        templateUrl:'/client/views/recetas_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Modificar Receta"; }
                      })
		$stateProvider
        .state('main.productos',{

                        url:'/productos',
                        controller: 'ProductoGrillaCtrl',
                        templateUrl:'/client/views/productos_grilla.html',
						onEnter: function($window){$window.document.title = "Food-Time | Productos"; }
                      })
		$stateProvider
        .state('main.productosCargar',{

                        url:'/productos/cargar',
                        controller: 'ProductoAltaCtrl',
                        templateUrl:'/client/views/productos_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Alta de Productos"; }
                      })
    $stateProvider
        .state('main.productosModificar',{
                        url:'/productos/modificar/:obj',
                        controller: 'ProductoUpdateCtrl',
                        templateUrl:'/client/views/productos_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Modificar Producto"; }
        })
		$stateProvider
        .state('main.secciones',{

                        url:'/secciones',
                        controller: 'SeccionesGrillaCtrl',
                        templateUrl:'/client/views/secciones_grilla.html',
						onEnter: function($window){$window.document.title = "Food-Time | Secciones"; }
                      })
		$stateProvider
        .state('main.seccionesCargar',{

                        url:'/secciones/cargar',
                        controller: 'SeccionAltaCtrl',
                        templateUrl:'/client/views/secciones_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Alta de Sección"; }
                      })
		$stateProvider
        .state('main.seccionesModificar',{

                        url:'/secciones/modificar/:objId',
                        controller: 'SeccionUpdateCtrl',
                        templateUrl:'/client/views/secciones_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Modificar Sección"; }
                      })
		$stateProvider
        .state('main.mesas',{

                        url:'/mesas',
                        controller: 'MesasGrillaCtrl',
                        templateUrl:'/client/views/mesas_grilla.html',
						onEnter: function($window){$window.document.title = "Food-Time | Mesas"; }
                      })
		$stateProvider
        .state('main.mesasCargar',{

                        url:'/mesas/cargar',
                        controller: 'MesaAltaCtrl',
                        templateUrl:'/client/views/mesas_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Alta de Mesa"; }
                      })
		$stateProvider
        .state('main.mesasModificar',{

                        url:'/mesas/modificar/:objId',
                        controller: 'MesaUpdateCtrl',
                        templateUrl:'/client/views/mesas_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Modificar Mesa"; }
                      })
		$stateProvider
        .state('main.bandashorarias',{

                        url:'/bandashorarias',
                        controller: 'BandaHorariaGrillaCtrl',
                        templateUrl:'/client/views/bandas_horarias_grilla.html',
						onEnter: function($window){$window.document.title = "Food-Time | Bandas Horarias"; }
                      })
		$stateProvider
        .state('main.bandashorariasCargar',{

                        url:'/bandashorarias/cargar',
                        controller: 'bandaHorariaAltaCtrl',
                        templateUrl:'/client/views/bandas_horarias_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Alta de Banda Horaria"; }
                      })
		$stateProvider
        .state('main.bandashorariasModificar',{

                        url:'/bandashorarias/modificar/:objId',
                        controller: 'bandaHorariaUpdateCtrl',
                        templateUrl:'/client/views/bandas_horarias_alta.html',
						onEnter: function($window){$window.document.title = "Food-Time | Modificar Banda Horaria"; }
                      })
		$stateProvider
        .state('main.usuarioPerfil',{

                        url:'/usuarios/perfil',
                        controller: 'UsuarioPerfilCtrl',
                        templateUrl:'/client/views/usuarios_perfil.html'})


        $urlRouterProvider.otherwise('login');

    })
    .directive('onFinishRender', function($timeout) {
        return function(scope, element, attrs) {
          if (scope.$last){

             $timeout(function () {
                    scope.$emit(attrs.onFinishRender);
                });
          }
        };
      })
app.run(function($rootScope) {
    debugger;
    //.....
});