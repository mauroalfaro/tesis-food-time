var express = require('express');
var errorModule = require('./errorCatcher.js'); 
var router = express.Router({
  mergeParams : true
});

var pagos = require('../models/pago'); 


router.post('/pagos', function(req, res){  
   
  pagos.create(req.body, function(err, data){
   
    if(err){          
          errorModule.catchError(req,res,err);        	
    }
    
    res.json(data);
    
  })
});

router.put('/pagos/:id', function(req, res){
 
  pagos.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, result){
      if(err){          
            errorModule.catchError(req,res,err);        	
          }      
      
      res.send(result)
  });

});

router.get('/pagos', function(req, res){
  
  pagos.find(function(err, data){
      if(err){          
            errorModule.catchError(req,res,err);        	
          }
    res.json(data);
  })
});



router.get('/pagos/:id', function(req, res){
  
  pagos.findById(req.params.id, function(err, data){
      if(err){          
            errorModule.catchError(req,res,err);        	
          }
    
      res.json(data)
  });

});


module.exports = router;