//mongoose.connect("mongodb://" + process.env.IP + "/foodtimedb");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var menuSchema = new Schema({
    subrubro: { },


}, {collection:'menus'});



// the schema is useless so far
// we need to create a model using it
var Menu = mongoose.model('Menu', menuSchema);

// make this available to our users in our Node applications
module.exports = Menu;