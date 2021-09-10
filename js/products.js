
let minPrecio;
let maxPrecio;
let productos = [];
var busqueda;

function ordenarProductos(clave, array){
	let resultado = [];

    if (clave === 1) {

    	resultado = array.sort(
    		function(a, b){

    			if (a.cost < b.cost) {return -1;}
    			if (a.cost > b.cost) {return 1;}
    			return 0;

    		});


    }else if (clave === 2) {

    	resultado = array.sort(
    		function(a,b){

    			if (a.cost > b.cost) {return -1;}
    			if (a.cost < b.cost) {return 1;}
    			return 0;

    		});

    }else if (clave === 3) {

    	resultado = array.sort(
    		function(a,b){

    			if (a.soldCount > b.soldCount) {return -1;}
    			if (a.soldCount < b.soldCount) {return 1;}
    			return 0;

    		});

    }

    return resultado;

}

document.getElementById("filtro").addEventListener("click", function (){
	
	minPrecio = document.getElementById("minPrecio").value;
	maxPrecio = document.getElementById("maxPrecio").value;

	if (minPrecio != undefined && minPrecio != "" && parseInt(minPrecio) >= 0) {
		minPrecio = parseInt(minPrecio);
	}else{
		minPrecio = undefined;
	}
	if (maxPrecio != undefined && maxPrecio != "" && parseInt(maxPrecio) >= 0) {
		maxPrecio = parseInt(maxPrecio);
	}else{
		maxPrecio = undefined;
	}

	showProducts(productos);

});

document.getElementById("borrarFiltro").addEventListener("click", function (){
	
	document.getElementById("minPrecio").value = "";
	document.getElementById("maxPrecio").value = "";

	minPrecio = undefined;
	maxPrecio = undefined;

	showProducts(productos);

});

document.getElementById("PrecioAsc").addEventListener("click", function (){
	
	productos = ordenarProductos(1, productos);

	showProducts(productos);

});

document.getElementById("PrecioDes").addEventListener("click", function (){
	
	productos = ordenarProductos(2, productos);

	showProducts(productos);

});

document.getElementById("Relevancia").addEventListener("click", function (){
	
	productos = ordenarProductos(3, productos);

	showProducts(productos);

});

document.addEventListener("DOMContentLoaded", function (e) {
	
	getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productos = resultObj.data;
            //Muestro las categorías ordenadas
            showProducts(productos);
        }
    });

    document.getElementById("busqueda").addEventListener('input', function () {

        busqueda = document.getElementById("busqueda").value;
        showProducts(productos);

    });

});

function verProducto(productoName) {

    let producto = {
      costo: productoName //el ideal seria que tuviera un id unico
    };

    let producto_json = JSON.stringify(producto);

    localStorage.setItem("producto", producto_json);

    window.location = 'product-info.html';

}

function showProducts(array){

    document.getElementById("dataProductos").innerHTML = "";

    fetch(PRODUCTS_URL) 
        .then(respuesta => respuesta.json())

        .then(datos => {

            let htmlContentToAppend = "";
            for(let i = 0; i < array.length; i++){
                let elem = array[i];

                if (((minPrecio == undefined) || (minPrecio != undefined && elem.cost >= minPrecio)) &&
                    ((maxPrecio == undefined) || (maxPrecio != undefined && elem.cost <= maxPrecio)) &&
                    ((busqueda == undefined) || (elem.name.toLowerCase().includes(busqueda)) || (elem.description.toLowerCase().includes(busqueda))) ) {

                	htmlContentToAppend += `
	                <div class="list-group-item list-group-item-action">
			            <div class="row">
			                <div class="col-3">
			                    <img src="` + elem.imgSrc + `" alt="` +  `" class="img-thumbnail">
			                </div>
			                <div class="col">
			                    <div class="d-flex w-100 justify-content-between">
			                        <div>
			                        	<!---<a class="mb-1 " type="button" onclick="verProducto">`+ elem.name +`</a> --->
			                            <h4 class="mb-1">`+ elem.name +`</h4>
			                            <p>`+ elem.description +`</p>
			                        </div>
			                        <br>
			                        <small class="text-muted">` + elem.soldCount + ` artículos vendidos</small><br>
			                        <button onclick="verProducto(`+ elem.cost +`)">Ver</button>	
			                        
			                    </div>
			                    <h3 class="m-3">` + elem.cost + ` $USD</small>
			                </div>
			            </div>
			        </div>
			        `

                }
                 
                document.getElementById("dataProductos").innerHTML = htmlContentToAppend;
            }

            

        })
        .catch(error => alert("Hubo un error: " + error));
}

