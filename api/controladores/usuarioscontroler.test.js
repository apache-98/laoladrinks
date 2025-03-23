var usuarioscontroler = require("./usuarioscontroler.js").usuarioscontroler

var usuariosmodels = require("../../api/controladores/modelos/usuariosmodels.js").usuariosmodels
const session = require("express-session")
var mongoose = require("mongoose")
global.sha256 = require("sha256")
var config = require("../../config.js").config


describe("post:/usuarios/registrar",() =>{
    let request, response;

    beforeAll((done) =>{
        //conexion a la bd
                mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest ).then((respuesta) =>{
                    console.log("conexion correcta a mongo")
                }).catch((error)=>{
                    console.log(error)
                }) 
        done()
    })

    beforeEach(() =>{
        request = {body:{}}
        response = {
            json: jest.fn()
        }
    })

    test("debe fallar cuando el email no esta presente",(done) =>{
        //configurar request
        request.body = {}
        usuarioscontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo email es obligatorio ", state:false})
            done()

        })

    })

    test("debe fallar cuando el nombre no esta presente",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com"}
        usuarioscontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo nombre es obligatorio ", state:false})
            done()

        })

    })

    test("debe fallar cuando el apellido no esta presente",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre:"william"}
        usuarioscontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo apellido es obligatorio ", state:false})
            done()

        })

    })

    test("debe fallar cuando el password no esta presente",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre:"william", apellido:"william"}
        usuarioscontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo password es obligatorio ", state:false})
            done()

        })

    })

    test("debe fallar cuando el email no es valido",(done) =>{
        //configurar request
        request.body = {email:"1.com", nombre:"william", apellido:"william", password:"123456"}
        usuarioscontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "escriba un email valido ", state:false})
            done()

        })

    })

    test("debe fallar cuando el nombre sea menor de 3",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre: "w", apellido:"william", password:"123456" }
        usuarioscontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "escriba un nombre valido ", state:false})
            done()

        })

    })

    test("debe fallar cuando el nombre sea mayor  de 20",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre: "wfgfhgthttbhtfghygtfrdedrftgbhjdcfghyygvfghgfrgthygf", apellido:"william", password:"123456" }
        usuarioscontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "escriba un nombre valido ", state:false})
            done()

        },200)

    })

    test("debe guardar el usuario",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre: "william", apellido:"william", password:"123456" }
        usuarioscontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "usuario guardado correctamente", state:true})
            done()

        },200)

    })


    test("debe fallar con la existencia del usuario",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre: "william", apellido:"william", password:"123456" }
        usuarioscontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "este correo ya esta registrado", state:false})
            done()

        },200)

    })

 
      afterAll(()=>{
        //borrado de la coleccion
        usuariosmodels.mymodel.deleteMany({}).then((res)=>{})
    })  
 

    





    

    
    
}) 


describe("post:/usuarios/login",() =>{
    let request, response;

    beforeAll((done) =>{
        //conexion a la bd
                mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest ).then((respuesta) =>{
                    console.log("conexion correcta a mongo")
                }).catch((error)=>{
                    console.log(error)
                }) 
        done()
    })

    beforeEach(() =>{
        request = {body:{},session:{}}
        response = {
            json: jest.fn()
        }
    })

    test("debe fallar cuando el email no esta presente",(done) =>{
        //configurar request
        request.body = {}
        usuarioscontroler.login(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo email es obligatorio ", state:false})
            done()

        })

    })

    test("debe fallar cuando el password no esta presente",(done) =>{
        //configurar request
        request.body = {email: "william@gmail.com"}
        usuarioscontroler.login(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo password es obligatorio ", state:false})
            done()

        })

    })

    test("debe guardar el usuario",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre: "william", apellido:"william", password:"123456" }
        usuarioscontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "usuario guardado correctamente", state:true})
            done()

        },200)

    })



     test("valida que el usuario este activo",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com",password:"123456" }
        usuarioscontroler.login(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "por favor activa la cuenta", state:false})
            done()

        },200)

    }) 

    test("debe iniciar sesion correctamente",(done) =>{
        //configurar request
        usuariosmodels.mymodel.findOneAndUpdate({email:"william@gmail.com"},{estado:"activo"}).then((res)=>{
            request.body = {email:"william@gmail.com",password:"123456" }
            usuarioscontroler.login(request,response)
    
            setTimeout(()=>{
                expect(response.json).toHaveBeenCalledWith({mensaje: "bienvenido william william", state:true})
                done()
    
            },400)
        })


    }) 


  


    afterAll(()=>{
        //borrado de la coleccion
        usuariosmodels.mymodel.deleteMany({}).then((res)=>{
            setTimeout(()=>{
                expect("ok").toBe("ok")
            },200)
        })
    })
 

    





    

    
    
}) 

