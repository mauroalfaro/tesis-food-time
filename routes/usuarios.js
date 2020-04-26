var express = require('express');
var errorModule = require('./errorCatcher.js');

var router = express.Router({
  mergeParams : true
});

var users = require('../models/usuario');

var errorModule = require('./errorCatcher.js'); 


router.post('/usuarios', function(req, res){  
   
  users.create(req.body, function(err, data){
      if(err){          
          errorModule.catchError(req,res,err);        	
      }

    res.json(data);
    
  })
});



router.put('/usuarios/:id', function(req, res){
 
    users.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, result){
    if(err){          
      errorModule.catchError(req,res,err);        	
    }
        
    res.send(result)
  });

});

router.put('/changePassword/:id', function(req, res){
  
    console.log(req.body);


     users.findById(req.params.id, function(err, user) {
       console.log('encontre el usuario');
        if (user.validPassword(req.body.userPassword)){

            users.findByIdAndUpdate(req.params.id,{$set:{ email: req.body.email, password : user.generateHash(req.body.newPassword) }}, function(err, result){
              if(err){          
                errorModule.catchError(req,res,err);        	
              }
              res.send(result)
            });
        }else{

            error = {message : 'Contraseña Invalida'};
            errorModule.catchError(req,res,error);         

        }
     });            
  });

router.get('/mozos', function(req, res){
  
  users.find({ "userType": "Mozo"},function(err, data){
    if(err){          
      errorModule.catchError(req,res,err);        	
    }
    res.json(data);
  })
});

router.get('/usuarios', function(req, res){
  
  users.find(function(err, data){
    if(err){
        console.log(err);
    }
    res.json(data);
  })
});

router.get('/usuarios/:id', function(req, res){
  console.log(req.params.id);
  users.findById(req.params.id, function(err, data){
    if(err){          
      errorModule.catchError(req,res,err);        	
    }
      
      console.log(data);
      res.json(data)
  });

});

router.delete('/usuarios/:id', function(req, res){
  console.log(req.params.id);
  users.findByIdAndRemove(req.params.id, function(err, data){
      if(err){
          console.log(err);
      }
      
      console.log(data);
      res.json(data)
  });

});

module.exports = router;