var express = require('express');
var errorModule = require('./errorCatcher.js');

var router = express.Router({
  mergeParams : true
});

var secciones = require('../models/seccion'); 


router.post('/secciones', function(req, res){  
   
  secciones.create(req.body, function(err, data){
   
    if(err){                   
            errorModule.catchError(req,res,err);
      }

    res.json(data);
    
  })
});




router.put('/secciones/:id', function(req, res){
 console.log('llego al put');
  secciones.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, result){
      if(err){
          
          errorModule.catchError(req,res,err);        	
      }
      
      res.send(result)
  });

});

router.get('/secciones', function(req, res){
  
  secciones.find(function(err, data){
    if(err){
        console.log(err);
    }
    res.json(data);
  })
});

router.get('/secciones/:id', function(req, res){
  console.log(req.params.id);
  secciones.findById(req.params.id, function(err, data){
      if(err){
          console.log(err);
      }
      
      console.log(data);
      res.json(data)
  });

});

router.delete('/secciones/:id', function(req, res){
  console.log(req.params.id);
  secciones.findByIdAndRemove(req.params.id, function(err, data){
      if(err){
          console.log(err);
      }
      
      console.log(data);
      res.json(data)
  });

});

/*
router.get('/users/:id', function (req, res, next) {
  users.findById(req.params.id, function(err, todo){
    if(err) res.send(err);
    res.json(todo);
  });
});*/

module.exports = router;