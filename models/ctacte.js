//mongoose.connect("mongodb://" + process.env.IP + "/foodtimedb");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ctacteSchema = new Schema({
    numero: { type: Number, required: true, unique: true },
	descripcion: { type: String, required: true, unique: true },
    fecha: Date,
    deuda: Number,
    clientes:[{ }],
}, {collection:'cuentasCorrientes'});

ctacteSchema.pre('save', function(next) {
  // do stuff  
   if (this.isNew) {
        // Hooray!
		console.log(Date.UTC());
        this.fecha = Date.now();                 
        next()
    }
  next();
});

// the schema is useless so far
// we need to create a model using it
var CuentaCorriente = mongoose.model('CuentaCorriente', ctacteSchema);

// make this available to our users in our Node applications
module.exports = CuentaCorriente;