var clientecontroler = require("./clientecontroler.js").clientecontroler
var clientemodels = require("../../api/controladores/modelos/clientemodels.js").clientemodels
var mongoose = require("mongoose")
global.sha256 = require("sha256")
var config = require("../../config.js").config


describe("post:/cliente/registrar",() =>{
    let request, response;

    beforeAll((done) =>{
        //conexion a la bd
                mongoose.connect("mongodb://127.0.0.1:27017/pruebapagina_test" ).then((respuesta) =>{
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

    test("debe fallar cuando el nombre no esta presente",(done) =>{
        //configurar request
        request.body = {}
        clientecontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo nombre es obligatorio ", state:false})
            done()

        })

    })

    test("debe fallar cuando el nombre sea menor de 3",(done) =>{
        //configurar request
        request.body = {nombre: "w", email:"william@gmail.com", telefono:"3112456846"}
        clientecontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "escriba un nombre valido ", state:false})
            done()

        })

    })

    test("debe fallar cuando el nombre sea mayor  de 20",(done) =>{
        //configurar request
        request.body = {nombre: "wfgfhgthttbhtfghygtfrdedrftgbhjdcfghyygvfghgfrgthygf", email:"william@gmail.com", telefono:"3112456846"}
        clientecontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "escriba un nombre valido ", state:false})
            done()

        })

    })

    test("debe fallar cuando el nombre no esta presente",(done) =>{
        //configurar request
        request.body = {nombre: "william"}
        clientecontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo email es obligatorio ", state:false})
            done()

        })

    })


    test("debe fallar cuando el email no es valido",(done) =>{
        //configurar request
        request.body = {nombre: "william", email:"1.com", telefono:"3112456846"}
        clientecontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "escriba un email valido ", state:false})
            done()

        })

    })

    test("debe fallar cuando el telefono no esta presente",(done) =>{
        //configurar request
        request.body = {nombre: "william", email:"william07apache@gmail.com", telefono:"3112456846"}
        clientecontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "formulario recibido", state:true})
            done()

        },200)

    }) 

   
    afterAll(()=>{
        //borrado de la coleccion
        clientemodels.mymodel.deleteMany({}).then((res)=>{
            setTimeout(()=>{
            },200)
        })
    })
 
    
})

/* describe("post:/cliente/listar",() =>{
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

   

    test("debe guardar el cliente",(done) =>{
        //configurar request
        request.body = { nombre: "william",email:"william@gmail.com", telefono:"3112456846" }
        clientecontroler.registrar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "formulario recibido", state:true})
            done()

        },400)

    })


    test("debe validarme que hay 1 registro en el cliente",(done) =>{
        //configurar request
        request.body = {}
        clientecontroler.listar(request,response)

        setTimeout(()=>{
            expect(response.json.mock.calls[0][0].length).toBe(1)
            done()

        },400)

    })




    afterAll(()=>{
        //borrado de la coleccion
        clientemodels.mymodel.deleteMany({}).then((res)=>{
            setTimeout(()=>{
            },200)
        })
    })
 

    





    

    
    
})  */
