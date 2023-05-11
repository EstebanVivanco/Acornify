const express = require('express');
const conexion = require('./database/bd');
const router = express.Router();

router.get('/',  (req, res)=>{

    res.render('index');

})

router.get("/login", (req, res)=>{
    res.render("login");
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



module.exports = router;