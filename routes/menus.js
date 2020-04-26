var express = require('express');

var router = express.Router({
  mergeParams : true
});

var menus = require('../models/menu'); 


router.post('/menus', function(req, res){  
   console.log('estoy en el POST');
   console.log(req.body);
  menus.create(req.body, function(err, data){
   
    if(err){
          console.log(err);
      }

    res.json(data);
    
  })
});




router.put('/menus/:id', function(req, res){
 console.log('llego al put CLIENTE');
  menus.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, result){
      if(err){
          console.log(err);
      }
      
      res.send(result)
	  
  });

});

router.get('/menus', function(req, res){
  
  menus.find(function(err, data){
    if(err){
        console.log(err);
    }
    res.json(data);
  })
});

router.get('/menus/:id', function(req, res){
  console.log(req.params.id);
  menus.findById(req.params.id, function(err, data){
      if(err){
          console.log(err);
      }
      
      console.log(data);
      res.json(data)
  });

});

router.delete('/menus/:id', function(req, res){
  console.log(req.params.id);
  menus.findByIdAndRemove(req.params.id, function(err, data){
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