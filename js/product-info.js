
let commentsArray;
let indice;

function mostrarProducto(array, productoP){

    document.getElementById("producto").innerHTML = "";
    document.getElementById("imag").innerHTML = "";
     	
    let htmlContentToAppend = "";
    let imagenes = "";

    for(let i = 0; i < array.length; i++){	
        let elem = array[i]; 
               
        if (elem.cost == productoP){    

            indice = i;

        	for (let i = 0; i < elem.images.length; i++) {

        		imagenes += '<img class="img-thumbnail" src="'+ elem.images[i] +'" >';

        	}     	

        	htmlContentToAppend += `
           
                <div >
                    <div class="d-flex w-100 justify-content-between">
                        <div>
                            <h2 class="mb-1">`+ elem.name +`</h4>

                            <p>`+ elem.description +`</p>
                        </div>	
                        <br>
                        <small class="text-muted">` + elem.soldCount + ` artículos vendidos</small><br>
                        
                    </div>
                    <h3 class="m-3" >` + elem.cost + ` $USD</small>
                </div>
	        `

			document.getElementById("producto").innerHTML = htmlContentToAppend;
			document.getElementById("imag").innerHTML = imagenes;


        }

    }
     
}

function mostrarComentarios(array, indice) {

    document.getElementById("comentarios").innerHTML = "";
        
    let comentarios = "";

    for (let i = 0; i < array.length; i++) {
        let elem = array[i];

        if (elem.indiceRelacionado == indice) {

            let estrellas = "";
            let iEstrellas = elem.score;

            for (let i = 0; i < 5; i++) {

                if (iEstrellas > 0) {

                    estrellas += '<span class="fa fa-star checked"></span>'
                    iEstrellas--;

                }else{

                    estrellas += '<span class="fa fa-star"></span>'

                }

            }

            comentarios += `

                <div class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <div>
                                    <h4 class="mb-1">`+ elem.user +`</h4>
                                    <p>` + estrellas + `</p>  
                                    <p>`+ elem.description +`</p>
                                </div>
                                <br>
                                <small class="text-muted ">Fecha de comentario: ` + elem.dateTime + `</small><br>   
                                              
                            </div>
                        </div>
                    </div>
                </div>
            `

        }

    }

    document.getElementById("comentarios").innerHTML = comentarios;

}

function enviarComentario() {

    let stars = obtenerPuntuacion();
    let desc = document.getElementById("message").innerHTML;
    let fecha = new Date();
    let comentarioNuevo = {indiceRelacionado: indice, score: stars, description: desc, user: user.email, dateTime: fecha};

    commentsArray.push(comentarioNuevo);

    window.location = 'products.html';
    
}

function obtenerPuntuacion() {

    let elementos = document.getElementByName("puntuacion");
    for (var i = 0; i < elementos.length; i++) {
        if (elementos[i].checked) {
            return parseInt(elementos[i].value)
        }
    }
    
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

	getJSONData(PRODUCTOS_ACTUALIZADOS_URL).then(function(resultObj){  //DEFINIR PRODUCTO ACA
        if (resultObj.status === "ok" && localStorage.getItem("producto")){
            productosArray = resultObj.data;

            producto_json = localStorage.getItem("producto");
	    	producto = JSON.parse(producto_json);
	    	productoPrecio = parseInt(producto.costo);

            mostrarProducto(productosArray, productoPrecio);

        }else{

        	alert("Hubo un error")
            window.location = 'products.html';

        }

    })

    getJSONData(PRODUCTOS_COMENTARIOS_ACTUALIZADOS_URL).then(function (resultObj) { //DEFINIR COMENTARIOS ACA?
        if (resultObj.status === "ok"){

            comentariosArray = resultObj.data;
            mostrarComentarios(comentariosArray, indice); //ERROR INDICE?

        }else{

            document.getElementById("comentarios").innerHTML = `
            <div class="alert-danger">
                 <h4 class="mb-1">Lo siento, de momento no se encuentra la informacion disponible</h4>
            </div>
            `;

        }

    })  

    if (localStorage.getItem("user")) {

        document.getElementById("casillaComentario").innerHTML = `

        <h4 class="text-center p-4">Quieres agregar un comentario?</h4>
        <form class="text-center p-4">
            <label for="lname">Comentario:</label><br>
            <textarea id="message" rows="10" cols="30" style="width:600px; height:200px;" placeholder="Bla bla bla"></textarea><br>
            <label for="fname">Puntuacion:</label><br>
        </form>
        <div class="star-rating text-center">
            <input id="star-1" type="radio" name="puntuacion" value="1"/>
            <label for="star-1" title="1 estrellas">
            <i class="active fa fa-star"></i>
            </label>
            <input id="star-2" type="radio" name="puntuacion" value="2" />
            <label for="star-2" title="2 estrellas">
            <i class="active fa fa-star"></i>
            </label>
            <input id="star-3" type="radio" name="puntuacion" value="3" />
            <label for="star-3" title="3 estrellas">
            <i class="active fa fa-star"></i>
            </label>
            <input id="star-4" type="radio" name="puntuacion" value="4" />
            <label for="star-4" title="4 estrellas">
            <i class="active fa fa-star"></i>
            </label>
            <input id="star-5" type="radio" name="puntuacion" value="5" />
            <label for="star-5" title="5 estrellas">
            <i class="active fa fa-star"></i>
            </label><br><br>    
            <button id="envioComentario" onclick="enviarComentario()">Enviar</button>       
        </div><br>
            
        `;


    }

});