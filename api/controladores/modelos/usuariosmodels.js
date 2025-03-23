var usuariosmodels = {}
const mongoose = require ("mongoose")

var Schema = mongoose.Schema

var usuariosSchema = new Schema({
    email:String,
    nombre:String,
    apellido: String,
    password: String,
    estado: String,
    codigo: String,
    perfil:String
})

const mymodel = mongoose.model("usuarios",usuariosSchema)


usuariosmodels.registrar = function (post, callback){
    const instancia = new mymodel
    instancia.email = post.email
    instancia.nombre = post.nombre
    instancia.apellido = post.apellido
    instancia.password = post.password
    instancia.estado = post.estado
    instancia.codigo = post.codigo
    instancia.perfil = "Cliente"

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
    mymodel.findOne({email:post.email})
    .then((respuesta)=>{
        return callback(respuesta) // cambio
    }).catch((error) =>{
        console.log(error)
        return callback({state:false})
    })


/*     var posicion = usuarios.findIndex((item)=> item.email ==post.email)
    return callback({posicion:posicion}) */
}

usuariosmodels.actualizar = function(post, callback){
    mymodel.updateOne({email:post.email},{
        nombre:post.nombre,
        apellido:post.apellido,
        perfil:post.perfil,
        estado:post.estado

    }).then((respuesta)=>{
        return callback({state:true})
    }).catch((error) =>{
        console.log(error)
        return callback({state:false})
    })
/*     usuarios[post.posicion].nombre = post.nombre
    usuarios[post.posicion].apellido = post.apellido
    return callback ({srespuesta}) */
}

usuariosmodels.eliminar = function(post,callback){
    mymodel.deleteOne({email:post.email})
    .then((respuesta)=>{
        return callback({respuesta})
    }).catch((error) =>{
        console.log(error)
        return callback({state:false})
    })

}

usuariosmodels.listar = function(post,callback){
    mymodel.find({},{password:0,codigo:0,__v:0}).then((respuesta) =>{
        return callback(respuesta)
    }).catch((error) =>{
        console.log(error)
        return callback({state:false})
    })
}

usuariosmodels.listaremail = function(post,callback){
    mymodel.find({email:post.email},{password:0,codigo:0}).then((respuesta) =>{
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

        return callback(respuesta)//cambio2

    }).catch((error) =>{
        console.log(error)
        return callback({state:false})
    })

}

usuariosmodels.login = function(post,callback){
    mymodel.find({email:post.email,password:post.password},{_id:1,nombre:1,apellido:1,estado:1,perfil:1}).then((respuesta) =>{
        return callback(respuesta)//cambio 3
    }).catch((error) =>{
        console.log(error)
        return callback({state:false})
    })
}



usuariosmodels.mymodel = mymodel
module.exports.usuariosmodels = usuariosmodels