describe("post:/usuarios/actualizar",() =>{
    let request, response;

    beforeAll((done) =>{
        //conexion a la bd
                mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest ).then((respuesta) =>{
                    console.log("conexion correcta a mongo")
                }).catch((error)=>{
                    console.log(error)
                }) 
        done()
    })

    beforeEach(() =>{
        request = {body:{},session:{}}
        response = {
            json: jest.fn()
        }
    })

    test("debe fallar cuando el email no esta presente",(done) =>{
        //configurar request
        request.body = {}
        usuarioscontroler.actualizar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo email es obligatorio ", state:false})
            done()

        })

    })

    test("debe fallar cuando el nombre no esta presente",(done) =>{
        //configurar request
        request.body = {email: "william@gmail.com"}
        usuarioscontroler.actualizar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo nombre es obligatorio ", state:false})
            done()

        })

    })


    test("debe fallar cuando el apellido no esta presente",(done) =>{
        //configurar request
        request.body = {email: "william@gmail.com", nombre: "william"}
        usuarioscontroler.actualizar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo apellido es obligatorio ", state:false})
            done()

        })

    })

    test("debe fallar cuando el apellido no esta presente",(done) =>{
        //configurar request
        request.body = {email: "william@gmail.com", nombre: "william"}
        usuarioscontroler.actualizar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo apellido es obligatorio ", state:false})
            done()

        })

    })    


    test("debe fallar cuando el perfil no esta presente",(done) =>{
        //configurar request
        request.body = {email: "william@gmail.com", nombre: "william", apellido:"apache"}
        usuarioscontroler.actualizar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo perfil es obligatorio ", state:false})
            done()

        })

    })

    test("debe fallar cuando el estado no esta presente",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre: "william", apellido:"apache", perfil:"cliente" }
        usuarioscontroler.actualizar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo estado es obligatorio ", state:false})
            done()

        },200)

    })

    test("debe fallar cuando el email no es valido",(done) =>{
        //configurar request
        request.body = {email:"1.com", nombre:"william",  apellido:"apache", perfil:"cliente", estado:"activo"}
        usuarioscontroler.actualizar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "escriba un email valido ", state:false})
            done()

        })

    })

    test("debe fallar cuando el nombre sea menor de 3",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre: "w",  apellido:"apache", perfil:"cliente", estado:"activo" }
        usuarioscontroler.actualizar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "escriba un nombre valido ", state:false})
            done()

        })

    })

    test("debe fallar cuando el nombre sea mayor  de 20",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre: "wfgfhgthttbhtfghygtfrdedrftgbhjdcfghyygvfghgfrgthygf",  apellido:"apache", perfil:"cliente", estado:"activo" }
        usuarioscontroler.actualizar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "escriba un nombre valido ", state:false})
            done()

        },200)

    })


    test("debe fallar cuando el email no existe",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre: "william",  apellido:"apache", perfil:"cliente", estado:"activo" }
        usuarioscontroler.actualizar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el email no existe en la base de datos ", state:false})
            done()

        },200)

    })

    test("debe guardar el usuario",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre: "william", apellido:"william", password:"123456" }
        usuarioscontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "usuario guardado correctamente", state:true})
            done()

        },200)

    })


    test("usuario actualizado",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre: "william",  apellido:"apache", perfil:"cliente", estado:"activo" }
        usuarioscontroler.actualizar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "usuario actualizado correctamente ", state:true})
            done()

        },200)

    })




    afterAll(()=>{
        //borrado de la coleccion
        usuariosmodels.mymodel.deleteMany({}).then((res)=>{
            setTimeout(()=>{
            },200)
        })
    })
 

    





    

    
    
}) 

describe("post:/usuarios/eliminar",() =>{
    let request, response;

    beforeAll((done) =>{
        //conexion a la bd
                mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest ).then((respuesta) =>{
                    console.log("conexion correcta a mongo")
                }).catch((error)=>{
                    console.log(error)
                }) 
        done()
    })

    beforeEach(() =>{
        request = {body:{},session:{}}
        response = {
            json: jest.fn()
        }
    })

    test("debe fallar cuando el email no esta presente",(done) =>{
        //configurar request
        request.body = {}
        usuarioscontroler.eliminar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo email es obligatorio ", state:false})
            done()

        })

    })
 

    test("debe fallar cuando el email no es valido",(done) =>{
        //configurar request
        request.body = {email:"1.com", nombre:"william",  apellido:"apache", perfil:"cliente", estado:"activo"}
        usuarioscontroler.eliminar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "escriba un email valido ", state:false})
            done()

        })

    })




    test("debe fallar cuando el email no existe en la base de datos",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com" }
        usuarioscontroler.eliminar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el email no existe en la base de datos ", state:false})
            done()

        },200)

    })

    test("debe guardar el usuario",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre: "william", apellido:"william", password:"123456" }
        usuarioscontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "usuario guardado correctamente", state:true})
            done()

        },200)

    })


    test("usuario eliminado",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre: "william",  apellido:"apache", perfil:"cliente", estado:"activo" }
        usuarioscontroler.eliminar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "usuario eliminado correctamente ", state:true})
            done()

        },200)

    })




    afterAll(()=>{
        //borrado de la coleccion
        usuariosmodels.mymodel.deleteMany({}).then((res)=>{
            setTimeout(()=>{
            },200)
        })
    })
 

    





    

    
    
}) 

