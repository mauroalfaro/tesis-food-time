var express = require('express');
var errorModule = require('./errorCatcher.js');

var router = express.Router({
  mergeParams : true
});

var rubros = require('../models/rubro'); 


router.post('/rubros', function(req, res){  

  rubros.create(req.body, function(err, data){
   
    if(err){                   
            errorModule.catchError(req,res,err);
      }

    res.json(data);
    
  })
});




router.put('/rubros/:id', function(req, res){

  rubros.findByIdAndUpdate(req.params.id,{$set:req.body},  {runValidators: true, context: 'query'},function(err, result){
      if(err){
          
          errorModule.catchError(req,res,err);        	
      }
      
      res.send(result)
	  
  });

});

router.get('/rubros', function(req, res){
  
  rubros.find(function(err, data){
    if(err){
        console.log(err);
    }
    res.json(data);
  })
});

router.get('/rubros/:id', function(req, res){
  console.log(req.params.id);
  rubros.findById(req.params.id, function(err, data){
      if(err){
          console.log(err);
      }
      
      console.log(data);
      res.json(data)
  });

});

router.delete('/rubros/:id', function(req, res){
  console.log(req.params.id);
  rubros.findByIdAndRemove(req.params.id, function(err, data){
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