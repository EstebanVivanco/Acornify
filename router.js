const express = require('express');
const conexion = require('./database/bd');
const router = express.Router();

router.get('/',  (req, res)=>{

    res.render('index');

})

router.get("/login", (req, res)=>{
    res.render("login");
})






router.get('/vista_catalogo',(req, res) =>{
    res.render('vista_catalogo')
})


router.get('/',  (req, res)=>{

    res.render('index');

})

router.get('/caja',  (req, res)=>{

    res.render('caja');

})


module.exports = router;