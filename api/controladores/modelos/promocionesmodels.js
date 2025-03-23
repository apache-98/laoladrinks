var promocionesmodels = {}
const mongoose = require ("mongoose")

var Schema = mongoose.Schema

var promocionesSchema = new Schema({
    nombre:String,
    codigo: String,
    descripcion:String,
    imagen: String,
    precio: String
})

const mymodel = mongoose.model("promociones",promocionesSchema)

promocionesmodels.validarcodigo = function(post, callback){
    mymodel.find({codigo:post.codigo})
    .then((respuesta) =>{
        return callback(respuesta)//cambio
    }).catch((error) =>{
        console.log(error)
        return callback({state:false})
    })
}

promocionesmodels.guardar = function (post, callback){
    const instancia = new mymodel
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo
    instancia.imagen = post.imagen
    instancia.precio = post.precio
    instancia.descripcion = post.descripcion

    instancia.save().then((respuesta)=>{
        return callback ({state:true})
    }).catch((error)=>{
        console.log(error)
        return callback ({state:false})
    })

}

promocionesmodels.actualizar = function (post, callback){
    mymodel.findOneAndUpdate({_id:post._id},
        {
            nombre:post.nombre,
            imagen:post.imagen,
            descripcion:post.descripcion,
            precio:post.precio
        })

    .then((respuesta)=>{
        return callback ({state:true})
    }).catch((error)=>{
        console.log(error)
        return callback ({state:false})
    })

}


promocionesmodels.eliminar = function (post, callback){
    mymodel.findOneAndDelete({_id:post._id})

    .then((respuesta)=>{
        return callback ({state:true})
    }).catch((error)=>{
        console.log(error)
        return callback ({state:false})
    })

}

promocionesmodels.listar = function(post, callback){
    mymodel.find({})

    .then((respuesta)=>{
        return callback (respuesta)
    }).catch((error)=>{
        console.log(error)
        return callback ([])
    })

}

promocionesmodels.listarid = function(post, callback){
    mymodel.find({_id:post._id},{})

    .then((respuesta)=>{
        return callback (respuesta)
    }).catch((error)=>{
        console.log(error)
        return callback ([])
    })

}
promocionesmodels.mymodel = mymodel
module.exports.promocionesmodels = promocionesmodels