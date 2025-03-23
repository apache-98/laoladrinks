var usuarioscontroler = require("./api/controladores/usuarioscontroler.js").usuarioscontroler




var soloadmin = function(request, response, callback){
    if(request.session.perfil == "Administrador"){
        callback()
    }
    else{
        response.json({state:false, mensaje:"esta api solo la pueden usar los administradores"})
    }
}



app.post("/usuarios/registrar", function(request,response){

    usuarioscontroler.registrar(request,response)
})

app.put("/usuarios/actualizar",soloadmin, function(request,response){

    usuarioscontroler.actualizar(request,response)
})

app.post("/usuarios/eliminar",soloadmin, function(request,response){

    usuarioscontroler.eliminar(request,response)
})

app.get("/usuarios/listar",soloadmin,function(request,response){

    usuarioscontroler.listar(request,response)
}) 

app.post("/usuarios/listaremail",soloadmin, function(request,response){

    usuarioscontroler.listaremail(request,response)
})

app.post("/usuarios/activar", function(request,response){

    usuarioscontroler.activar(request,response)
})

app.post("/usuarios/estado", function(request,response){

    response.json(request.session)
})

app.post("/usuarios/logout", function(request,response){

    request.session.destroy()
    response.json({state:true, mensaje:"sesion cerrada"})
})

app.post("/usuarios/login", function(request,response){

    usuarioscontroler.login(request,response)
})



var clientecontroler = require("./api/controladores/clientecontroler.js").clientecontroler
app.post("/cliente/registrar", function(request,response){

    clientecontroler.registrar(request,response)
})


app.get("/cliente/listar",soloadmin,function(request,response){

    clientecontroler.listar(request,response)
}) 







var productoscontroler = require("./api/controladores/productoscontroler.js").productoscontroler

app.post("/productos/guardar",soloadmin, function(request,response){

    productoscontroler.guardar(request,response)
})

app.post("/productos/actualizar",soloadmin, function(request,response){

    productoscontroler.actualizar(request,response)
})

app.post("/productos/eliminar",soloadmin, function(request,response){

    productoscontroler.eliminar(request,response)
})

app.post("/productos/listar",function(request,response){

    productoscontroler.listar(request,response)
}) 

app.post("/productos/listarid", function(request,response){

    productoscontroler.listarid(request,response)
})


app.get("/productos/generarxls", function(request,response){

    productoscontroler.generarxls(request,response)
})


app.get("/productos/generarpdf", function(request,response){

    productoscontroler.generarpdf(request,response)
})





var promocionescontroler = require("./api/controladores/promocionescontroler.js").promocionescontroler

app.post("/promociones/guardar",soloadmin, function(request,response){

    promocionescontroler.guardar(request,response)
})

app.post("/promociones/actualizar",soloadmin, function(request,response){

    promocionescontroler.actualizar(request,response)
})

app.post("/promociones/eliminar",soloadmin, function(request,response){

    promocionescontroler.eliminar(request,response)
})

app.post("/promociones/listar",function(request,response){

    promocionescontroler.listar(request,response)
}) 

app.post("/promociones/listarid", function(request,response){

    promocionescontroler.listarid(request,response)
})


app.get("/promociones/generarxls", function(request,response){

    promocionescontroler.generarxls(request,response)
})


app.get("/promociones/generarpdf", function(request,response){

    promocionescontroler.generarpdf(request,response)
})




var licorescontroler = require("./api/controladores/licorescontroler.js").licorescontroler

app.post("/licores/guardar",soloadmin, function(request,response){

    licorescontroler.guardar(request,response)
})

app.post("/licores/actualizar",soloadmin, function(request,response){

    licorescontroler.actualizar(request,response)
})

app.post("/licores/eliminar",soloadmin, function(request,response){

    licorescontroler.eliminar(request,response)
})

app.post("/licores/listar",function(request,response){

    licorescontroler.listar(request,response)
}) 

app.post("/licores/listarid", function(request,response){

    licorescontroler.listarid(request,response)
})


app.get("/licores/generarxls", function(request,response){

    licorescontroler.generarxls(request,response)
})


app.get("/licores/generarpdf", function(request,response){

    licorescontroler.generarpdf(request,response)
})




var recomendadoscontroler = require("./api/controladores/recomendadoscontroler.js").recomendadoscontroler

app.post("/recomendados/guardar",soloadmin, function(request,response){

    recomendadoscontroler.guardar(request,response)
})

app.post("/recomendados/actualizar",soloadmin, function(request,response){

    recomendadoscontroler.actualizar(request,response)
})

app.post("/recomendados/eliminar",soloadmin, function(request,response){

    recomendadoscontroler.eliminar(request,response)
})

app.post("/recomendados/listar",function(request,response){

    recomendadoscontroler.listar(request,response)
}) 

app.post("/recomendados/listarid", function(request,response){

    recomendadoscontroler.listarid(request,response)
})


app.get("/recomendados/generarxls", function(request,response){

    recomendadoscontroler.generarxls(request,response)
})


app.get("/recomendados/generarpdf", function(request,response){

    recomendadoscontroler.generarpdf(request,response)
})




var imagenmescontroler = require("./api/controladores/imagenmescontroler.js").imagenmescontroler

app.post("/imagenmes/guardar",soloadmin, function(request,response){

    imagenmescontroler.guardar(request,response)
})

app.post("/imagenmes/actualizar",soloadmin, function(request,response){

    imagenmescontroler.actualizar(request,response)
})

app.post("/imagenmes/eliminar",soloadmin, function(request,response){

    imagenmescontroler.eliminar(request,response)
})

app.post("/imagenmes/listar",function(request,response){

    imagenmescontroler.listar(request,response)
}) 

app.post("/imagenmes/listarid", function(request,response){

    imagenmescontroler.listarid(request,response)
})


app.get("/imagenmes/generarxls", function(request,response){

    imagenmescontroler.generarxls(request,response)
})


app.get("/imagenmes/generarpdf", function(request,response){

    imagenmescontroler.generarpdf(request,response)
})





var servicioscontroler = require("./api/controladores/servicioscontroler.js").servicioscontroler

app.post("/servicios/guardar",soloadmin, function(request,response){

    servicioscontroler.guardar(request,response)
})

app.post("/servicios/actualizar",soloadmin, function(request,response){

    servicioscontroler.actualizar(request,response)
})

app.post("/servicios/eliminar",soloadmin, function(request,response){

    servicioscontroler.eliminar(request,response)
})

app.post("/servicios/listar",function(request,response){

    servicioscontroler.listar(request,response)
}) 

app.post("/servicios/listarid", function(request,response){

    servicioscontroler.listarid(request,response)
})






var anexoscontroler = require("./api/controladores/anexoscontroler.js").anexoscontroler

app.post("/upload/:nombrearchivo",function(request,response){
    anexoscontroler.upload(request, response)

})

app.post("/avatar/:nombrearchivo",function(request,response){
    anexoscontroler.avatar(request, response)

})