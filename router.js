const express = require('express');
const conexion = require('./database/bd');
const router = express.Router();

router.get('/',  (req, res)=>{

    res.render('login');

})


router.get("/registro", (req, res)=>{
    res.render("registro");
})


router.get('/vista_catalogo',(req, res) =>{
    res.render('vista_catalogo')
})

router.get('/vista_recompensas',(req, res) =>{
    res.render('vista_recompensas')
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
module.exports = router;