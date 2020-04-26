//mongoose.connect("mongodb://" + process.env.IP + "/foodtimedb");

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var medioDePagoSchema = new Schema({
    description: { type: String, unique: true },
}, {collection:'mediosDePago'});


//medioDePagoSchema.plugin(uniqueValidator,  { message: 'Duplicated record' });


// the schema is useless so far
// we need to create a model using it
var MedioDePago = mongoose.model('MedioDePago', medioDePagoSchema);

// make this available to our users in our Node applications
module.exports = MedioDePago;