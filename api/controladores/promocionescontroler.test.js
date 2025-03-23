var promocionescontroler = require("./promocionescontroler.js").promocionescontroler

var promocionesmodels = require("../../api/controladores/modelos/promocionesmodels.js").promocionesmodels
const session = require("express-session")
var mongoose = require("mongoose")
global.sha256 = require("sha256")
var config = require("../../config.js").config


describe("post:/promociones/guardar",() =>{
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
        promocionescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo codigo es obligatorio", state:false})
            done()

        })

    })

    test("debe fallar cuando el nombre no esta presente",(done) =>{
        //configurar request
        request.body = {codigo:"12"}
        promocionescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo nombre es obligatorio", state:false})
            done()

        })

    })

    test("debe fallar cuando la descripcion no esta presente",(done) =>{
        //configurar request
        request.body = {codigo:"12", nombre:"william"}
        promocionescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo descripcion es obligatorio", state:false})
            done()

        })

    })

    test("debe fallar cuando la imagen no esta presente",(done) =>{
        //configurar request
        request.body = {codigo:"12", nombre:"william", descripcion:"descripcion"}
        promocionescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo imagen es obligatorio", state:false})
            done()

        })

    })

    test("debe fallar cuando el precio no esta presente",(done) =>{
        //configurar request
        request.body = {codigo:"12", nombre:"william", descripcion:"descripcion", imagen:"imagen"}
        promocionescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo precio es obligatorio", state:false})
            done()

        },200)

    })

    test("debe guardar el producto",(done) =>{
        //configurar request
        request.body = {codigo:"12", nombre:"william", descripcion:"descripcion", imagen:"imagen",precio:"20000"}
        promocionescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "elemento guardado correctamente", state:true})
            done()

        },200)

    })

    test("debe fallar si el codigo ya existe",(done) =>{
        //configurar request
        request.body = {codigo:"12", nombre:"william", descripcion:"descripcion", imagen:"imagen",precio:"20000"}
        promocionescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el codigo de este elemento ya existe", state:false})
            done()

        },200)

    })

    
 
      afterAll(()=>{
        //borrado de la coleccion
        promocionesmodels.mymodel.deleteMany({}).then((res)=>{})
    })  

    
    
}) 

describe("post:/promociones/actualizar",() =>{
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
        promocionescontroler.actualizar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo _id es obligatorio", state:false})
            done()

        })

    })

    test("debe guardar el producto",(done) =>{
        //configurar request
        request.body = {codigo:"12", nombre:"papas", descripcion:"descripcion", imagen:"imagen",precio:"20000"}
        promocionescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "elemento guardado correctamente", state:true})
            done()

        },200)

    })

    test("debe fallar cuando el nombre no esta presente",(done) =>{
        //configurar request
        promocionesmodels.mymodel.find({nombre:"papas"}).then((res) => {
            request.body = { _id:res[0]._id}
            promocionescontroler.actualizar(request,response)

            setTimeout(()=>{
                expect(response.json).toHaveBeenCalledWith({mensaje: "el campo nombre es obligatorio", state:false})
                done()
    
            },200)

        })

    })


    test("debe fallar cuando la descripcion no esta presente",(done) =>{
        //configurar request
        promocionesmodels.mymodel.find({nombre:"papas"}).then((res) => {
            request.body = { _id:res[0]._id, nombre:"papas"}
            promocionescontroler.actualizar(request,response)

            setTimeout(()=>{
                expect(response.json).toHaveBeenCalledWith({mensaje: "el campo descripcion es obligatorio", state:false})
                done()
    
            },200)

        })

    })


    test("elemento actualizado correctamente",(done) =>{
        //configurar request
        promocionesmodels.mymodel.find({nombre:"papas"}).then((res) => {
            request.body = { _id:res[0]._id, nombre:"papas", descripcion:"hhhh"}
            promocionescontroler.actualizar(request,response)

            setTimeout(()=>{
                expect(response.json).toHaveBeenCalledWith({mensaje: "elemento actualizado correctamente", state:true})
                done()
    
            },200)

        })

    })

    test("debe fallar si no actualiza",(done) =>{
        //configurar request
        promocionesmodels.mymodel.find({nombre:"papas"}).then((res) => {
            request.body = { _id:"1234", nombre:"papas", descripcion:"hhhh"}
            promocionescontroler.actualizar(request,response)

            setTimeout(()=>{
                expect(response.json).toHaveBeenCalledWith({mensaje: "error al actualizar el elemento", state:false})
                done()
    
            },200)

        })

    })
 

    
 
      afterAll(()=>{
        //borrado de la coleccion
        promocionesmodels.mymodel.deleteMany({}).then((res)=>{})
    })  

    
    
}) 


