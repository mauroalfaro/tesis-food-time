
//mongoose.connect("mongodb://" + process.env.IP + "/foodtimedb");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema

var childSchema = new Schema({ descripcion: String });

var mesaSchema = new Schema({
    seccion:  childSchema,
	nombre : String,
    numero: { type: Number, required: true, unique: true },
	capMaxima: Number,
    mozo: { },
	pedido: {},
	estado: String,
}, {collection:'mesas'});

// the schema is useless so far
// we need to create a model using it

var Mesa = mongoose.model('Mesa', mesaSchema);

// make this available to our users in our Node applications
module.exports = Mesa;


/*Mesa.findOne().populate('seccion').exec( function (err, arr){
	console.log(arr);
	});*/

