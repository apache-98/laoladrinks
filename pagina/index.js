var datos = []

var cargartodo = function(){


    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        datos = (JSON.parse(this.responseText)).datos
        var misdatos = document.getElementById("misdatos")
        misdatos.innerHTML = ""

        for (let a = 0; a < datos.length; a++) {
            misdatos.innerHTML += ` <tr>
                                        <td> ${datos[a].nombre}</td>
                                        <td>${datos[a].apellido}</td>
                                        <td>${datos[a].email}</td>
                                        <td>${datos[a].contraseña}</td>
                                    </tr>`
            
        }
      }
    });

    xhr.open("GET", "http://localhost:3000/usuarios/listar");

    xhr.send();

}

var abrirmodal = function(){
    $('#exampleModal').modal('show')
}

var guardar = function(){
    var nombre = document.getElementById("nombre").value
    var apellido = document.getElementById("apellido").value
    var email = document.getElementById("email").value
    var contraseña = document.getElementById("contraseña").value

    var data = `email=${email}&nombre=${nombre}&apellido=${apellido}&contrase%C3%B1a=${contraseña}`;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        var mirespuesta = JSON.parse((this.responseText));
        if (mirespuesta.state == false){
            Swal.fire({
                title: 'Error!',
                text: mirespuesta.mensaje,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
        else{
            Swal.fire({
                title: 'Que bien!',
                text: mirespuesta.mensaje,
                icon: 'success',
                confirmButtonText: 'Cool'
            })

        }
        $('#exampleModal').modal('hide')
        cargartodo()
      }
    });

    xhr.open("POST", "http://localhost:3000/usuarios/registrar");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data); 
}

cargartodo()