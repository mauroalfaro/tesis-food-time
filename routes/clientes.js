var express = require('express');
var errorModule = require('./errorCatcher.js');

var router = express.Router({
  mergeParams : true
});

var clientes = require('../models/cliente'); 


router.post('/clientes', function(req, res){  
   
  clientes.create(req.body, function(err, data){
   
    if(err){                   
            errorModule.catchError(req,res,err);
      }

    res.json(data);
    
  })
});




router.put('/clientes/:id', function(req, res){
 
  clientes.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, result){
      if(err){
          
          errorModule.catchError(req,res,err);        	
      }
      
      res.send(result)
	  
  });

});

router.get('/clientes', function(req, res){
  
  clientes.find(function(err, data){
    if(err){
        console.log(err);
    }
    res.json(data);
  })
});

router.get('/clientesparacobrar', function(req, res){
  
  clientes.find(function(err, data){
    if(err){
        console.log(err);
    }
    res.json(data.filter(function(cliente){
      return cliente.ctacte != null;
    }));
  })
});

router.get('/clientes/:id', function(req, res){
  console.log(req.params.id);
  clientes.findById(req.params.id, function(err, data){
      if(err){
          console.log(err);
      }
      
      console.log(data);
      res.json(data)
  });

});

router.delete('/clientes/:id', function(req, res){
  console.log(req.params.id);
  clientes.findByIdAndRemove(req.params.id, function(err, data){
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