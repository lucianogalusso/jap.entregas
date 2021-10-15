
//variables globales
let arrPrecios = [];
let arrCantidades = [];
let productos = [];

function showCartProducts(array){

    document.getElementById("cartProductos").innerHTML = "";

    fetch(CART_INFO_URL) 
        .then(respuesta => respuesta.json())

        .then(datos => {

            let htmlContentToAppend = "";

            for(let i = 0; i < array.length; i++){

                let elem = array[i];
                let dolares = false;
                let subtotal1 = elem.unitCost*elem.count;
                if (elem.currency === "USD") {dolares = true}
                arrPrecios[i] = [subtotal1, dolares];	
            	arrCantidades[i] = elem.count;

                //<small class="text-muted">Cantidad: ` + arrCantidades[i] + `</small> onchange="subtotal(`++`, `++`)"

            	htmlContentToAppend += `
            		<div class="list-group-item list-group-item-action">
			            <div class="row">
			                <div class="col-3">
			                    <img src="` + elem.src + `" alt="` +  `" class="img-thumbnail">
			                </div>
			                <div class="col">
			                    <div class="d-flex w-100 justify-content-between">
			                        <div class="col-6">
			                            <h4 class="mb-1">`+ elem.name +`</h4>
			                        </div>

			                        
			                        <input onchange="calculoSubtotal(`+elem.unitCost+`, `+i+`, `+dolares+`)" type="number" id="cantidad`+i+`" value="`+elem.count+`"
			                        min="1" max="10">Cantidad

			                        <div class="btn-group-vertical">
									  	<button type="button" class="btn btn-outline-success"

									  	onclick="modificarCantidad(`+i+`, true)">+</button>

									    <button type="button" class="btn btn-outline-danger"

									    onclick="modificarCantidad(`+i+`, false)">-</button>

									</div><br>		                        
			                    </div>
			                    <h3 >` + elem.unitCost + ` $`+ elem.currency +` </small><br>
			                    <small class="text-muted">Subtotal: </small>
			                    <small id="subtotal`+i+`" class="text-muted">`+subtotal1+`</small>
			                    <small class="text-muted">	$`+ elem.currency +` </small>
			                </div>
			            </div>
			        </div>
		        `          
                
                document.getElementById("cartProductos").innerHTML = htmlContentToAppend;

            }


            if (document.getElementById("cartProductos").innerHTML == "") {

            	document.getElementById("cartProductos").innerHTML = `

            		<div>
            			<h4>Tu carrito se encuentra vacio actualmente</h4>
            		</div>

            	`

            }else{

            	showPanel();

            }          

        })
        .catch(error => alert("Hubo un error: " + error));
}

function calculoSubtotal(precio, i, dolares) {

	let cantidad = parseInt(document.getElementById(`cantidad`+i+``).value);
	subtotal = cantidad*precio;	//ojaldre
	document.getElementById(`subtotal`+i+``).innerHTML = subtotal;
	arrPrecios[i] = [subtotal, dolares];
	calcularTotal();

}

function calcularEnvio() {

	let envio = 0;





	return envio;

}

function calcularTotal() {

	let total = 0;
	for (var i = 0; i < arrPrecios.length; i++) {	

		let numero = arrPrecios[i][0];

		if (arrPrecios[i][1] === true) {

			total += numero*40;

		}else{

			total += numero;

		}

	}

	//return total;
	document.getElementById("subtotal").innerHTML = total;	
	//calcularEnvio();

}

function showPanel() {

	document.getElementById("panelAbajo").innerHTML = "";
	let panel = "";	
	//let envio = calcularEnvio();

	panel = `

		<div class="row">
			<h2 class="col-md-12">Resumen de total:</h2><br><br><br>	
			<h6 class="col-3">Subtotal ($UYU):</h6>
			<h6 id="subtotal" class="col-2"></h6>
			<br>
			<h6 class="col-2">Envio ($UYU): </h6>
			<div class="dropdown col-1">
			  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
			    Forma de envio
			  </button>
			  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
			    <li><a class="dropdown-item">Premium (2-5 dias)</a></li>
			    <li><a class="dropdown-item">Express (5-8 dias)</a></li>
			    <li><a class="dropdown-item">Standard (12 a te llegara?)</a></li>
			  </ul>
			</div>
			<br><br><br>	
			<h3 class="col-12">Total ($UYU): </h3>
			<h3 class="col-12" id="total"></h3><br><br><br>
			<h4 class="col-5">Seleccionar forma de pago</h4>
			<select class="col-5">
			  <option value="tarjetaC">Tarjeta de credito</option>
			  <option value="transferencia">Transferencia bancaria</option>
			</select>		
			<button id="comprar" class="col-12 btn btn-primary">Realizar compra</button><br><br><br><br>	

		</div>

	`

	//calcularTotal();
	document.getElementById("panelAbajo").innerHTML = panel;

}


document.addEventListener("DOMContentLoaded", function(e){

	getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productos = resultObj.data.articles;
            showCartProducts(productos);

            //envio
        }
    });

    //envio

});