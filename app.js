const express = require('express');
const { json } = require('express');
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const SerialPort = require('serialport').SerialPort;
const {DelimiterParser} = require('@serialport/parser-delimiter')


const puerto = new SerialPort({
    path: 'COM5',
    baudRate: 115200
});

const parser = puerto.pipe(new DelimiterParser({delimiter: '\n'}))

parser.on('open', function(){
    console.log('con open');
})

parser.on('data', function(data){
    
    var enc = new TextDecoder();
    var arr = new Uint8Array(data);
    ready = enc.decode(arr);
    console.log('ready :>> ', ready);

})

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

//Sessions
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));



app.use('/', require('./router'));

app.listen(5000, ()=>{
    console.log("Server corriendo en el puerto 5000, buenas");
});
