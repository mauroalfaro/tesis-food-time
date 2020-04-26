//mongoose.connect("mongodb://" + process.env.IP + "/foodtimedb");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var subrubroSchema = new Schema({

	rubro: {},
	menus: [{ }],
	productos: [{ 
		    codigo: { type: String, required: true},
    descripcion: { type: String, required: true},
    /*unidadMedida: 
    {
        descripcion: { type: String}
    },*/
	unidadMedida: String,
    carta: Boolean,
    rubro: { },
    subrubro: { },
    precio: Number, 
	}],
}, {collection:'subrubros'});



// the schema is useless so far
// we need to create a model using it
var Subrubro = mongoose.model('Subrubro', subrubroSchema);

// make this available to our users in our Node applications
module.exports = Subrubro;