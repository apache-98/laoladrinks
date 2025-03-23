var serviciosmodels = {}
const mongoose = require ("mongoose")

var Schema = mongoose.Schema

var serviciosSchema = new Schema({
    nombre:String,
    codigo: String
})

const mymodel = mongoose.model("servicios",serviciosSchema)

serviciosmodels.validarcodigo = function(post, callback){
    mymodel.find({codigo:post.codigo})
    .then((respuesta) =>{
        return callback(respuesta)
    }).catch((error) =>{
        console.log(error)
        return callback({state:false})
    })
}

serviciosmodels.guardar = function (post, callback){
    const instancia = new mymodel
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo

    instancia.save().then((respuesta)=>{
        return callback ({state:true})
    }).catch((error)=>{
        console.log(error)
        return callback ({state:false})
    })

}

serviciosmodels.actualizar = function (post, callback){
    mymodel.findOneAndUpdate({_id:post._id},{nombre:post.nombre})

    .then((respuesta)=>{
        return callback ({state:true})
    }).catch((error)=>{
        console.log(error)
        return callback ({state:false})
    })

}


serviciosmodels.eliminar = function (post, callback){
    mymodel.findOneAndDelete({_id:post._id})

    .then((respuesta)=>{
        return callback ({state:true})
    }).catch((error)=>{
        console.log(error)
        return callback ({state:false})
    })

}

serviciosmodels.listar = function(post, callback){
    mymodel.find({})

    .then((respuesta)=>{
        return callback (respuesta)
    }).catch((error)=>{
        console.log(error)
        return callback ([])
    })

}

serviciosmodels.listarid = function(post, callback){
    mymodel.find({_id:post._id},{})

    .then((respuesta)=>{
        return callback (respuesta)
    }).catch((error)=>{
        console.log(error)
        return callback ([])
    })

}

module.exports.serviciosmodels = serviciosmodels