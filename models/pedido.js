var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema

var pedidoSchema = new Schema({    

	fechaInicio : Date,    	
    fechaSolicitud : Date,
	fechaServido : Date,	
	mesa: {},
	comentarios : String,
	cliente: {},
	estado: String,
	cantPersonas : Number,
	productos: [],
}, {collection:'pedidos'});

// the schema is useless so far
// we need to create a model using it


pedidoSchema.pre('save', function(next) {
  // do stuff  
   if (this.isNew) {
        // Hooray!		
        this.fechaInicio = Date.now();                 
        next()
    }
  next();
});


var Pedido = mongoose.model('Pedido', pedidoSchema);

// make this available to our users in our Node applications
module.exports = Pedido;