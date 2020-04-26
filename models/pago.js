var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/foodtimedb");
 
autoIncrement.initialize(connection);

// create a schema

var pagoSchema = new Schema({    

	fecha : Date,    	
    cajero : {},
	cliente : {},
    mediodepago : {},
    pedido : {},	
	importe: {},
}, {collection:'pagos'});

// the schema is useless so far
// we need to create a model using it


pagoSchema.pre('save', function(next) {
  // do stuff  
   if (this.isNew) {
        // Hooray!
		/*console.log(Date.UTC());
        this.fechaInicio = Date.now();    */             
        next()
    }
  next();
});

pagoSchema.plugin(autoIncrement.plugin, { model: 'Pago', field: 'pagoId' });
var Pago = mongoose.model('Pago', pagoSchema);

// make this available to our users in our Node applications
module.exports = Pago;


/*Mesa.findOne().populate('seccion').exec( function (err, arr){
	console.log(arr);
	});*/

