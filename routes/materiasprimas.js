var express = require('express');
var errorModule = require('./errorCatcher.js');

var router = express.Router({
  mergeParams : true
});

var materiasprimas = require('../models/materiaprima'); 


router.post('/materiasprimas', function(req, res){  

  materiasprimas.create(req.body, function(err, data){
   
    if(err){                   
            errorModule.catchError(req,res,err);
      }

    res.json(data);
    
  })
});



router.put('/materiasprimas/:id', function(req, res){

  materiasprimas.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, result){
      if(err){
          
          errorModule.catchError(req,res,err);        	
      }
      
      res.send(result)
	  
  });

});

router.put('/modificarstock', function(req, res){

   if(req.body){
     var io = req.app.get('socketio');
      
    //recorro los productos
    for(var i=0;i<req.body.length;i++){
      //recorro las materias primas de cada producto
      console.log("recorriendo el producto " + req.body.descripcion + "la receta es " + req.body[i].receta.descripcion);
      if(req.body[i].receta){
        //por cada materia prima actulizo el stock
        console.log("la longitud del array es:" + req.body[i].receta.materiasprimas.length)
        for(var j=0;j<req.body[i].receta.materiasprimas.length;j++){
          console.log(j);
          console.log(req.body[i].receta.materiasprimas[j]);
          console.log(req.body[i].receta.materiasprimas[j]);
          console.log("setoy en la materia prima: " + req.body[i].receta.materiasprimas[j].descripcion);
          materiasprimas.findByIdAndUpdate(req.body[i].receta.materiasprimas[j]._id,{$inc: {cantidadActual:-req.body[i].receta.materiasprimas[j].cantidadNecesaria}},{new: true}, function(err, result){
            if(err){
              console.log(err);                
                errorModule.catchError(req,res,err);        	
            }

            if(result.puntoReposicion > result.cantidadActual){
              io.sockets.emit('MateriaPrimaAgotada',result)
            }
          });
        } 
      }
    }
  }

  res.status(200).send();   

});

router.get('/chequearstock', function(req, res){

  materiasprimas.find(function(err, data){
    if(err){
        console.log(err);
    }
      var io = req.app.get('socketio');
     for(var i=0;i<data.length;i++){


        if(data[i].puntoReposicion > data[i].cantidadActual){
          console.log('estoy enviando una notifacion de stock')
          io.sockets.emit('MateriaPrimaAgotada',data[i])
        }

     }
     
  })
  res.status(200).send();
});

router.get('/materiasprimas', function(req, res){
  
  materiasprimas.find(function(err, data){
    if(err){
        console.log(err);
    }
    res.json(data);
  })
});

router.get('/materiasprimas/:id', function(req, res){
  console.log(req.params.id);
  materiasprimas.findById(req.params.id, function(err, data){
      if(err){
          console.log(err);
      }
      
      console.log(data);
      res.json(data)
  });

});

router.delete('/materiasprimas/:id', function(req, res){
  console.log(req.params.id);
  materiasprimas.findByIdAndRemove(req.params.id, function(err, data){
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