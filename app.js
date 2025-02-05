var express = require ("express")
global.app = express()
var config = require ("./config.js").config

//este fragmento sirve para poder hacer peticiones post
var bodyparser = require("body-parser")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
var mongoose = require("mongoose")
global.sha256 = require("sha256")
////////////////////////////////////

//////////////////////// CRUD////////////////////////
//////CREATE /// READ ///// UPDATE ///// DELETE/////
require("./rutas.js")

mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd).then((respuesta) =>{
    console.log("conexion correcta a mongo")
}).catch((error)=>{
    console.log(error)
})

app.use("/",express.static(__dirname + "/pagina"))

app.listen(config.puertoexpress,function(){
    console.log("servidor funcionando por el puerto " + config.puertoexpress)
})