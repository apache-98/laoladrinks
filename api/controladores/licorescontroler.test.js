var licorescontroler = require("./licorescontroler.js").licorescontroler

var licoresmodels = require("../../api/controladores/modelos/licoresmodels.js").licoresmodels
const session = require("express-session")
var mongoose = require("mongoose")
global.sha256 = require("sha256")
var config = require("../../config.js").config


describe("post:/licores/guardar",() =>{
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

    test("debe fallar cuando el codigo no esta presente",(done) =>{
        //configurar request
        request.body = {}
        licorescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo codigo es obligatorio", state:false})
            done()

        })

    })

    test("debe fallar cuando el nombre no esta presente",(done) =>{
        //configurar request
        request.body = {codigo:"12"}
        licorescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo nombre es obligatorio", state:false})
            done()

        })

    })

    test("debe fallar cuando la descripcion no esta presente",(done) =>{
        //configurar request
        request.body = {codigo:"12", nombre:"william"}
        licorescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo descripcion es obligatorio", state:false})
            done()

        })

    })

    test("debe fallar cuando la imagen no esta presente",(done) =>{
        //configurar request
        request.body = {codigo:"12", nombre:"william", descripcion:"descripcion"}
        licorescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo imagen es obligatorio", state:false})
            done()

        })

    })

    test("debe fallar cuando el precio no esta presente",(done) =>{
        //configurar request
        request.body = {codigo:"12", nombre:"william", descripcion:"descripcion", imagen:"imagen"}
        licorescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo precio es obligatorio", state:false})
            done()

        },200)

    })

    test("debe guardar el producto",(done) =>{
        //configurar request
        request.body = {codigo:"12", nombre:"william", descripcion:"descripcion", imagen:"imagen",precio:"20000"}
        licorescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "elemento guardado correctamente", state:true})
            done()

        },200)

    })

    test("debe fallar si el codigo ya existe",(done) =>{
        //configurar request
        request.body = {codigo:"12", nombre:"william", descripcion:"descripcion", imagen:"imagen",precio:"20000"}
        licorescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el codigo de este elemento ya existe", state:false})
            done()

        },200)

    })

    
 
      afterAll(()=>{
        //borrado de la coleccion
        licoresmodels.mymodel.deleteMany({}).then((res)=>{})
    })  

    
    
}) 

describe("post:/licores/actualizar",() =>{
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

    test("debe fallar cuando el id no esta presente",(done) =>{
        //configurar request
        request.body = {}
        licorescontroler.actualizar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo _id es obligatorio", state:false})
            done()

        })

    })

    test("debe guardar el producto",(done) =>{
        //configurar request
        request.body = {codigo:"12", nombre:"papas", descripcion:"descripcion", imagen:"imagen",precio:"20000"}
        licorescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "elemento guardado correctamente", state:true})
            done()

        },200)

    })

    test("debe fallar cuando el nombre no esta presente",(done) =>{
        //configurar request
        licoresmodels.mymodel.find({nombre:"papas"}).then((res) => {
            request.body = { _id:res[0]._id}
            licorescontroler.actualizar(request,response)

            setTimeout(()=>{
                expect(response.json).toHaveBeenCalledWith({mensaje: "el campo nombre es obligatorio", state:false})
                done()
    
            },200)

        })

    })


    test("debe fallar cuando la descripcion no esta presente",(done) =>{
        //configurar request
        licoresmodels.mymodel.find({nombre:"papas"}).then((res) => {
            request.body = { _id:res[0]._id, nombre:"papas"}
            licorescontroler.actualizar(request,response)

            setTimeout(()=>{
                expect(response.json).toHaveBeenCalledWith({mensaje: "el campo descripcion es obligatorio", state:false})
                done()
    
            },200)

        })

    })


    test("elemento actualizado correctamente",(done) =>{
        //configurar request
        licoresmodels.mymodel.find({nombre:"papas"}).then((res) => {
            request.body = { _id:res[0]._id, nombre:"papas", descripcion:"hhhh"}
            licorescontroler.actualizar(request,response)

            setTimeout(()=>{
                expect(response.json).toHaveBeenCalledWith({mensaje: "elemento actualizado correctamente", state:true})
                done()
    
            },200)

        })

    })

    test("debe fallar si no actualiza",(done) =>{
        //configurar request
        licoresmodels.mymodel.find({nombre:"papas"}).then((res) => {
            request.body = { _id:"1234", nombre:"papas", descripcion:"hhhh"}
            licorescontroler.actualizar(request,response)

            setTimeout(()=>{
                expect(response.json).toHaveBeenCalledWith({mensaje: "error al actualizar el elemento", state:false})
                done()
    
            },200)

        })

    })
 

    
 
      afterAll(()=>{
        //borrado de la coleccion
        licoresmodels.mymodel.deleteMany({}).then((res)=>{})
    })  

    
    
}) 


