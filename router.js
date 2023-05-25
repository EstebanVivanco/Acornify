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

router.get('/registros_recompensas/:id',  (req, res)=>{

    const id = req.params.id;

    conexion.query('SELECT * FROM recompensa WHERE id_tienda_fk = ?',[id], (error, results) => {

        if(error){

            throw error;
    
        }else{
            res.render('registros_recompensas', {user : req.session.user, results: results});
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
router.post('/caja', crud.caja);
router.post('/loginTienda',crud.loginTienda);
module.exports = router;