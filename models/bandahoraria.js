//mongoose.connect("mongodb://" + process.env.IP + "/foodtimedb");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var bandahorariaSchema = new Schema({
    descripcion: { type: String, required: true},
    desde: String,
    hasta: String,
    variacion: Number,
}, {collection:'bandasHorarias'});



// the schema is useless so far
// we need to create a model using it
var BandaHoraria = mongoose.model('Banda Horaria', bandahorariaSchema);

// make this available to our users in our Node applications
module.exports = BandaHoraria;