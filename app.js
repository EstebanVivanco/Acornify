const { v4: uuidv4 } = require('uuid');
const { json } = require('express');
const express = require('express');
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const SerialPort = require('serialport').SerialPort;
const {DelimiterParser} = require('@serialport/parser-delimiter')

const app = express();

const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '.jpg')
    }
});


app.use(express.urlencoded({extended:false}));
app.use(express(json));

app.use(multer({
    storage,
    dest: path.join(__dirname,'public/uploads')
}).single('image'));

//Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

//Permitir ver imagenes señores
app.use(express.static(path.join(__dirname,'public')));
//Permitir usar componentes
app.use(express.static(path.join(__dirname,'public/components')));
app.use(express.static(path.join(__dirname,'helpers')));
// app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));
//Sessions
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));



app.use('/', require('./router'));

const server = app.listen(5000, ()=>{
    console.log("Server corriendo en el puerto 5000, buenas");
});

// const io = require('socket.io')(server);


// const puerto = new SerialPort({
//    path: 'COM5',
//    baudRate: 115200
// });

// const parser = puerto.pipe(new DelimiterParser({delimiter: '\n'}))

// parser.on('open', function(){
//    console.log('con open');
// })

// parser.on('data', function(data){
    
//     var enc = new TextDecoder();
//     var arr = new Uint8Array(data);
//     ready = enc.decode(arr);
//     io.emit("arduino:data",{
//         value: ready
//     });
//     console.log('ready :>> ', ready);

// })

// // Evento que se ejecuta cuando un cliente se conecta al servidor
// io.on('connection', (socket) => {
//     console.log('Un cliente se ha conectado');
  
//     // Evento que se ejecuta cuando un cliente envía un mensaje
//     socket.on('mensaje', (data) => {
//       console.log('Mensaje recibido:', data);
//     });
  
//     // Evento que se ejecuta cuando un cliente se desconecta del servidor
//     socket.on('disconnect', () => {
//       console.log('Un cliente se ha desconectado');
//     });
//   });