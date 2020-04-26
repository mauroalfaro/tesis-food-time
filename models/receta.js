//mongoose.connect("mongodb://" + process.env.IP + "/foodtimedb");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var recetaSchema = new Schema({
	descripcion: { type: String, required: true, unique: true },
	materiasprimas: [{
			descripcion: { type: String, required: true},
			cantidadNecesaria: Number,
			unidadMedida: String,
	}]

}, {collection:'recetas'});



// the schema is useless so far
// we need to create a model using it
var Receta = mongoose.model('Receta', recetaSchema);

// make this available to our users in our Node applications
module.exports = Receta;