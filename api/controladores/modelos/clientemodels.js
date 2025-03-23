var clientemodels = {}
const mongoose = require ("mongoose")

var Schema = mongoose.Schema

var clienteSchema = new Schema({
    nombre:String,
    email:String,
    telefono: String,
    direccion: String,
    mensaje:String
})

const mymodel = mongoose.model("cliente",clienteSchema)


clientemodels.registrar = function (post, callback){
    const instancia = new mymodel
    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.telefono = post.telefono
    instancia.direccion = post.direccion
    instancia.mensaje = post.mensaje

    instancia.save().then((respuesta)=>{ 
        // console.log(respuesta)
        return callback ({state:true, mensaje:"formulario recibido"})
    }).catch((error)=>{
        // console.log(error)
        return callback ({state:false, mensaje:"error al guardar el formulario"})
    })
/*     cliente.push(post)
    return callback({state:true}) */
}


clientemodels.listar = function(post,callback){
    mymodel.find({},{password:0,codigo:0,__v:0}).then((respuesta) =>{
        return callback(respuesta)
    }).catch((error) =>{
        // console.log(error)
        return callback({state:false})
    })
}

clientemodels.listaremail = function(post,callback){
    mymodel.find({email:post.email},{password:0,codigo:0}).then((respuesta) =>{
        return callback(respuesta)
    }).catch((error) =>{
        // console.log(error)
        return callback({state:false})
    })
}



clientemodels.mymodel = mymodel
module.exports.clientemodels = clientemodels