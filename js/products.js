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
                <div class="list-group-item list-group-item-action">
		            <div class="row">
		                <div class="col-3">
		                    <img src="` + elem.imgSrc + `" alt="` +  `" class="img-thumbnail">
		                </div>
		                <div class="col">
		                    <div class="d-flex w-100 justify-content-between">
		                        <div>
		                            <h4 class="mb-1">`+ elem.name +`</h4>
		                            <p>`+ elem.description +`</p>
		                        </div>
		                        <small class="text-muted">` + elem.cost + ` artículos</small>
		                    </div>

		                </div>
		            </div>
		        </div>
		        `
                 

                document.getElementById("dataProductos").innerHTML = htmlContentToAppend;
            }

            

        })
        .catch(error => alert("Hubo un error: " + error));
}