var express = require('express');
var errorModule = require('./errorCatcher.js');

var router = express.Router({
  mergeParams : true
});


console.log(router);

//var appRoot = require('app-root-path');
//var io = require('socket.io')();

var mediosdepago = require('../models/medioDePago'); 


router.post('/mediosDePago', function(req, res){  
//console.log(res.io);
  mediosdepago.create(req.body, function(err, data){
   
    if(err){                   
            errorModule.catchError(req,res,err);
      }
  
    res.json(data);    
  })
});


router.put('/mediosDePago/:id', function(req, res){
 
  mediosdepago.findByIdAndUpdate(req.params.id,{$set:req.body},  {runValidators: true, context: 'query'},function(err, result){
      if(err){
          
          errorModule.catchError(req,res,err);        	
      }
      
      res.send(result)
  });

});

router.get('/mediosDePago', function(req, res){
    
    var io = req.app.get('socketio');
    //console.log(io);
    //io.sockets.emit('asd')
  mediosdepago.find(function(err, data){
    if(err){
        console.log(err);
    }
    res.json(data);
  })
});

router.get('/mediosDePago/:id', function(req, res){
  
  mediosdepago.findById(req.params.id, function(err, data){
      if(err){
          console.log(err);
      }
      
      console.log(data);
      res.json(data)
  });

});

router.delete('/mediosDePago/:id', function(req, res){
  console.log(req.params.id);
  mediosdepago.findByIdAndRemove(req.params.id, function(err, data){
      if(err){
          console.log(err);
      }
      
      console.log(data);
      res.json(data)
  });

});


module.exports = router;