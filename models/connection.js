var mongo = require('mongodb');
var client = mongo.MongoClient;
mongoose.connect("mongodb://" + process.env.IP + "/foodtimedb");
var db = null;

exports.connect = function(callback){
  
  if(db){
    return process.nextTick(function(){
      callback(null, db);
    });
  }
  
  client.connect(dbURL, function(err, database){
    if(err){
      return callback(err);
    }
    db = database;
    callback(null, db);
  });
  
};

exports.ObjectID = function(hash){
  return new mongo.ObjectID(hash);
};