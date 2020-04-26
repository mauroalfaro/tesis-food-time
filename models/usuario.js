//mongoose.connect("mongodb://" + process.env.IP + "/foodtimedb");

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;



var usuarioSchema = new Schema({
    name: String,
    surname: String,
    email: { type: String, required: true, unique: true },
    gender: String,
    password: { type: String, required: true },
    userType: { type: String},
    dni:{ type: Number, required: true, unique: true },
    cuil: { type: Number, required: true, unique: true },
    province: String,
    locality: String,
    street: String,
    number: String,
    floor: String,
}, {collection:'usuarios'});

// methods ======================
// generating a hash
usuarioSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
usuarioSchema.methods.validPassword = function(password) {
    
    //return password == this.password;
    console.log(password);
    console.log(this.password);
    return bcrypt.compareSync(password, this.password);
};


//hash password
usuarioSchema.pre('save', function(next) {
  // do stuff  
   if (this.isNew) {
        // Hooray!
        this.password = usuarioSchema.methods.generateHash(this.password);                 
        next()
    }
  next();
});



// the schema is useless so far
// we need to create a model using it
var Usuario = mongoose.model('Usuario', usuarioSchema);

// make this available to our users in our Node applications
module.exports = Usuario;