describe("post:/licores/eliminar",() =>{
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

    test("debe fallar cuando el id no esta presente",(done) =>{
        //configurar request
        request.body = {}
        licorescontroler.eliminar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo _id es obligatorio", state:false})
            done()

        })

    })

    test("debe guardar el producto",(done) =>{
        //configurar request
        request.body = {codigo:"12", nombre:"papas", descripcion:"descripcion", imagen:"imagen",precio:"20000"}
        licorescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "elemento guardado correctamente", state:true})
            done()

        },200)

    })

    test("elemento eliminado correctamente",(done) =>{
        //configurar request
        licoresmodels.mymodel.find({nombre:"papas"}).then((res) => {
            request.body = { _id:res[0]._id}
            licorescontroler.eliminar(request,response)

            setTimeout(()=>{
                expect(response.json).toHaveBeenCalledWith({mensaje: "elemento eliminado correctamente", state:true})
                done()
    
            },200)

        })

    })

    test("debe fallar si no elimina",(done) =>{
        //configurar request
        licoresmodels.mymodel.find({nombre:"papas"}).then((res) => {
            request.body = { _id:"1234" }
            licorescontroler.eliminar(request,response)

            setTimeout(()=>{
                expect(response.json).toHaveBeenCalledWith({mensaje: "error al eliminar el elemento", state:false})
                done()
    
            },200)

        })

    })
 

    
 
      afterAll(()=>{
        //borrado de la coleccion
        licoresmodels.mymodel.deleteMany({}).then((res)=>{})
    })  

    
    
}) 

describe("post:/licores/listar",() =>{
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

    test("debe guardar el producto",(done) =>{
        //configurar request
        request.body = {codigo:"12", nombre:"papas", descripcion:"descripcion", imagen:"imagen",precio:"20000"}
        licorescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "elemento guardado correctamente", state:true})
            done()

        },200)

    })

    test("debe validarme que hay 1 registro en los licores",(done) =>{
        //configurar request
        request.body = {}
        licorescontroler.listar(request,response)
    
        setTimeout(()=>{
            expect(response.json.mock.calls[0][0].length).toBe(1)
            done()
    
        },200)
    
    })


 

    
 
      afterAll(()=>{
        //borrado de la coleccion
        licoresmodels.mymodel.deleteMany({}).then((res)=>{})
    })  

    
    
}) 

describe("post:/licores/listarid",() =>{
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

    test("debe fallar cuando el id no esta presente",(done) =>{
        //configurar request
        request.body = {}
        licorescontroler.listarid(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo _id es obligatorio", state:false})
            done()

        })

    })

    test("debe guardar el producto",(done) =>{
        //configurar request
        request.body = {codigo:"12", nombre:"papas", descripcion:"descripcion", imagen:"imagen",precio:"20000"}
        licorescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "elemento guardado correctamente", state:true})
            done()

        },200)

    })

    test("debe listar el id",(done) =>{
        //configurar request
        licoresmodels.mymodel.find({nombre:"papas"}).then((res) => {
            request.body = { _id:res[0]._id}
            licorescontroler.listarid(request,response)

            setTimeout(()=>{
                expect(response.json.mock.calls[0][0][0].nombre).toBe("papas")
                done()
    
            },200)

        })

    })


    
 
      afterAll(()=>{
        //borrado de la coleccion
        licoresmodels.mymodel.deleteMany({}).then((res)=>{})
    })  

    
    
}) 


