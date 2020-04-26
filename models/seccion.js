//mongoose.connect("mongodb://" + process.env.IP + "/foodtimedb");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var seccionSchema = new Schema({
    descripcion: { type: String, required: true, unique: true },
	mesas: [{  }],
}, {collection:'secciones'});

var Seccion = mongoose.model('Seccion', seccionSchema);

module.exports = Seccion;
