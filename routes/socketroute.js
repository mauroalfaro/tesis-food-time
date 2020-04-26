var appRoot = require('app-root-path');
var io = require(appRoot + '/server/io');

/*your code, somwhere you will call the
 * function below whenever you want to emit
 * the 'user_did_action' event:
*/
if(user.didNewStuff()){
 emitUserAction(user);
}

var showMediosPago = function(user){
  io.sockets.emit('medio_pago_created', user);
};