describe("post:/promociones/eliminar",() =>{
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
        promocionescontroler.eliminar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo _id es obligatorio", state:false})
            done()

        })

    })

    test("debe guardar el producto",(done) =>{
        //configurar request
        request.body = {codigo:"12", nombre:"papas", descripcion:"descripcion", imagen:"imagen",precio:"20000"}
        promocionescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "elemento guardado correctamente", state:true})
            done()

        },200)

    })

    test("elemento eliminado correctamente",(done) =>{
        //configurar request
        promocionesmodels.mymodel.find({nombre:"papas"}).then((res) => {
            request.body = { _id:res[0]._id}
            promocionescontroler.eliminar(request,response)

            setTimeout(()=>{
                expect(response.json).toHaveBeenCalledWith({mensaje: "elemento eliminado correctamente", state:true})
                done()
    
            },200)

        })

    })

    test("debe fallar si no elimina",(done) =>{
        //configurar request
        promocionesmodels.mymodel.find({nombre:"papas"}).then((res) => {
            request.body = { _id:"1234" }
            promocionescontroler.eliminar(request,response)

            setTimeout(()=>{
                expect(response.json).toHaveBeenCalledWith({mensaje: "error al eliminar el elemento", state:false})
                done()
    
            },200)

        })

    })
 

    
 
      afterAll(()=>{
        //borrado de la coleccion
        promocionesmodels.mymodel.deleteMany({}).then((res)=>{})
    })  

    
    
}) 

describe("post:/promociones/listar",() =>{
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
        promocionescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "elemento guardado correctamente", state:true})
            done()

        },200)

    })

    test("debe validarme que hay 1 registro en los productos",(done) =>{
        //configurar request
        request.body = {}
        promocionescontroler.listar(request,response)
    
        setTimeout(()=>{
            expect(response.json.mock.calls[0][0].length).toBe(1)
            done()
    
        },200)
    
    })


 

    
 
      afterAll(()=>{
        //borrado de la coleccion
        promocionesmodels.mymodel.deleteMany({}).then((res)=>{})
    })  

    
    
}) 

describe("post:/promociones/listarid",() =>{
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
        promocionescontroler.listarid(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "el campo _id es obligatorio", state:false})
            done()

        })

    })

    test("debe guardar el producto",(done) =>{
        //configurar request
        request.body = {codigo:"12", nombre:"papas", descripcion:"descripcion", imagen:"imagen",precio:"20000"}
        promocionescontroler.guardar(request,response)

        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({mensaje: "elemento guardado correctamente", state:true})
            done()

        },200)

    })

    test("debe listar el id",(done) =>{
        //configurar request
        promocionesmodels.mymodel.find({nombre:"papas"}).then((res) => {
            request.body = { _id:res[0]._id}
            promocionescontroler.listarid(request,response)

            setTimeout(()=>{
                expect(response.json.mock.calls[0][0][0].nombre).toBe("papas")
                done()
    
            },200)

        })

    })


    
 
      afterAll(()=>{
        //borrado de la coleccion
        promocionesmodels.mymodel.deleteMany({}).then((res)=>{})
    })  

    
    
}) 




