
var arregloLocalComentarios = [];
let indice;

function mostrarProducto(array, productoP){

    document.getElementById("producto").innerHTML = "";
    document.getElementById("imag").innerHTML = "";
    document.getElementById("relatedProducts").innerHTML = "";
     	
    let htmlContentToAppend = "";
    let imagenes = "";
    let relacionados = "";

    for(let i = 0; i < array.length; i++){	
        let elem = array[i]; 
               
        if (elem.cost == productoP){    

            indice = i;

        	for (let i = 0; i < elem.images.length; i++) {

        		if (i == 0) {

                    imagenes += `
                        <div class="carousel-item active">
                          <img src="`+ elem.images[i] +`" class="d-block w-100">
                        </div>
                        `;

                }else{

                     imagenes += `
                        <div class="carousel-item">
                          <img src="`+ elem.images[i] +`" class="d-block w-100">
                        </div>
                        `;

                }  


               

        	}  

            for (let j = 0; j < elem.relatedProducts.length; j++) {

                let indiceRelatedProduct = elem.relatedProducts[j];

                relacionados += `
                    <div class="list-group-item list-group-item-action">
                        <div class="row">
                            <div class="col-3">
                                <img src="` + array[indiceRelatedProduct].images[0] + `" alt="` +  `" class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <div>
                                        <h4 class="mb-1">`+ array[indiceRelatedProduct].name +`</h4>
                                        <p>`+ array[indiceRelatedProduct].description +`</p>
                                    </div>
                                    <br>
                                    <small class="text-muted">` + array[indiceRelatedProduct].soldCount + ` artículos vendidos</small><br> 
                                    <button class="btn btn-info" onclick="verProducto(`+ array[indiceRelatedProduct].cost +`)">Ver</button>                                   
                                </div>
                                <h3 class="m-3">` + array[indiceRelatedProduct].cost + ` $USD</small>
                            </div>
                        </div>
                    </div>
                    `;
                

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
            document.getElementById("relatedProducts").innerHTML = relacionados;


        }

    }
     
}

function mostrarComentarios(arrayJso, indice) {

    document.getElementById("comentarios").innerHTML = "";

    let comentarios = "";
    let comentariosLocal = "";

    /*if (localStorage.getItem("arregloComentarios")) {
        arregloComentarios_json = localStorage.getItem("arregloComentarios");
        arregloLocalComentarios = JSON.parse(arregloComentarios_json);

        alert(arregloLocalComentarios.length)

        for (let i = 0; i < arregloLocalComentarios.length; i++) {
            let elemLocal = arregloLocalComentarios[i];
            alert(elemLocal[0])
            if (elemLocal.indiceRelacionado == indice) {

                let estrellasLocal = "";
                let iEstrellasLocal = elemLocal.score;

                for (let i = 0; i < 5; i++) {

                    if (iEstrellasLocal > 0) {

                        estrellasLocal += '<span class="fa fa-star checked"></span>'
                        iEstrellasLocal--;

                    }else{

                        estrellasLocal += '<span class="fa fa-star"></span>'

                    }

                }

                comentariosLocal += `

                    <div class="list-group-item list-group-item-action">
                        <div class="row">
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <div>
                                        <h4 class="mb-1">`+ elemLocal.user +`</h4>
                                        <p>` + estrellasLocal + `</p>  
                                        <p>`+ elemLocal.description +`</p>
                                    </div>
                                    <br>
                                    <small class="text-muted ">Fecha de comentario: ` + elemLocal.dateTime + `</small><br>   
                                                  
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            }

        }
        

    }*/

    for (let i = 0; i < arrayJso.length; i++) {
        let elem = arrayJso[i];

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

    document.getElementById("comentarios").innerHTML = comentarios +'<br>'+ comentariosLocal;

}

function enviarComentario() {

    let fecha = new Date();
    let stars = obtenerPuntuacion();
    let comentarioNuevo = {             //los valores estan bien
            score: stars,
            description: document.getElementById("message").value,
            user: user.email, 
            dateTime: fecha,
            indiceRelacionado: indice           
        };

    let comentarioNuevo_json = JSON.stringify(comentarioNuevo);

    if (localStorage.getItem("arregloComentarios")) {

        arrLocal_json = localStorage.getItem("arregloComentarios");     //obtener el array de localstorage
        arrLocal = JSON.parse(arrLocal_json);                           //lo parseas FOR PARA EL PUSH??
        arrLocal.push(comentarioNuevo_json);                            //haces un push 
        arrLocal_json = JSON.stringify(arrLocal);                       
        localStorage.setItem("arregloComentarios", arrLocal_json);      //vuelves a meter en el localstorage

    }else{

        let arrN = [];
        arrN.push(comentarioNuevo_json);  

        let arrN_json = JSON.stringify(arrN);

        localStorage.setItem("arregloComentarios", arrN_json);

    }

    window.location = 'product-info.html';
    
}

function obtenerPuntuacion() {

    let elements = document.getElementsByName("puntuacion");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            return parseInt(elements[i].value);
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

            arregloJsonComentarios = resultObj.data;
            mostrarComentarios(arregloJsonComentarios, indice); 

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
        `;

        document.getElementById("calificacion").innerHTML = `
        <div class="star-rating text-center">
            <input id="star-1" type="radio" name="puntuacion" value="1"/> 1
            <label for="star-1" title="1 estrellas">
            <i class="active fa fa-star"></i>
            </label>
            <input id="star-2" type="radio" name="puntuacion" value="2" /> 2
            <label for="star-2" title="2 estrellas">
            <i class="active fa fa-star"></i>
            </label>
            <input id="star-3" type="radio" name="puntuacion" value="3" /> 3
            <label for="star-3" title="3 estrellas">
            <i class="active fa fa-star"></i>
            </label>
            <input id="star-4" type="radio" name="puntuacion" value="4" /> 4
            <label for="star-4" title="4 estrellas">
            <i class="active fa fa-star"></i>
            </label>
            <input id="star-5" type="radio" name="puntuacion" value="5" /> 5
            <label for="star-5" title="5 estrellas">
            <i class="active fa fa-star"></i>
            </label><br><br>    
            <button id="envioComentario"  class="btn btn-info" onclick="enviarComentario()">Enviar</button>       
        </div><br>
            
        `;

    }

});