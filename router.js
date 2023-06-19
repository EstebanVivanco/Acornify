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

            res.render('vista_catalogo', {results: results, user: req.session.user, uid: req.session.uid })
        }

    }) 
})

router.get('/vista_recompensas/:id',(req, res) =>{
    const id = req.params.id;
    const id_user = req.session.user.id_usuario;
    conexion.query('SELECT * FROM recompensa INNER JOIN tienda ON recompensa.id_tienda_fk = tienda.id_tienda WHERE id_tienda_fk = ?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            console.log('req.session.userASDASDASDASD :>> ', req.session.user.id_tarjeta_fk);

            conexion.query('SELECT * FROM tarjeta WHERE id_tarjeta = ?', [req.session.user.id_tarjeta_fk], (error, resultsT) => {

                conexion.query('SELECT COUNT(*) AS asistido FROM registro_compra WHERE id_usuario_fk = ? AND id_tienda_fk = ?;', [id_user , id], (error, asistencia)=>{

                    console.log("asistencia:   -- >>> ", asistencia[0].asistido);

                    res.render('vista_recompensas', {results: results, user : req.session.user, resultsT:resultsT , asistencia: asistencia} )
                })
            })
        }
    }) 
})

router.get('/vista_historial/:id(\\d+)',(req, res) =>{

    const id = req.params.id;

    console.log('id :>> ', id);

    const query = `SELECT
    u.nombre_usuario,
    t.nombre_tienda,
    t.ubicacion_tienda,
    DATE_FORMAT(COALESCE(rc.fecha_compra, c.fecha_canje), '%Y/%m/%d %H:%i:%s') AS fecha_operacion,
    DATE_FORMAT(COALESCE(rc.fecha_compra, c.fecha_canje), '%d/%m/%Y') AS fecha_formateada,
    DATE_FORMAT(COALESCE(rc.fecha_compra, c.fecha_canje), '%H:%i:%s') AS hora_formateada,
    r.nombre_producto,
    CASE
        WHEN rc.id_registro_compra IS NOT NULL THEN NULL
        WHEN c.id_canjes IS NOT NULL THEN r.meta_canje
    END AS puntos,
    CASE
        WHEN rc.id_registro_compra IS NOT NULL THEN 'Compra'
        WHEN c.id_canjes IS NOT NULL THEN 'Canje'
    END AS tipo_operacion,
    c.estado AS estado_canje,
    rc.puntos_compra AS puntos_compra
FROM
    (SELECT
        id_usuario_fk,
        id_tienda_fk,
        fecha_compra,
        NULL AS id_canje,
        id_registro_compra,
        NULL AS id_recompensa_fk,
        puntos_compra
    FROM
        registro_compra
    UNION ALL
    SELECT
        id_usuario_fk,
        id_tienda_fk,
        fecha_canje,
        id_canjes,
        NULL AS id_registro_compra,
        id_recompensa_fk,
        NULL AS puntos_compra
    FROM
        canje) AS operaciones
    INNER JOIN usuario u ON operaciones.id_usuario_fk = u.id_usuario
    INNER JOIN tienda t ON operaciones.id_tienda_fk = t.id_tienda
    LEFT JOIN registro_compra rc ON rc.id_registro_compra = operaciones.id_registro_compra
    LEFT JOIN canje c ON c.id_canjes = operaciones.id_canje
    LEFT JOIN recompensa r ON r.id_recompensa = operaciones.id_recompensa_fk
WHERE
    u.id_usuario = ${id}
ORDER BY
    fecha_operacion DESC;`;
 
    conexion.query(query, (error, results) => {
       
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

router.get('/registroT', (req, res)=>{
    res.render('registroT');
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
router.post('/savestore', crud.savestore);
module.exports = router;