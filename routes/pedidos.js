var express = require('express');
var errorModule = require('./errorCatcher.js'); 
var router = express.Router({
  mergeParams : true
});

var pedidos = require('../models/pedido'); 


router.post('/pedidos', function(req, res){  
   
  pedidos.create(req.body, function(err, data){
   
    if(err){          
          errorModule.catchError(req,res,err);        	
    }
    
    res.json(data);
    
  })
});


router.put('/pedidos/:id', function(req, res){
 
  pedidos.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, result){
      if(err){          
            errorModule.catchError(req,res,err);        	
          }
      
      
      res.send(result)
  });

});


router.put('/pedidolisto/:id', function(req, res){
 
  pedidos.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, result){
      if(err){          
            errorModule.catchError(req,res,err);        	
          }
      var io = req.app.get('socketio');
      //console.log(io);
      io.sockets.emit('PedidoListo',req.body)
      
      res.send(result)
  });

});

router.put('/pedidocancelado/:id', function(req, res){
 
  pedidos.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, result){
      if(err){          
            errorModule.catchError(req,res,err);        	
          }
      var io = req.app.get('socketio');
      //console.log(io);
      io.sockets.emit('PedidoCancelado',req.body)
      
      res.send(result)
  });

});

router.get('/pedidos', function(req, res){
  
  pedidos.find(function(err, data){
      if(err){          
            errorModule.catchError(req,res,err);        	
          }
    res.json(data);
  })
});

router.get('/pedidoscocina', function(req, res){
  
  pedidos.find({ "productos.cocina": true,$or: [{"estado":"nuevo"},{"estado":"listo"}]} , function(err, data){  
        if(err){          
              errorModule.catchError(req,res,err);        	
            }
              
        res.json(data)
    });
});


router.get('/pedidos/:id', function(req, res){
  
  pedidos.findById(req.params.id, function(err, data){
      if(err){          
            errorModule.catchError(req,res,err);        	
          }
    
      res.json(data)
  });

});

router.get('/pedidosmozo/:id', function(req, res){
  pedidos.find({ "mozo._id": req.params.id} , function(err, data){  
      if(err){          
            errorModule.catchError(req,res,err);        	
          }
            
      res.json(data)
  });

});

router.delete('/pedidos/:id', function(req, res){
  
  pedidos.findByIdAndRemove(req.params.id, function(err, data){
      if(err){          
            errorModule.catchError(req,res,err);        	
          }
      
  
      res.json(data)
  });

});


module.exports = router;