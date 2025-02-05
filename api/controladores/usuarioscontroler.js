var usuariosmodels = require("./modelos/usuariosmodels.js").usuariosmodels
var config = require ("../../config.js").config
var usuarioscontroler = {}
var nodemailer = require("nodemailer")


usuarioscontroler.registrar = function(request,response){
    var post = {
        email:request.body.email,
        nombre:request.body.nombre,
        apellido:request.body.apellido,
        contraseña:request.body.contraseña
    }

    if (post.email =="" || post.email ==null || post.email == undefined){
        response.json({mensaje: "el campo email es obligatorio ", state:false})
        return false
    }

    if (post.nombre =="" || post.nombre ==null || post.nombre == undefined){
        response.json({mensaje: "el campo nombre es obligatorio ", state:false})
        return false
    }

    if (post.apellido =="" || post.apellido ==null || post.apellido == undefined){
        response.json({mensaje: "el campo apellido es obligatorio ", state:false})
        return false
    }

    if (post.contraseña =="" || post.contraseña ==null || post.contraseña == undefined){
        response.json({mensaje: "el campo contraseña es obligatorio ", state:false})
        return false
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(regex.test(post.email) == false){
        response.json({mensaje: "escriba un email valido ", state:false})
        return false
    }

    if(post.nombre.length < 3){
        response.json({mensaje: "escriba un nombre valido ", state:false})
        return false
    }

    if(post.nombre.length > 20){
        response.json({mensaje: "escriba un nombre valido ", state:false})
        return false
    }

    post.contraseña = sha256(post.contraseña + config.secret)
    
    var letras = ["x", "a", "w", "p"]
    var posicionaleatoria = Math.floor(Math.random()* (3 - 0) + 0)

    var micodigo = letras[posicionaleatoria]+ "-" + Math.floor(Math.random()* (9999 - 1000) + 1000)
    post.codigo = micodigo

    post.estado = "inactivo"


    usuariosmodels.verposicionemail(post, function(existe) {
        if (existe == null){
            usuariosmodels.registrar(post,function(respuesta){
                if (respuesta.state == true){

                    // ENVIO DE CORREO

                    const transporter = nodemailer.createTransport({
                        host:config.email.host,
                        port:config.email.port,
                        secure:false,
                        requireTLS:true,
                        auth:{
                            user:config.email.user,
                            pass:config.email.pass
                        }
                    })

                    var mailoptions = {
                        from: config.email.user,
                        to:post.email,
                        subject: "activar cuenta con el codigo " + post.codigo,
                        html: `<body style="display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #FFDEE9, #B5FFFC); background-attachment: fixed; background-size: cover;">

                                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); max-width: 420px; text-align: center;">
                                <h2 style="color: #333; font-size: 24px; margin-bottom: 15px;">Activar Cuenta</h2>
                                <p style="color: #666; font-size: 16px; margin-bottom: 30px;">Por favor, verifica la información antes de continuar</p>

                                <div style="margin-bottom: 20px; text-align: left;">
                                    <label style="display: block; font-weight: bold; font-size: 14px; color: #444; margin-bottom: 5px;">Código de Activación:</label>
                                    <div style="background: #f5f5f5; padding: 12px 15px; border: 1px solid #ddd; border-radius: 8px; color: #555; font-size: 14px;">
                                        ${post.codigo}
                                    </div>
                                </div>

                                <div style="margin-bottom: 30px; text-align: left;">
                                    <label style="display: block; font-weight: bold; font-size: 14px; color: #444; margin-bottom: 5px;">Correo Electrónico:</label>
                                    <div style="background: #f5f5f5; padding: 12px 15px; border: 1px solid #ddd; border-radius: 8px; color: #555; font-size: 14px;">
                                        ${post.email}
                                    </div>
                                </div>

                                <button style="background: #6A11CB; color: white; padding: 12px 25px; font-size: 16px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(106, 17, 203, 0.3);">
                                    <a href = "http://localhost:3000/usuarios/activar/${post.email}/${post.codigo}">Activar Cuenta</a>
                                </button>
                                </div>

                                </body>`
                    }

                    transporter.sendMail(mailoptions,(error, info)=>{
                        if(error){
                            console.log(error)
                        }
                        else{
                            console.log(info)
                        }
                    })


                    response.json({state:true, mensaje:"usuario guardado correctamente"})
                }
                else{
                            response.json({state:false, mensaje:"se presento un error al guardar el usuario"})
                }
                
            })

        }
        else{
            response.json({state:false, mensaje:"este correo ya esta registrado"})
        }

    })



            
}

 

usuarioscontroler.actualizar = function(request,response){
    var post = {
        email:request.body.email,
        nombre:request.body.nombre,
        apellido:request.body.apellido,
        
    }

    if (post.email =="" || post.email ==null || post.email == undefined){
        response.json({mensaje: "el campo email es obligatorio ", state:false})
        return false
    }

    if (post.nombre =="" || post.nombre ==null || post.nombre == undefined){
        response.json({mensaje: "el campo nombre es obligatorio ", state:false})
        return false
    }

    if (post.apellido =="" || post.apellido ==null || post.apellido == undefined){
        response.json({mensaje: "el campo apellido es obligatorio ", state:false})
        return false
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(regex.test(post.email) == false){
        response.json({mensaje: "escriba un email valido ", state:false})
        return false
    }

    if(post.nombre.length < 3){
        response.json({mensaje: "escriba un nombre valido ", state:false})
        return false
    }

    if(post.nombre.length > 20){
        response.json({mensaje: "escriba un nombre valido ", state:false})
        return false
    }

    usuariosmodels.verposicionemail(post,function(respuesta){
        if(respuesta == null){
            response.json({mensaje: "el email no existe en la base de datos ", state:false})
            return false
        }
        else{
            
            usuariosmodels.actualizar(post, function(respuesta2){
                if(respuesta2.state == true){
                    response.json({mensaje: "usuario actualizado correctamente ", state:true})
                }
                else{
                    response.json({mensaje: "se presento un error al actaulizar ", state:false})
                }
            })

        }
    })
    
}

usuarioscontroler.eliminar = function(request,response){
    var post = {
        email:request.body.email
        
    }

    if (post.email =="" || post.email ==null || post.email == undefined){
        response.json({mensaje: "el campo email es obligatorio ", state:false})
        return false
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(regex.test(post.email) == false){
        response.json({mensaje: "escriba un email valido ", state:false})
        return false
    }

    usuariosmodels.verposicionemail(post,function(respuesta){

        if (respuesta == null){
            response.json({mensaje: "el email no existe en la base de datos ", state:false})
            return false
        }
        else{
        
            usuariosmodels.eliminar(post,function(respuesta){
                response.json({mensaje: "usuario eliminado correctamente ", state:true})
            })
            
        }

    })
 
}

usuarioscontroler.listar = function(request,response){
    usuariosmodels.listar(null,function(respuesta){
        response.json(respuesta)

    })
    
}

usuarioscontroler.listaremail = function(request,response){
    var post = {
        email:request.body.email
        
    }

    if (post.email =="" || post.email ==null || post.email == undefined){
        response.json({mensaje: "el campo email es obligatorio ", state:false})
        return false
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(regex.test(post.email) == false){
        response.json({mensaje: "escriba un email valido ", state:false})
        return false
    }


    usuariosmodels.verposicionemail(post,function(respuesta){

        if (respuesta == null){
            response.json({mensaje: "el email no existe en la base de datos ", state:false})
            return false
        }
        else{
            
            usuariosmodels.listaremail(post,function(respuesta){
                response.json(respuesta)
            })
            
        }

    })

}


module.exports.usuarioscontroler = usuarioscontroler 