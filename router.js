const express = require('express');
const conexion = require('./database/bd');
const router = express.Router();

router.get('/',  (req, res)=>{
    res.render('login');
})

router.get('/loginTienda',  (req, res)=>{
    res.render('loginTienda',{user : req.session.user});
})


router.get("/registro", (req, res)=>{
    res.render("registro", {user : req.session.user});
})


router.get('/vista_catalogo',(req, res) =>{

    conexion.query('SELECT * FROM tienda', (error, results) => {
        
        if(error){
            throw error;
        }else{
            res.render('vista_catalogo', {results: results, user: req.session.user})
        }

    }) 
})

router.get('/vista_recompensas/:id',(req, res) =>{

    const id = req.params.id;

    conexion.query('SELECT * FROM recompensa INNER JOIN tienda ON recompensa.id_tienda_fk = tienda.id_tienda WHERE id_tienda_fk = ?', [id], (error, results) => {
        if(error){
            throw error;
    
        }else{

            console.log('req.session.userASDASDASDASD :>> ', req.session.user.id_tarjeta_fk);
            
            conexion.query('SELECT * FROM tarjeta WHERE id_tarjeta = ?', [req.session.user.id_tarjeta_fk], (error, resultsT) => {

                res.render('vista_recompensas', {results: results, user : req.session.user, resultsT:resultsT} )
                
            })
        }
    }) 

})

router.get('/vista_historial/:id(\\d+)',(req, res) =>{

    const id = req.params.id;

    console.log('id :>> ', id);

    conexion.query('SELECT canje.id_canjes, DATE_FORMAT(canje.fecha_canje, "%d/%m/%Y") AS fecharda, canje.estado AS "estadocanje" ,recompensa.nombre_producto AS "nombre_recom", recompensa.meta_canje AS "puntos",recompensa.imagen AS "imagen", tienda.nombre_tienda AS "nombre_tienda", tienda.ubicacion_tienda AS "ubicacion" FROM canje INNER JOIN recompensa ON canje.id_recompensa_fk = recompensa.id_recompensa INNER JOIN tienda ON recompensa.id_tienda_fk = tienda.id_tienda INNER JOIN usuario ON canje.id_usuario_fk = usuario.id_usuario WHERE usuario.id_usuario = ?',[id], (error, results) => {
       
        if(error){
            throw error;
    
        }else{

            conexion.query('SELECT * FROM tarjeta WHERE id_tarjeta = ?', [req.session.user.id_tarjeta_fk], (error, resultsT) => {

                res.render('vista_historial', {results: results, user: req.session.user, resultsT:resultsT})

            })
        }

    }) 
})


router.get('/vista_aceptar_recompensas/:id(\\d+)',(req, res) =>{

    const id = req.params.id;

    conexion.query('SELECT canje.id_canjes, DATE_FORMAT(canje.fecha_canje, "%d/%m/%Y") AS fecharda, usuario.nombre_usuario AS "nombreusuario",usuario.rut_usuario AS "rutusuario", canje.estado AS "estadocanje" ,recompensa.nombre_producto AS "nombre_recom", recompensa.meta_canje AS "puntos",recompensa.imagen AS "imagen", tienda.nombre_tienda AS "nombre_tienda", tienda.ubicacion_tienda AS "ubicacion" FROM canje INNER JOIN recompensa ON canje.id_recompensa_fk = recompensa.id_recompensa INNER JOIN tienda ON recompensa.id_tienda_fk = tienda.id_tienda INNER JOIN usuario ON canje.id_usuario_fk = usuario.id_usuario WHERE tienda.id_tienda = ? order by canje.estado ASC',[id], (error, results) => {
       
        if(error){
            throw error;
    
        }else{
            res.render('vista_aceptar_recompensas', {results: results, user: req.session.user})
        }

    }) 
})

router.get('/vista_eliminar_recompensa',(req, res) =>{
    res.render('vista_eliminar_recompensa', {user : req.session.user})
})

router.get('/intermediaria_canjeo',(req, res) =>{
    res.render('intermediaria_canjeo', {user: req.session.user} )
})

router.get('/vista_intermediaria_aceptar_canje',  (req, res)=>{
    res.render('vista_intermediaria_aceptar_canje', {user : req.session.user});
})

router.get('/',  (req, res)=>{

    res.render('index', {user : req.session.user});

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




router.get('/eliminar_recompensa/:id',  (req, res)=>{

    const id = req.params.id;

    conexion.query('UPDATE recompensa SET estado = 1 WHERE id_recompensa = ?',[id], (error, results) => {

        if(error){

            throw error;
    
        }else{
                conexion.query('SELECT * FROM recompensa WHERE id_tienda_fk = ?',[req.session.user.id_tienda], (error, results) => {
                
                    res.render('registros_recompensas' , {user: req.session.user, results: results});
                }) 
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
router.post('/aceptarrecompensa', crud.aceptarrecompensa);
router.post('/caja', crud.caja);
router.post('/loginTienda',crud.loginTienda);
router.post('/canjeoDePuntos', crud.canjeoDePuntos);
module.exports = router;