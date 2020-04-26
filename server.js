//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');

var socketio = require('socket.io');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');

var passport = require('passport');
var flash    = require('connect-flash');
var morgan = require('morgan')
var cookieParser = require('cookie-parser');
var session      = require('express-session');


var usuarioRouter = require('./routes/usuarios');
var clienteRouter = require('./routes/clientes');
var medioDePagoRouter = require('./routes/mediosdepago');
var mesaRouter = require('./routes/mesas');
var seccionRouter = require('./routes/secciones');
var productoRouter = require('./routes/productos');
var rubroRouter = require('./routes/rubros');
var subrubroRouter = require('./routes/subrubros');
var menuRouter = require('./routes/menus');
var ctacteRouter = require('./routes/ctactes');
var bandahorariaRouter = require('./routes/bandashorarias');
var pedidosRouter = require('./routes/pedidos');
var pagosRouter = require('./routes/pagos');
var materiasPrimasRouter = require('./routes/materiasprimas');
var recetasRouter = require('./routes/recetas');

// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//https://scotch.io/tutorials/easy-node-authentication-setup-and-local

var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

mongoose.connect("mongodb://localhost/foodtimedb");

 
//router.set('view engine', 'ejs');
//router.engine('html', require('ejs').renderFile);
//router.set('view engine', 'html');

require('./config/passport')(passport); // pass passport for configuration

router.use('/client',express.static(path.resolve(__dirname, 'client')));

var app = router;
app.set('socketio', io);


router.use(morgan('dev')); // log every request to the console
router.use(cookieParser()); // read cookies (needed for auth)
//router.use(bodyParser()); // get information from html forms



router.use(bodyParser.json());
router.use(session({ secret: 'ilovescotchscotchyscotchscotch',  saveUninitialized: true,
  resave: true })); // session secret
router.use(passport.initialize());
router.use(passport.session()); // persistent login sessions
router.use(flash()); // use connect-flash for flash messages stored in session

require('./routes/routes.js')(app, passport);



router.use('/api',usuarioRouter);
router.use('/api',clienteRouter);
router.use('/api',medioDePagoRouter);
router.use('/api',mesaRouter);
router.use('/api',seccionRouter);
router.use('/api',productoRouter);
router.use('/api',rubroRouter);
router.use('/api',subrubroRouter);
router.use('/api',menuRouter);
router.use('/api',ctacteRouter);
router.use('/api',bandahorariaRouter);
router.use('/api',pedidosRouter);
router.use('/api',pagosRouter);
router.use('/api',materiasPrimasRouter);
router.use('/api',recetasRouter);


//router.use('/client',express.static(path.resolve(__dirname, 'client')));


//http://stackoverflow.com/questions/36931311/implement-notification-system-using-node-js-express-socket
io.on('connection', function(socket){
 console.log("Socket established with id: " + socket.id);
// console.log(socket.request.connection.remoteAddress);
 socket.on('disconnect', function () {
  console.log("Socket disconnected: " + socket.id);
 });

  socket.on('pedirCobroDeMesa', function (data) {
        //socket.emit('CobrarMesa', { content: data });
        console.log('llego al asd');
        socket.broadcast.emit('CobrarMesa',  data);
  });


});

server.listen( process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});

//exports.io = ;
