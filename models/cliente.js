//mongoose.connect("mongodb://" + process.env.IP + "/foodtimedb");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var clienteSchema = new Schema({
    name: { type: String, required: true},
    surname: { type: String, required: true},
    gender: String,
    dni: { type: Number, required: true, unique: true },
    cuil: { type: Number, required: true, unique: true },
    phone: String,
	ticked: Boolean,
    ctacte: { } 
}, {collection:'clientes'});



// the schema is useless so far
// we need to create a model using it
var Cliente = mongoose.model('Cliente', clienteSchema);

// make this available to our users in our Node applications
module.exports = Cliente;