describe("post:/usuarios/listar",() =>{
    let request, response;

    beforeAll((done) =>{
        //conexion a la bd
                mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest ).then((respuesta) =>{
                    console.log("conexion correcta a mongo")
                }).catch((error)=>{
                    console.log(error)
                }) 
        done()
    })

    beforeEach(() =>{
        request = {body:{},session:{}}
        response = {
            json: jest.fn()
        }
    })

   

    test("debe guardar el usuario",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre: "william", apellido:"william", password:"123456" }
        usuarioscontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "usuario guardado correctamente", state:true})
            done()

        },200)

    })


    test("debe validarme que hay 1 registro en el usuario",(done) =>{
        //configurar request
        request.body = {}
        usuarioscontroler.listar(request,response)

        setTimeout(()=>{
            expect(response.json.mock.calls[0][0].length).toBe(1)
            done()

        },200)

    })




    afterAll(()=>{
        //borrado de la coleccion
        usuariosmodels.mymodel.deleteMany({}).then((res)=>{
            setTimeout(()=>{
            },200)
        })
    })
 

    





    

    
    
}) 


describe("post:/usuarios/listaremail",() =>{
    let request, response;

    beforeAll((done) =>{
        //conexion a la bd
                mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest ).then((respuesta) =>{
                    console.log("conexion correcta a mongo")
                }).catch((error)=>{
                    console.log(error)
                }) 
        done()
    })

    beforeEach(() =>{
        request = {body:{},session:{}}
        response = {
            json: jest.fn()
        }
    })

    test("debe fallar cuando el email no esta presente",(done) =>{
        //configurar request
        request.body = {}
        usuarioscontroler.listaremail(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo email es obligatorio ", state:false})
            done()

        })

    })
 

    test("debe fallar cuando el email no es valido",(done) =>{
        //configurar request
        request.body = {email:"1.com"}
        usuarioscontroler.listaremail(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "escriba un email valido ", state:false})
            done()

        })

    })




    test("debe fallar cuando el email no existe en la base de datos",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com" }
        usuarioscontroler.listaremail(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el email no existe en la base de datos ", state:false})
            done()

        },200)

    })

    test("debe guardar el usuario",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre: "william", apellido:"apache", password:"123456" }
        usuarioscontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "usuario guardado correctamente", state:true})
            done()

        },200)

    })


    test("debe mostrarme los datos del usuario",(done) =>{
        //configurar request
        request.body = {}
        usuarioscontroler.listar(request,response)

        setTimeout(()=>{
            expect(response.json.mock.calls[0][0][0].apellido).toBe("apache")
            done()

        },200)

    })




    afterAll(()=>{
        //borrado de la coleccion
        usuariosmodels.mymodel.deleteMany({}).then((res)=>{
            setTimeout(()=>{
            },200)
        })
    })
 

    





    

    
    
}) 

describe("post:/usuarios/activar",() =>{
    let request, response;

    beforeAll((done) =>{
        //conexion a la bd
                mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest ).then((respuesta) =>{
                    console.log("conexion correcta a mongo")
                }).catch((error)=>{
                    console.log(error)
                }) 
        done()
    })

    beforeEach(() =>{
        request = {body:{},session:{}}
        response = {
            json: jest.fn()
        }
    })

    test("debe fallar cuando el email no esta presente",(done) =>{
        //configurar request
        request.body = {}
        usuarioscontroler.activar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo email es obligatorio ", state:false})
            done()

        })

    })
 

    test("debe fallar cuando el codigo no esta presente",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com"}
        usuarioscontroler.activar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo codigo es obligatorio ", state:false})
            done()

        })

    })

    test("debe guardar el usuario",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", nombre: "william", apellido:"apache", password:"123456" }
        usuarioscontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "usuario guardado correctamente", state:true})
            done()

        },200)

    })

    test("debe fallar cuando el codigo no es valido",(done) =>{
        //configurar request
        request.body = {email:"william@gmail.com", codigo:"12345"}
        usuarioscontroler.activar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "no se pudo activar la cuenta", state:false})
            done()

        },200)


    })


    test("debe mostrarme los datos del usuario",(done) =>{
        //configurar request
        usuariosmodels.mymodel.find({email:"william@gmail.com"}).then((res) => {
            request.body = {email:"william@gmail.com", codigo:res[0].codigo}
            usuarioscontroler.activar(request,response)

            setTimeout(()=>{
                expect(response.json).toHaveBeenCalledWith({mensaje: "cuenta verificada correctamente", state:true})
                done()
    
            },200)

        })

    })




    afterAll(()=>{
        //borrado de la coleccion
        usuariosmodels.mymodel.deleteMany({}).then((res)=>{
            setTimeout(()=>{
            },200)
        })
    })
 

    





    

    
    
}) 