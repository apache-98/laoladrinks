var express = require ("express")
global.app = express()
var config = require ("./config.js").config

//este fragmento sirve para poder hacer peticiones post
var bodyparser = require("body-parser")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
var mongoose = require("mongoose")
global.sha256 = require("sha256")
const cors = require("cors")
const session = require("express-session")
global.multer = require("multer")
global.path = require("path")
global.appRoot = path.resolve(__dirname)
global.json2xls = require("json2xls")
global.fs = require("fs")



app.all('*',function(req, res, next){

    var whitelist = req.headers.origin;
    res.header('Access-Control-Allow-Origin', whitelist);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");

    next();

});
////////////////////////////////////

//////////////////////// CRUD////////////////////////
//////CREATE /// READ ///// UPDATE ///// DELETE/////


mongoose.connect("mongodb://" + config.bdUser + ":" + config.bdPass + '@' + config.bdIp + ":" + config.bdPort +  "/" + config.bd).then((respuesta)=>{
    console.log("Conexion correcta a mongo")
}).catch((error) => {
    console.log(error)
})
/* mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd).then((respuesta) =>{
    console.log("conexion correcta a mongo")
}).catch((error)=>{
    console.log(error)
}) */

    

app.use(cors({
    origin:function(origin,callback){
        console.log(origin)
        if (!origin)return callback(null,true)
        if(config.listablanca.indexOf(origin) ===-1){
            return callback ("error cors sin permiso", false)
        }
        else{
            return callback(null,true)
        }
    }
}))

app.use(session({
    secret:config.sesiones.secret,
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:config.sesiones.expiracion, httpOnly:true
    },
    name:"cookieapp",
    rolling:true
}))

require("./rutas.js")
app.use("/avatar",express.static(__dirname + "/avatar"))
app.use("/imagenes",express.static(__dirname + "/imagenes"))


app.use('/', express.static(__dirname + '/dist/frontend/browser'));

app.get('/*', function(req, res, next) {
    res.sendFile(path.resolve(__dirname + "/dist/frontend/browser/index.html"));
});


app.listen(config.puertoexpress,function(){
    console.log("servidor funcionando por el puerto " + config.puertoexpress)
})