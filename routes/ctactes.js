var express = require('express');
var errorModule = require('./errorCatcher.js');

var router = express.Router({
  mergeParams : true
});

var ctactes = require('../models/ctacte'); 


router.post('/cuentasCorrientes', function(req, res){  
   
   console.log(req.body);
  ctactes.create(req.body, function(err, data){
   
    if(err){                   
            errorModule.catchError(req,res,err);
      }

    res.json(data);
    
  })
});




router.put('/cuentasCorrientes/:id', function(req, res){
 
  ctactes.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, result){
      if(err){
          
          errorModule.catchError(req,res,err);        	
      }
      
      res.send(result)
	  
  });

});


router.put('/acreditarcuentacorriente/:ctacteId', function(req, res){ 

  ctactes.findByIdAndUpdate(req.params.ctacteId,{$inc: {deuda:req.body.saldo}},{new: true}, function(err, result){
      if(err){
          console.log(err);
      }

      var io = req.app.get('socketio');
      io.sockets.emit('SaldoCuentaCorriente',result);

      res.send(result)
	  
  });
});

router.get('/cuentasCorrientes', function(req, res){
  
  ctactes.find(function(err, data){
    if(err){
        console.log(err);
    }
    res.json(data);
  })
});

router.get('/cuentasCorrientes/:id', function(req, res){
  console.log(req.params.id);
  ctactes.findById(req.params.id, function(err, data){
      if(err){
          console.log(err);
      }
      
      console.log(data);
      res.json(data)
  });

});

router.delete('/cuentasCorrientes/:id', function(req, res){
  console.log(req.params.id);
  ctactes.findByIdAndRemove(req.params.id, function(err, data){
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