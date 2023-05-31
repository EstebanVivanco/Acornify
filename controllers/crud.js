const router = require('../router');
const { query } = require('../database/bd');
const conexion = require('../database/bd');

exports.caja =(req, res)=>{

    const rut = req.body.rut;

    //Obtener el ID del usuario mediante el rut
    conexion.query('SELECT id_usuario, id_tarjeta_fk FROM usuario WHERE rut_usuario =  ?', [rut], (error, results)=>{

        const id_usuario = results[0].id_usuario;
        const id_tarjeta_fk = results[0].id_tarjeta_fk;

        conexion.query('SELECT puntos FROM tarjeta WHERE id_tarjeta = ?', [id_tarjeta_fk], (error, results)=>{

            const puntos = results[0].puntos; //PUNTOS DEL RUT INGRESADO
            const NuevosPuntos = puntos + 1;

            conexion.query('Update tarjeta SET ? WHERE id_tarjeta = ?', [{puntos: NuevosPuntos}, id_tarjeta_fk], (error, results)=>{

                conexion.query('INSERT INTO registro_compra SET ?', {id_usuario_fk : id_usuario, id_tienda_fk: 1, fecha_compra: '23-05-05'}, (error, results)=>{
                    
                    if(error){
                        throw error;
                    }else{
                        res.render('caja',{
                            alert:true,
                            alertTitle: 'Venta Finalizada',
                            alertMessage: 'Se han actualizado los puntos del Usuario',
                            alertIcon:'success',
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'caja',
                            user: req.session.user
                        })
                    }

                });
                
            });


        });

    });

}


exports.saveuser =(req, res)=>{
    const rut = req.body.rut;
    const nombre = req.body.name;
    const correo = req.body.correo;
    const pass = req.body.password;

    conexion.query('INSERT INTO usuario SET ?', {rut_usuario:rut, nombre_usuario:nombre, email_usuario:correo, password_usuario:pass}, (error, results)=>{

        if(error){
            throw error;
        }else{
            res.render('registro',{
                alert:true,
                alertTitle: 'Resgistro',
                alertMessage: 'Registro de usuario exitoso!',
                alertIcon:'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            })
        }
    })
}

exports.saverecompensa =(req, res)=>{

    const id = req.body.id;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const cantidad = req.body.cantidad;
    const image = req.file.filename;

    conexion.query('INSERT INTO recompensa SET ?', {id_tienda_fk:id, nombre_producto:nombre, descripcion_producto:descripcion, imagen:image, meta_canje:cantidad, estado: 0}, (error, results)=>{

        if(error){
            throw error;
        }else{
            res.render('vista_crear_recompensa',{
                alert:true,
                alertTitle: 'RECOMPENSA NUEVA',
                alertMessage: 'Se ha registrado una nueva recompensa !',
                alertIcon:'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'vista_crear_recompensa',
                user: req.session.user

            })
        }

    })

}

exports.updaterecompensa =(req, res)=>{

    const id = req.body.id;
    const idr = req.body.idr;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const estado = req.body.estado;
    const meta = req.body.meta;
    const image = req.file?.filename;
    const imgBD = req.body.imgexistente;
    let parametroImagen = '';

    if (image !== undefined) {
        parametroImagen = image;
        console.log('parametroImagen :>> ', parametroImagen);
    }else{
        parametroImagen = imgBD;
        console.log('parametroImagen :>> ', parametroImagen);

    }



    conexion.query('Update recompensa SET ? WHERE id_recompensa = ?', [{id_tienda_fk:id, nombre_producto:nombre, descripcion_producto:descripcion, imagen: parametroImagen, meta_canje:meta, estado: estado}, idr], (error, result1s)=>{

        if(error){
            throw error;
        }else{
            conexion.query('SELECT * FROM recompensa WHERE id_tienda_fk = ?',[id], (error, results) => {

                res.render('vista_editar_recompensa' ,{
                    alert:true,
                    alertTitle: 'RECOMPENSA ACTUALIZADA',
                    alertMessage: 'Se ha actualizado la recompensa !',
                    alertIcon:'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'registros_recompensas/'+id,
                    user: req.session.user,
                    results:results

                })
            })
        }
    })

}

exports.validacion = (req, res)=>{
    const correo = req.body.email;
    const pass = req.body.password;

    if(correo && pass){
        conexion.query('SELECT * FROM usuario WHERE email_usuario = ? AND password_usuario = ? ', [correo, pass], (error, results)=>{
            if(error){
                throw error;
            }else{
                if(results.length > 0){
                    //ENTRA
                    res.render('login',{
                        alert:true,
                        alertTitle: 'Conexion exitosa',
                        alertMessage: 'Bienvenido! ',
                        alertIcon:'succes',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'vista_catalogo',
                        user: req.session.user = results[0]
                    })
                }else{
                    //NO ENTRA
                    res.render('login',{
                        alert:true,
                        alertTitle: 'Error',
                        alertMessage: 'Nombre o contraseña incorrectos!',
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: ''
                    })
                }
            }
        })
    }

}

exports.loginTienda = (req, res)=>{
    const correo = req.body.email;
    const pass = req.body.password;

    if(correo && pass){
        conexion.query('SELECT * FROM tienda WHERE email_tienda = ? AND password_tienda = ?', [correo, pass], (error, results)=>{
            if(error){
                throw error;
            }else{
                if(results.length > 0){
                    //ENTRA
                    res.render('loginTienda',{

                        alert:true,
                        alertTitle: 'Conexion exitosa',
                        alertMessage: 'Bienvenido! ',
                        alertIcon:'succes',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'caja',
                        user : req.session.user = results[0]
                        
                    })
                    

                }else{
                    //NO ENTRA
                    res.render('loginTienda',{
                        alert:true,
                        alertTitle: 'Error',
                        alertMessage: 'Nombre o contraseña incorrectos!',
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'loginTienda'
                    })
                }
            }
        })
    }

}

exports.canjeoDePuntos = (req, res)=>{

    const id = req.body.id;
    const id_tarjeta_fk = req.body.id_tarjeta_fk;
    const puntos_f = req.body.puntos_f;
    const idrecompensa = req.body.idrecompensa;
    var fechaActual = new Date();

    console.log('iderecompensa :>> ', idrecompensa);
        conexion.query('UPDATE tarjeta SET ? WHERE id_tarjeta = ?', [{puntos:puntos_f}, id_tarjeta_fk], (error, results)=>{

            if(error){
                throw error;
            }else{

                conexion.query('INSERT INTO canje SET ?', {id_usuario_fk: req.session.user.id_usuario, id_recompensa_fk: idrecompensa, id_tienda_fk: id, estado: 0, fecha_canje: fechaActual}, (error, results)=>{
                   
                    if(error){
                        throw error;
                    }else{
                        res.render('intermediaria_canjeo', {user: req.session.user});
                    }

                })

            }

        })

}

exports.aceptarrecompensa = (req, res)=>{

    const idcanje = req.body.idcanje;

        conexion.query('UPDATE canje SET ? WHERE id_canjes = ?', [{estado:1}, idcanje], (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render('vista_intermediaria_aceptar_canje', {user: req.session.user});

            }

        })

}