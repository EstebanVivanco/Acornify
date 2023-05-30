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

router.get('/vista_recompensas/:id',(req, res) =>{

    const id = req.params.id;
    conexion.query('SELECT * FROM recompensa INNER JOIN tienda ON recompensa.id_tienda_fk = tienda.id_tienda WHERE id_tienda_fk = ?', [id], (error, results) => {
        if(error){
            throw error;
    
        }else{
            res.render('vista_recompensas', {results: results, user : req.session.user})
        }
    }) 
})

router.get('/vista_historial',(req, res) =>{

    conexion.query('SELECT canje.id_canjes, DATE_FORMAT(canje.fecha_canje, "%d/%m/%Y") AS fecharda, recompensa.nombre_producto AS "nombre_recom", recompensa.meta_canje AS "puntos", tienda.nombre_tienda AS "nombre_tienda", tienda.ubicacion_tienda AS "ubicacion" FROM canje INNER JOIN recompensa ON canje.id_recompensa_fk = recompensa.id_recompensa INNER JOIN tienda ON recompensa.id_tienda_fk = tienda.id_tienda', (error, results) => {
        if(error){
            throw error;
    
        }else{
            res.render('vista_historial', {results: results})
        }
    }) 
})


router.get('/vista_eliminar_recompensa',(req, res) =>{
    res.render('vista_eliminar_recompensa')
})


router.get('/',  (req, res)=>{

    res.render('index');

})


router.get('/registros_recompensas/:id',  (req, res)=>{

    const id = req.params.id;

    conexion.query('SELECT * FROM recompensa WHERE id_tienda_fk = ?',[id], (error, results) => {

        if(error){

            throw error;
    
        }else{
            res.render('registros_recompensas', {user: req.session.user, results: results});
        }
    }) 
    

})

router.get('/editar_recompensa/:id',  (req, res)=>{

    const id = req.params.id;

    conexion.query('SELECT * FROM recompensa WHERE id_recompensa = ?',[id], (error, results) => {

        if(error){

            throw error;
    
        }else{
            res.render('vista_editar_recompensa', {user : req.session.user,results: results});
        }
    }) 
    

})

router.get('/caja',  (req, res)=>{

    res.render('caja', {user : req.session.user});

})

router.get('/vista_crear_recompensa',(req, res) =>{
    res.render('vista_crear_recompensa', {user : req.session.user});
})

router.get('/logout',  (req, res)=>{

    req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/'); // Redirige a la página de inicio de sesión u otra página adecuada
        }
    });


})

const crud = require('./controllers/crud');

router.post('/validacion', crud.validacion);
router.post('/saveuser', crud.saveuser);
router.post('/saverecompensa', crud.saverecompensa);
router.post('/updaterecompensa', crud.updaterecompensa);
router.post('/caja', crud.caja);
router.post('/loginTienda',crud.loginTienda);
router.post('/canjeoDePuntos', crud.canjeoDePuntos);
module.exports = router;