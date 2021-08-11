//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});


// const jason = "https://lucianogalusso.github.io/jason/json.json";

function cargarDatosProductos(url) {
    document.getElementById("data").innerHTML = "";
    fetch(url)
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