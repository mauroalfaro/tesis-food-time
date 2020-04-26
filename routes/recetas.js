var express = require('express');
var errorModule = require('./errorCatcher.js');

var router = express.Router({
  mergeParams : true
});

var recetas = require('../models/receta'); 


router.post('/recetas', function(req, res){  
   console.log('estoy en el POST MATERIA PRIMA');
   console.log(req.body);
  recetas.create(req.body, function(err, data){
   
    if(err){                   
            errorModule.catchError(req,res,err);
      }

    res.json(data);
    
  })
});



router.put('/recetas/:id', function(req, res){
 console.log('llego al put CLIENTE');
  recetas.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, result){
      if(err){
          
          errorModule.catchError(req,res,err);        	
      }
      
      res.send(result)
	  
  });

});

router.get('/recetas', function(req, res){
  
  recetas.find(function(err, data){
    if(err){
        console.log(err);
    }
    res.json(data);
  })
});

router.get('/recetas/:id', function(req, res){
  console.log(req.params.id);
  recetas.findById(req.params.id, function(err, data){
      if(err){
          console.log(err);
      }
      
      console.log(data);
      res.json(data)
  });

});

router.delete('/recetas/:id', function(req, res){
  console.log(req.params.id);
  recetas.findByIdAndRemove(req.params.id, function(err, data){
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