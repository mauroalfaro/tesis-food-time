var express = require('express');
var errorModule = require('./errorCatcher.js');

var router = express.Router({
  mergeParams : true
});
var errorModule = require('./errorCatcher.js'); 
var mesas = require('../models/mesa'); 


router.post('/mesas', function(req, res){  
   
  mesas.create(req.body, function(err, data){
   
    if(err){                   
            errorModule.catchError(req,res,err);
      }
    
    res.json(data);
    
  })
});




router.put('/mesas/:id', function(req, res){
 
  mesas.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, result){
      if(err){          
            errorModule.catchError(req,res,err);        	
          }
      
      
      res.send(result)
  });

});

router.put('/mesaactualizarpedido/:id', function(req, res){
 
  mesas.findByIdAndUpdate(req.params.id,{$set:{ pedido: req.body}}, function(err, result){
      if(err){          
            errorModule.catchError(req,res,err);        	
          }
      
      
      res.send(result)
  });

});


router.get('/mesas', function(req, res){
  
  mesas.find(function(err, data){
    if(err){
        console.log(err);
    }
    res.json(data);
  })
});

router.get('/mesas/:id', function(req, res){
  
  mesas.findById(req.params.id, function(err, data){
      if(err){          
            errorModule.catchError(req,res,err);        	
          }
      
            
      res.json(data)
  });

});

router.get('/mesasmozo/:id', function(req, res){
  
//      mesas.find({ "mozo": { $eq: {"_id":req.params.id} }} , function(err, data){
  mesas.find({ "mozo._id": req.params.id} , function(err, data){  
      if(err){          
            errorModule.catchError(req,res,err);        	
          }
            
      res.json(data)
  });

});

router.delete('/mesas/:id', function(req, res){
  
  mesas.findByIdAndRemove(req.params.id, function(err, data){
      if(err){          
            errorModule.catchError(req,res,err);        	
          }
      
      res.json(data)
  });

});


module.exports = router;