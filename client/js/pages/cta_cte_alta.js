/* ------------------------------------------------------------------------------
*
*  # Dual listboxes
*
*  Specific JS code additions for form_dual_listboxes.html page
*
*  Version: 1.0
*  Latest update: Aug 1, 2015
*
* ---------------------------------------------------------------------------- */

$(function() {


    // Basic example
 //   $('.listbox').bootstrapDualListbox();


   $('.select').select2();
   
   
       $('.listbox').bootstrapDualListbox({
        moveOnSelect: false,
        infoText: 'Mostrando todos {0}',
        infoTextFiltered: '<span class="label label-info">Filtrados</span> {0} de {1}',
        infoTextEmpty: 'Lista vacía',
        filterPlaceHolder: 'Filtrar',
        filterTextClear: 'Mostrar todos'
    });
    
});
