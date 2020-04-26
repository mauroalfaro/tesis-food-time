var express = require('express');
var errorModule = require('./errorCatcher.js');

var router = express.Router({
  mergeParams : true
});

var rubros = require('../models/rubro'); 


router.post('/subrubros', function(req, res){  

  rubros.create(req.body, function(err, data){
   
    if(err){                   
            errorModule.catchError(req,res,err);
      }

    res.json(data);    
  })
});




router.put('/subrubros/:id', function(req, res){

  rubros.subrubros.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, result){
      if(err){
          
          errorModule.catchError(req,res,err);        	
      }
      
      res.send(result)
	  
  });

});

router.get('/subrubros', function(req, res){
  
  rubros.find({}, function(err, data){
    if(err){
        console.log(err);
    }

    var subrubrosArray = [];
    var subrubros = data.filter(function (rubro) {
	        return rubro.subrubros.length>0;
	      	}).map(function (rubro) {
	     		   return rubro.subrubros.map(function (subrubro) {
                console.log(rubro);
                                        return {subrubro:subrubro, rubroId:rubro._id, rubroDescripcion:rubro.descripcion}
              })                      
	     	 })
    console.log(subrubros);
    for(var i=0;i<subrubros.length;i++){

      subrubrosArray = subrubrosArray.concat(subrubros[i])      
    }
    
   res.json(subrubrosArray);

  })
});



router.get('/subrubros/:rubroId', function(req, res){
  
  rubros.findById(req.params.rubroId, function(err, data){
      if(err){
          console.log(err);
      }
      
      console.log(data);
      res.json(data)
  });

});

router.delete('/subrubros/:rubroId/:subrubroId', function(req, res){
  console.log(req.params.rubroId);
  console.log(req.params.subrubroId);


  rubros.findById(req.params.rubroId, function(err, data){
      if(err){
         errorModule.catchError(req,res,err);
      }      

      var index = data.subrubros.indexOf(data.subrubros.id(req.params.subrubroId));
      data.subrubros.splice(index,1);

      rubros.findByIdAndUpdate(data._id,{$set:data}, function(err, result){
        if(err){
          
          errorModule.catchError(req,res,err);        	
        }

        res.send(result)
      });
  });

});


module.exports = router;