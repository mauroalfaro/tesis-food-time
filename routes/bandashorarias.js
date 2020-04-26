var express = require('express');

var router = express.Router({
  mergeParams : true
});

var bandashorarias = require('../models/bandahoraria'); 


router.post('/bandasHorarias', function(req, res){  
   console.log('estoy en el POST');
   console.log(req.body);
  bandashorarias.create(req.body, function(err, data){
   
    if(err){
          console.log(err);
      }

    res.json(data);
    
  })
});




router.put('/bandasHorarias/:id', function(req, res){
 console.log('llego al put CLIENTE');
  bandashorarias.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, result){
      if(err){
          console.log(err);
      }
      
      res.send(result)
	  
  });

});

router.get('/bandasHorarias', function(req, res){
  
  bandashorarias.find(function(err, data){
    if(err){
        console.log(err);
    }
    res.json(data);
  })
});

router.get('/bandasHorarias/:id', function(req, res){
  console.log(req.params.id);
  bandashorarias.findById(req.params.id, function(err, data){
      if(err){
          console.log(err);
      }
      
      console.log(data);
      res.json(data)
  });

});

router.delete('/bandashorarias/:id', function(req, res){
  console.log(req.params.id);
  bandashorarias.findByIdAndRemove(req.params.id, function(err, data){
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