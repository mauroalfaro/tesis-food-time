
module.exports = {
  catchError: function(req,res,err) {
      if(err.code == 11000){                
            
            var field = err.message.split('index:')[1];
            // now we have `field_1 dup key`
            field = field.split(' dup key')[0];
            field = '"' + field.substring(1, field.lastIndexOf('_')) + '"'; // returns the field                                
            var value = err.message.substring(err.message.lastIndexOf('{ :')+3,err.message.lastIndexOf('}'));   

            res.status(400).send({ error: {code:'Duplicated record', field:field, value: value}});

        }else{
            res.status(400).send({ error: err });
        }
  },
       
};