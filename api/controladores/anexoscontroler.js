var anexoscontroler ={}
var multer = require("multer")

anexoscontroler.upload = function(request, response){
    var upload  = multer({
        storage:multer.diskStorage({
            destination:(req,file,cb)=>{
                cb(null,appRoot + '/imagenes/')
            },
            filename:(req,file,cb)=>{
                cb(null,req.params.nombrearchivo + '.png')
            }
        }), 
        fileFilter: (request,file,cb) =>{
            var ext = path.extname(file.originalname)
            console.log(ext)
            cb(null,true)
            if(ext !== ".png" && ext !== ".jpg" && ext !== ".tif" && ext !== ".jpeg" && ext !== ".jfif"){
                cb("solo se aceptan formatos de imagen validos", null)
            }
            else{
                cb(null,true)
            }
        }
    }).single('file')

    upload(request,response, function(err){
        if(err){
            console.log(err)
            response.json({state:false, mensaje:"error al cargar el archivo", error:err})
        }
        else{
            response.json({state:true,mensaje:"archivo cargado"})
        }
    })

}


anexoscontroler.avatar = function(request, response){
    var upload  = multer({
        storage:multer.diskStorage({
            destination:(req,file,cb)=>{
                cb(null,appRoot + '/avatar/')
            },
            filename:(req,file,cb)=>{
                cb(null,req.params.nombrearchivo + '.png')
            }
        }), 
        fileFilter: (request,file,cb) =>{
            var ext = path.extname(file.originalname)
            console.log(ext)
            cb(null,true)
            if(ext !== ".png" && ext !== ".jpg" && ext !== ".tif" && ext !== ".jpeg" && ext !== ".jfif"){
                cb("solo se aceptan formatos de imagen validos", null)
            }
            else{
                cb(null,true)
            }
        }
    }).single('file')

    upload(request,response, function(err){
        if(err){
            console.log(err)
            response.json({state:false, mensaje:"error al cargar el archivo", error:err})
        }
        else{
            response.json({state:true,mensaje:"archivo cargado"})
        }
    })

}



module.exports.anexoscontroler = anexoscontroler