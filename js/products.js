
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
            //Muestro las categor??as ordenadas
            showProducts(productos);
        }
    });

    document.getElementById("busqueda").addEventListener('input', function () {

        busqueda = document.getElementById("busqueda").value;
        showProducts(productos);

    });

});

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
	                
                		<div class="col-md-4 mt-1 list-group-item list-group-item-action">
			                <div>
			                    <img src="` + elem.imgSrc + `" class="img-fluid" alt="Responsive image">
			                </div>
			                <div>
			                    <div class="row d-flex w-100 justify-content-between">
			                        <div class="col-9">
			                            <h4 class="mb-1">`+ elem.name +`</h4>
			                            <p>`+ elem.description +`</p>
			                        </div>
			                        
			                        <small class="text-muted">` + elem.soldCount + ` art??culos vendidos</small><br>	<br>	                        			                        
			                    </div>
			                     <div class="row">
				                    <button class="btn btn-primary" onclick="verProducto(`+ elem.cost +`)">Ver</button>	
				                    <h3 class="m-3">` + elem.cost + ` $USD</small>
				                </div>
			                </div>
			            </div><br><br>
			        
			        `

                }
                 
                document.getElementById("dataProductos").innerHTML = htmlContentToAppend;
            }

            

        })
        .catch(error => alert("Hubo un error: " + error));
}

