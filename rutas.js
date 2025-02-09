var usuarioscontroler = require("./api/controladores/usuarioscontroler.js").usuarioscontroler

app.post("/usuarios/registrar", function(request,response){

    usuarioscontroler.registrar(request,response)
})

app.put("/usuarios/actualizar", function(request,response){

    usuarioscontroler.actualizar(request,response)
})

app.delete("/usuarios/eliminar", function(request,response){

    usuarioscontroler.eliminar(request,response)
})

app.get("/usuarios/listar",function(request,response){

    usuarioscontroler.listar(request,response)
}) 

app.post("/usuarios/listaremail", function(request,response){

    usuarioscontroler.listaremail(request,response)
})

app.get("/usuarios/activar/:email/:codigo", function(request,response){

    usuarioscontroler.activar(request,response)
})
app.post("/usuarios/login", function(request,response){

    usuarioscontroler.login(request,response)
})
