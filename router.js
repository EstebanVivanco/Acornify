const express = require('express');
const conexion = require('./database/bd');
const router = express.Router();

router.get('/',  (req, res)=>{

    res.render('login');

})

router.get('/loginTienda',  (req, res)=>{

    res.render('loginTienda');

})


router.get("/registro", (req, res)=>{
    res.render("registro");
})


router.get('/vista_catalogo',(req, res) =>{

    conexion.query('SELECT * FROM tienda', (error, results) => {
        if(error){
            throw error;
    
        }else{
            res.render('vista_catalogo', {results: results})
        }
    }) 
})

router.get('/vista_recompensas',(req, res) =>{

    conexion.query('SELECT * FROM recompensa', (error, results) => {
        if(error){
            throw error;
    
        }else{
            res.render('vista_recompensas', {results: results})
        }
    }) 
})

router.get('/vista_eliminar_recompensa',(req, res) =>{
    res.render('vista_eliminar_recompensa')
})


router.get('/',  (req, res)=>{

    res.render('index');

})

router.get('/caja',  (req, res)=>{

    res.render('caja');

})

router.get('/vista_crear_recompensa',(req, res) =>{
    res.render('vista_crear_recompensa');
})

const crud = require('./controllers/crud');

router.post('/validacion', crud.validacion);
router.post('/saveuser', crud.saveuser);
router.post('/caja', crud.caja);
router.post('/loginTienda',crud.loginTienda);
module.exports = router;