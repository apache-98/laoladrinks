var productosmodels = require("./modelos/productosmodels.js").productosmodels
var productoscontroler = {}

productoscontroler.guardar= function(request,response){
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

    productosmodels.validarcodigo(post, function(respuesta){
        console.log(respuesta)  //preguntar al profe por que en productos model funciona el productosmodels teniendo como respuesta return callback({state:true}) y en servicios no
        if (respuesta.length == 0){
            productosmodels.guardar(post, function(respuesta2){
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

productoscontroler.actualizar= function(request,response){
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

    productosmodels.actualizar(post, function(respuesta2){
        if (respuesta2.state == true){
            response.json({state:true, mensaje: "elemento actualizado correctamente"})
        }
        else{
            response.json({state:false, mensaje: "error al actualizar el elemento"})
        }
    })
}


productoscontroler.eliminar= function(request,response){
    var post = {
        _id:request.body._id

    }

    if (post._id == undefined || post._id ==  null || post._id ==" "){
        response.json({state:false, mensaje:"el campo _id es obligatorio"})
        return false
    }


    productosmodels.eliminar(post, function(respuesta2){
        if (respuesta2.state == true){
            response.json({state:true, mensaje: "elemento eliminado correctamente"})
        }
        else{
            response.json({state:false, mensaje: "error al eliminar el elemento"})
        }
    })
    
}

productoscontroler.listar= function(request,response){

    productosmodels.listar(null,function(respuesta){
        response.json(respuesta)
    })
}

productoscontroler.listarid = function(request,response){
        var post = {
        _id:request.body._id

    }

    if (post._id == undefined || post._id ==  null || post._id ==" "){
        response.json({state:false, mensaje:"el campo _id es obligatorio"})
        return false
    }

    productosmodels.listarid(post,function(respuesta){
        response.json(respuesta)
    })
    
}


productoscontroler.generarxls = function(request,response){

    productosmodels.listar(null,function(respuesta){
        var json = respuesta.map(({_doc})=>{
            const {__v, ...rest} = _doc;
            return rest;
        })
        var xls = json2xls(json)

        fs.writeFileSync("productos.xlsx", xls, "binary")
        response.download('productos.xlsx', function(err){
            if (err){
                console.log(err)
            }
            else{
                console.log("descarga completa")
                fs.unlinkSync("productos.xlsx")
            }
        }) 

    })

}


const pdfdocument = require("pdfkit")

productoscontroler.generarpdf = function(request,response){


    productosmodels.listar(null,function(respuesta){
        const doc = new pdfdocument()
        var writeStream = fs.createWriteStream("productos.pdf")
        doc.pipe(writeStream)
    
        doc.fontSize(14).text("Lista de Productos",270,70)

        doc.fontSize(10).text("Codigo",50,99)
        doc.fontSize(10).text("nombre",120,99)

        for (let a = 0; a < respuesta.length; a++) {
            
            doc.fontSize(10).text(respuesta[a].codigo,50,120 + a * 11)
            doc.fontSize(10).text(respuesta[a].nombre,120,120 + a * 11)

            if(a == respuesta.length - 1){
                doc.end();
                writeStream.on("finish",function(){
                    console.log("archivo finalizado")
                    response.download('productos.pdf', function(err){
                        if (err){
                            console.log(err)
                        }
                        else{
                            console.log("descarga completa")
                            fs.unlinkSync("productos.pdf")
                        }
                    }) 
                })

            }
        }
    


    })


}





module.exports.productoscontroler = productoscontroler