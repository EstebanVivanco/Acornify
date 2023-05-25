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
                            ruta: 'caja'
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

exports.validacion = (req, res)=>{
    const correo = req.body.email;
    const pass = req.body.password;

    if(correo && pass){
        conexion.query('SELECT * FROM usuario WHERE email_usuario = ? AND password_usuario = ?', [correo, pass], (error, results)=>{
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
                        ruta: 'vista_recompensas'
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
                        ruta: 'vista_crear_recompensa'
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