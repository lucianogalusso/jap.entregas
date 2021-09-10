
function mostrarProducto(array, productoP){

    document.getElementById("producto").innerHTML = "";
    document.getElementById("imag").innerHTML = "";
     	
    let htmlContentToAppend = "";
    let imagenes = "";

    //for(let i = 0; i < array.length; i++){	//ACA PROBLEMAS, NO ES UN ARRAY EL JSON
        //let elem = array[i]; 

    //let imagesArray = JSON.parse(array.images);

               
        if (array.cost == productoP){

        	alert(array.images);

        	var arrayImages = (array.images).split(",");

        	alert(arrayImages.lenght);

        	for (let i = 0; i < array.images.lenght; i++) {

        		imagenes += '<img src="'+ array.images[i] +'" width="90" height"150" alt="">';

        	}

        	

        	htmlContentToAppend += `
           
                <div >
                    <div class="d-flex w-100 justify-content-between">
                        <div>
                            <h4 class="mb-1">`+ array.name +`</h4>

                            <p>`+ array.description +`</p>
                        </div>	
                        <br>
                        <small class="text-muted">` + array.soldCount + ` artículos vendidos</small><br>
                        
                    </div>
                    <h3 class="m-3">` + array.cost + ` $USD</small>
                </div>
	        `

			document.getElementById("producto").innerHTML = htmlContentToAppend;
			document.getElementById("imag").innerHTML = "";


        }else{
         
        	document.getElementById("producto").innerHTML = `
        	<div>
        		 <h4 class="mb-1">Lo siento, de momento no se encuentra la informacion disponible</h4>
        	</div>
        	`;

        }

    //}

     
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

	getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok" && localStorage.getItem("producto")){

            productosArray = resultObj.data;

            producto_json = localStorage.getItem("producto");
	    	producto = JSON.parse(producto_json);
	    	productoPrecio = parseInt(producto.costo);

	    	alert(productoPrecio);

            mostrarProducto(productosArray, productoPrecio);

        }else{

        	window.location = 'products.html';

        }

    });

});