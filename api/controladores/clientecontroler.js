var clientemodels = require("./modelos/clientemodels.js").clientemodels
var config = require ("../../config.js").config
var clientecontroler = {}
var nodemailer = require("nodemailer")


clientecontroler.registrar = function(request,response){
    var post = {
        nombre:request.body.nombre,
        email:request.body.email,
        telefono:request.body.telefono,
        direccion:request.body.direccion,
        mensaje:request.body.mensaje,
        
    }
/* 
    if (post.nombre =="" || post.nombre ==null || post.nombre == undefined){
        response.json({mensaje: "el campo nombre es obligatorio ", state:false})
        return false
    }

    if (post.email =="" || post.email ==null || post.email == undefined){
        response.json({mensaje: "el campo email es obligatorio ", state:false})
        return false
    }

    if (post.telefono == "" || post.telefono == null || post.telefono == undefined){
        response.json({mensaje: "el campo telefono es obligatorio ", state:false})
        return false
    } */

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

    post.password = sha256(post.password + config.secret)
    
    var letras = ["x", "a", "w", "p"]
    var posicionaleatoria = Math.floor(Math.random()* (3 - 0) + 0)

    var micodigo = letras[posicionaleatoria]+ "-" + Math.floor(Math.random()* (9999 - 1000) + 1000)
    post.codigo = micodigo
    clientemodels.registrar(post, function(respuesta){
        response.json(respuesta)
    })

            
}


clientecontroler.listar = function(request,response){
    clientemodels.listar(null,function(respuesta){
        response.json(respuesta)

    })
    
}





module.exports.clientecontroler = clientecontroler 