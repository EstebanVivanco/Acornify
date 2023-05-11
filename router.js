const express = require('express');
const conexion = require('./database/bd');
const router = express.Router();

router.get('/',  (req, res)=>{

    res.render('index');

})





router.get('/vista_catalogo',(req, res) =>{
    res.render('vista_catalogo')
})



module.exports = router;