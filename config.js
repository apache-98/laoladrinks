var config = {
    email:{},
    sesiones:{}
}

config.puertoexpress = 3000
config.bd = "pruebapagina"
config.bdtest = "pruebapagina_test"
config.secret = "g6787432qsdfuuio787680{ñp0986543{-.,mnbvcxz<asw45678+}{-.,,<xcsfdhgrwueomvbvgdhj"

config.email.host = "smtp.gmail.com"
config.email.port = 587
config.email.user = "williamapache16@gmail.com"
config.email.pass = "tcxwcigwmypwkkww"
config.sesiones.secret = "rtyuikjh45678uj655ghbvn"
config.sesiones.expiracion = 100000 * 5

config.listablanca = [
    "http://localhost:4200"
]
 
module.exports.config = config