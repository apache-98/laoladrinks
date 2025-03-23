var serviciosmodels = require("./modelos/serviciosmodels.js").serviciosmodels
var servicioscontroler = {}

servicioscontroler.guardar= function(request,response){
    var post = {
        codigo:request.body.codigo,
        nombre:request.body.nombre
    }

    if (post.codigo == undefined || post.codigo ==  null || post.codigo ==""){
        response.json({state:false, mensaje:"el campo codigo es obligatorio"})
        return false
    }

    if (post.nombre == undefined || post.nombre ==  null || post.nombre ==""){
        response.json({state:false, mensaje:"el campo nombre es obligatorio"})
        return false
    }

    serviciosmodels.validarcodigo(post, function(respuesta){
        console.log(respuesta)
        if (respuesta.length == 0){
            serviciosmodels.guardar(post, function(respuesta2){
                if (respuesta2.state == true){
                    response.json({state:true, mensaje: "elemento guardado correctamente"})
                }
                else{
                    response.json({state:false, mensaje: "error al guardar el elemento"})
                }
            })
        }
        else{
            response.json({state:false, mensaje: "el codigo de este elemento ya existe"})
        } 

    })

}

servicioscontroler.actualizar= function(request,response){
    var post = {
        _id:request.body._id,
        codigo:request.body.codigo,
        nombre:request.body.nombre,
    }

    if (post._id == undefined || post._id ==  null || post._id ==" "){
        response.json({state:false, mensaje:"el campo _id es obligatorio"})
        return false
    }

    if (post.nombre == undefined || post.nombre ==  null || post.nombre ==" "){
        response.json({state:false, mensaje:"el campo nombre es obligatorio"})
        return false
    }

    serviciosmodels.actualizar(post, function(respuesta2){
        if (respuesta2.state == true){
            response.json({state:true, mensaje: "elemento actualizado correctamente"})
        }
        else{
            response.json({state:false, mensaje: "error al actualizar el elemento"})
        }
    })
}


servicioscontroler.eliminar= function(request,response){
    var post = {
        _id:request.body._id

    }

    if (post._id == undefined || post._id ==  null || post._id ==" "){
        response.json({state:false, mensaje:"el campo _id es obligatorio"})
        return false
    }


    serviciosmodels.eliminar(post, function(respuesta2){
        if (respuesta2.state == true){
            response.json({state:true, mensaje: "elemento eliminado correctamente"})
        }
        else{
            response.json({state:false, mensaje: "error al eliminar el elemento"})
        }
    })
    
}

servicioscontroler.listar= function(request,response){

    serviciosmodels.listar(null,function(respuesta){
        response.json(respuesta)
    })
}

servicioscontroler.listarid = function(request,response){
        var post = {
        _id:request.body._id

    }

    if (post._id == undefined || post._id ==  null || post._id ==" "){
        response.json({state:false, mensaje:"el campo _id es obligatorio"})
        return false
    }

    serviciosmodels.listarid(post,function(respuesta){
        response.json(respuesta)
    })
    
}









module.exports.servicioscontroler = servicioscontroler