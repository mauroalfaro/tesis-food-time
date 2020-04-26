var express = require('express');

var router = express.Router({
  mergeParams : true
});

var productos = require('../models/producto'); 


router.post('/productos', function(req, res){  
   console.log('estoy en el POST');
   console.log(req.body);
  productos.create(req.body, function(err, data){
   
    if(err){
          console.log(err);
      }

    res.json(data);
    
  })
});




router.put('/productos/:id', function(req, res){
 console.log('llego al put CLIENTE');
  productos.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, result){
      if(err){
          console.log(err);
      }
      
      res.send(result)
	  
  });

});

router.get('/productos', function(req, res){
  
  productos.find(function(err, data){
    if(err){
        console.log(err);
    }
    res.json(data);
  })
});

router.get('/productos/:id', function(req, res){
  console.log(req.params.id);
  productos.findById(req.params.id, function(err, data){
      if(err){
          console.log(err);
      }
      
      console.log(data);
      res.json(data)
  });

});

router.delete('/productos/:id', function(req, res){
  console.log(req.params.id);
  productos.findByIdAndRemove(req.params.id, function(err, data){
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