//mongoose.connect("mongodb://" + process.env.IP + "/foodtimedb");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*var unidadMedidaSchema = new Schema({
    descripcion: String,
});*/

var productoSchema = new Schema({

}, {collection:'productos'});



// the schema is useless so far
// we need to create a model using it
var Producto = mongoose.model('Producto', productoSchema);

// make this available to our users in our Node applications
module.exports = Producto;