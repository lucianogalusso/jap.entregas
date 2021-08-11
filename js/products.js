//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

const jason = "https://japdevdep.github.io/ecommerce-api/product/all.json";

function cargarDatosProductos() {
    document.getElementById("dataProductos").innerHTML = "";
    fetch(jason)
        .then(respuesta => respuesta.json())

        .then(datos => {

            let htmlContentToAppend = "";
            for(let i = 0; i < datos.length; i++){
                let elem = datos[i];

                htmlContentToAppend += `
                <li>`+ elem.name +` `+ elem.cost +`</li>Descripcion:<br>
                <p>`+ elem.description +`</p>
                `
                 

                document.getElementById("data").innerHTML = htmlContentToAppend;
            }

            

        })
        .catch(error => alert("Hubo un error: " + error));
}