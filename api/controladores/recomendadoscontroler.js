var recomendadosmodels = require("./modelos/recomendadosmodels.js").recomendadosmodels
var recomendadoscontroler = {}

recomendadoscontroler.guardar= function(request,response){
    var post = {
        codigo:request.body.codigo,
        nombre:request.body.nombre,
        descripcion:request.body.descripcion,
        imagen:request.body.imagen,
        precio:request.body.precio
    }

    if (post.codigo == undefined || post.codigo ==  null || post.codigo ==""){
        response.json({state:false, mensaje:"el campo codigo es obligatorio"})
        return false
    }

    if (post.nombre == undefined || post.nombre ==  null || post.nombre ==""){
        response.json({state:false, mensaje:"el campo nombre es obligatorio"})
        return false
    }

    if (post.descripcion == undefined || post.descripcion ==  null || post.descripcion ==""){
        response.json({state:false, mensaje:"el campo descripcion es obligatorio"})
        return false
    }

    if (post.imagen == undefined || post.imagen ==  null || post.imagen ==""){
        response.json({state:false, mensaje:"el campo imagen es obligatorio"})
        return false
    }

    if (post.precio == undefined || post.precio ==  null || post.precio ==""){
        response.json({state:false, mensaje:"el campo precio es obligatorio"})
        return false
    }

    recomendadosmodels.validarcodigo(post, function(respuesta){
        console.log(respuesta)  //preguntar al profe por que en recomendados model funciona el recomendadosmodels teniendo como respuesta return callback({state:true}) y en servicios no
        if (respuesta.length == 0){
            recomendadosmodels.guardar(post, function(respuesta2){
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

recomendadoscontroler.actualizar= function(request,response){
    var post = {
        _id:request.body._id,
        imagen:request.body.imagen,
        nombre:request.body.nombre,
        descripcion:request.body.descripcion,
        precio:request.body.precio,
    }

    if (post._id == undefined || post._id ==  null || post._id ==" "){
        response.json({state:false, mensaje:"el campo _id es obligatorio"})
        return false
    }

    if (post.nombre == undefined || post.nombre ==  null || post.nombre ==" "){
        response.json({state:false, mensaje:"el campo nombre es obligatorio"})
        return false
    }

    if (post.descripcion == undefined || post.descripcion ==  null || post.descripcion ==" "){
        response.json({state:false, mensaje:"el campo descripcion es obligatorio"})
        return false
    }

    recomendadosmodels.actualizar(post, function(respuesta2){
        if (respuesta2.state == true){
            response.json({state:true, mensaje: "elemento actualizado correctamente"})
        }
        else{
            response.json({state:false, mensaje: "error al actualizar el elemento"})
        }
    })
}


recomendadoscontroler.eliminar= function(request,response){
    var post = {
        _id:request.body._id

    }

    if (post._id == undefined || post._id ==  null || post._id ==" "){
        response.json({state:false, mensaje:"el campo _id es obligatorio"})
        return false
    }


    recomendadosmodels.eliminar(post, function(respuesta2){
        if (respuesta2.state == true){
            response.json({state:true, mensaje: "elemento eliminado correctamente"})
        }
        else{
            response.json({state:false, mensaje: "error al eliminar el elemento"})
        }
    })
    
}

recomendadoscontroler.listar= function(request,response){

    recomendadosmodels.listar(null,function(respuesta){
        response.json(respuesta)
    })
}

recomendadoscontroler.listarid = function(request,response){
        var post = {
        _id:request.body._id

    }

    if (post._id == undefined || post._id ==  null || post._id ==" "){
        response.json({state:false, mensaje:"el campo _id es obligatorio"})
        return false
    }

    recomendadosmodels.listarid(post,function(respuesta){
        response.json(respuesta)
    })
    
}


recomendadoscontroler.generarxls = function(request,response){

    recomendadosmodels.listar(null,function(respuesta){
        var json = respuesta.map(({_doc})=>{
            const {__v, ...rest} = _doc;
            return rest;
        })
        var xls = json2xls(json)

        fs.writeFileSync("recomendados.xlsx", xls, "binary")
        response.download('recomendados.xlsx', function(err){
            if (err){
                console.log(err)
            }
            else{
                console.log("descarga completa")
                fs.unlinkSync("recomendados.xlsx")
            }
        }) 

    })

}


const pdfdocument = require("pdfkit")

recomendadoscontroler.generarpdf = function(request,response){


    recomendadosmodels.listar(null,function(respuesta){
        const doc = new pdfdocument()
        var writeStream = fs.createWriteStream("recomendados.pdf")
        doc.pipe(writeStream)
    
        doc.fontSize(14).text("Lista de recomendados",270,70)

        doc.fontSize(10).text("Codigo",50,99)
        doc.fontSize(10).text("nombre",120,99)

        for (let a = 0; a < respuesta.length; a++) {
            
            doc.fontSize(10).text(respuesta[a].codigo,50,120 + a * 11)
            doc.fontSize(10).text(respuesta[a].nombre,120,120 + a * 11)

            if(a == respuesta.length - 1){
                doc.end();
                writeStream.on("finish",function(){
                    console.log("archivo finalizado")
                    response.download('recomendados.pdf', function(err){
                        if (err){
                            console.log(err)
                        }
                        else{
                            console.log("descarga completa")
                            fs.unlinkSync("recomendados.pdf")
                        }
                    }) 
                })

            }
        }
    


    })


}





module.exports.recomendadoscontroler = recomendadoscontroler