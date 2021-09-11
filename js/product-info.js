
let corresponde = false;

function mostrarProducto(info, productoP){

    document.getElementById("producto").innerHTML = "";
    document.getElementById("imag").innerHTML = "";
     	
    let htmlContentToAppend = "";
    let imagenes = "";

    //for(let i = 0; i < array.length; i++){	//ACA PROBLEMAS, NO ES UN ARRAY EL JSON
        //let elem = array[i]; 
               
        if (info.cost == productoP){

            corresponde = true;

        	for (let i = 0; i < info.images.length; i++) {

        		imagenes += '<img class="img-thumbnail" src="'+ info.images[i] +'" >';

        	}

        	

        	htmlContentToAppend += `
           
                <div >
                    <div class="d-flex w-100 justify-content-between">
                        <div>
                            <h2 class="mb-1">`+ info.name +`</h4>

                            <p>`+ info.description +`</p>
                        </div>	
                        <br>
                        <small class="text-muted">` + info.soldCount + ` artículos vendidos</small><br>
                        
                    </div>
                    <h3 class="m-3" >` + info.cost + ` $USD</small>
                </div>
	        `

			document.getElementById("producto").innerHTML = htmlContentToAppend;
			document.getElementById("imag").innerHTML = imagenes;


        }else{
         
        	document.getElementById("producto").innerHTML = `
        	<div class="alert alert-danger">
        		 <h4 class="mb-1">Lo siento, de momento no se encuentra la informacion disponible</h4>
        	</div>
        	`;

        }

    //}

     
}

function mostrarComentarios(array) {

    document.getElementById("comentarios").innerHTML = "";
        
    let comentarios = "";

    for (let i = 0; i < array.length; i++) {
        let elem = array[i];
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

    document.getElementById("comentarios").innerHTML = comentarios;

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

	getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok" && localStorage.getItem("producto")){

            productosInfo = resultObj.data;

            producto_json = localStorage.getItem("producto");
	    	producto = JSON.parse(producto_json);
	    	productoPrecio = parseInt(producto.costo);

            mostrarProducto(productosInfo, productoPrecio);

        }else{

        	window.location = 'products.html';

        }

    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok" && corresponde){

            commentsArray = resultObj.data;

            mostrarComentarios(commentsArray);

        }else{

            document.getElementById("cometarios").innerHTML = `
            <div class="alert alert-danger">
                 <h4 class="mb-1">Lo siento, de momento no se encuentra la informacion disponible</h4>
            </div>
            `;

        }

    });

});