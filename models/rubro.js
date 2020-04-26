var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var rubroSchema = new Schema({
    descripcion: { type: String, required: true, unique: true },	
	subrubros: [{  
						descripcion: { type: String, required: true, index:true,unique: true,sparse: true },
						productos:[{ 
								codigo: { type: String, required: true,  index:true,unique: true,sparse: true },
								descripcion: { type: String},
								unidadMedida: String,
								carta: Boolean,
								cocina: Boolean,
								receta: {
												descripcion: { type: String,unique: true,sparse: true },
												materiasprimas: [{
												descripcion: { type: String, },
												cantidadNecesaria: Number,
												unidadMedida: String,
											}]
								},
								precio: Number, 
						}],
	}],
}, {collection:'rubros'});


// the schema is useless so far
// we need to create a model using it
var Rubro = mongoose.model('Rubro', rubroSchema);

// make this available to our users in our Node applications
module.exports = Rubro;