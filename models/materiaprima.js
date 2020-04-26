//mongoose.connect("mongodb://" + process.env.IP + "/foodtimedb");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var materiaprimaSchema = new Schema({
	descripcion: { type: String, required: true, unique: true},
    cantidadActual: Number,
	unidadMedida: String,
	puntoReposicion: Number,
}, {collection:'materiasprimas'});



// the schema is useless so far
// we need to create a model using it
var MateriaPrima = mongoose.model('MateriaPrima', materiaprimaSchema);

// make this available to our users in our Node applications
module.exports = MateriaPrima;