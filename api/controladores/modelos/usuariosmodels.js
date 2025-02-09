var usuariosmodels = {}
const mongoose = require ("mongoose")

var Schema = mongoose.Schema

var usuariosSchema = new Schema({
    email:String,
    nombre:String,
    apellido: String,
    contraseña: String,
    estado: String,
    codigo: String
})

const mymodel = mongoose.model("usuarios",usuariosSchema)


usuariosmodels.registrar = function (post, callback){
    const instancia = new mymodel
    instancia.email = post.email
    instancia.nombre = post.nombre
    instancia.apellido = post.apellido
    instancia.contraseña = post.contraseña
    instancia.estado = post.estado
    instancia.codigo = post.codigo

    instancia.save().then((respuesta)=>{
        return callback ({state:true})
    }).catch((error)=>{
        console.log(error)
        return callback ({state:false})
    })
/*     usuarios.push(post)
    return callback({state:true}) */
}

usuariosmodels.verposicionemail = function(post, callback){
    mymodel.findOne({email:post.email}).then((respuesta)=>{
        console.log("------------>")
        console.log(respuesta)
        return callback (respuesta)
    })


/*     var posicion = usuarios.findIndex((item)=> item.email ==post.email)
    return callback({posicion:posicion}) */
}

usuariosmodels.actualizar = function(post, callback){
    mymodel.updateOne({email:post.email},{
        nombre:post.nombre,
        apellido:post.apellido
    }).then((respuesta)=>{
        return callback({state:true})
    }).catch((error) =>{
        console.log(error)
        return callback({state:false})
    })
/*     usuarios[post.posicion].nombre = post.nombre
    usuarios[post.posicion].apellido = post.apellido
    return callback ({state: true}) */
}

usuariosmodels.eliminar = function(post,callback){
    mymodel.deleteOne({email:post.email})
    .then((respuesta)=>{
        return callback({state:true})
    }).catch((error) =>{
        console.log(error)
        return callback({state:false})
    })

}

usuariosmodels.listar = function(post,callback){
    mymodel.find({},{contraseña:0,codigo:0}).then((respuesta) =>{
        return callback(respuesta)
    }).catch((error) =>{
        console.log(error)
        return callback({state:false})
    })
}

usuariosmodels.listaremail = function(post,callback){
    mymodel.find({email:post.email},{contraseña:0,codigo:0}).then((respuesta) =>{
        return callback(respuesta)
    }).catch((error) =>{
        console.log(error)
        return callback({state:false})
    })
}

usuariosmodels.activar = function(post, callback){
    mymodel.updateOne({email:post.email, codigo:post.codigo},{
       estado: "activo"
    }).then((respuesta)=>{

        return callback(respuesta)

    }).catch((error) =>{
        console.log(error)
        return callback({state:false})
    })

}

usuariosmodels.login = function(post,callback){
    mymodel.find({email:post.email,contraseña:post.contraseña},{nombre:1,apellido:1,estado:1}).then((respuesta) =>{
        return callback(respuesta)
    }).catch((error) =>{
        console.log(error)
        return callback({state:false})
    })
}




module.exports.usuariosmodels = usuariosmodels