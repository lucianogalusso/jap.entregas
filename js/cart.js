
//variables globales
let arrPrecios = [];
let arrCantidades = [];
let productos = [];
let formaPago = false;
let habilitadoPago = false;

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
			                <div class="col-2">
			                    <img src="` + elem.src + `" alt="` +  `" class="img-thumbnail">
			                </div>
			                <div class="col">
			                    <div class="d-flex w-100 justify-content-between">
			                        <div class="col-8">
			                            <h2 class="mb-1">`+ elem.name +`</h4>
			                        </div><br><br><br>
			                        <div class="col-3">			                       
			                        Cantidad: <input style="height:35px; width:35px" onchange="calculoSubtotal(`+elem.unitCost+`, `+i+`, `+dolares+`)" type="number" id="cantidad`+i+`" value="`+elem.count+`"
			                        min="1" max="10">
			                        </div>

			                        <!-- <div class="btn-group-vertical">
									  	<button type="button" class="btn btn-outline-success"

									  	onclick="modificarCantidad(`+i+`, true)">+</button>

									    <button type="button" class="btn btn-outline-danger"

									    onclick="modificarCantidad(`+i+`, false)">-</button>

									</div><br>	-->

			                    </div>
			                    <h4 >` + elem.unitCost + ` $`+ elem.currency +` </small><br>
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

            	calcularTotal();

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

function realizarCompra() {

	let calle = document.getElementById("direccionCalle");
    let esquina = document.getElementById("direccionEsq");
    let numero = document.getElementById("direccionNum");

    let contador = 0;

    if (calle.value === ''){
   
      calle.classList.add("is-invalid");
      contador += 1;

    }else{

      calle.classList.remove("is-invalid");
      calle.classList.add("is-valid");

    }

    if (esquina.value === ''){
   
      esquina.classList.add("is-invalid");
      contador += 1;

    }else{

      esquina.classList.remove("is-invalid");
      esquina.classList.add("is-valid");

    }

    if (numero.value === ''){
   
      numero.classList.add("is-invalid");
      contador += 1;

    }else{

      numero.classList.remove("is-invalid");
      numero.classList.add("is-valid");

    }

	if (contador > 0) {



	}else if (formaPago && contador == 0) {

		alert("La compra ha sido realizada con éxito")
		window.location = 'PRODUCTS.html';


	}else{

		alert("Debe seleccionar una forma de pago")

	}

}

function pago() {

	let arrpagos = document.getElementsByName("metodoPago");
	let pago = "";
	let nombre;
	let numero;
	
	if (arrpagos[0].checked) {

		nombre = document.getElementById("nombreTarjeta").value;
		numero = document.getElementById("numeroTarjeta").value;
		if (nombre == "" || numero == "") {
			alert("Debe ingresar los valores necesarios");
			pago = "Seleccionar forma de pago";
		}else{
			pago = "Tarjeta de credito";
			document.getElementById("nombreTarjeta").innerHTML = nombre;
			document.getElementById("numeroTarjeta").innerHTML = numero;
			formaPago = true;
		}

	}else if (arrpagos[1].checked) {

		nombre = document.getElementById("nombreCuenta").value;
		numero = document.getElementById("numeroCuenta").value;
		if (nombre == "" || numero == "") {
			alert("Debe ingresar los valores necesarios");
			pago = "Seleccionar forma de pago";
		}else{
			pago = "Transferencia bancaria";
			document.getElementById("nombreCuenta").innerHTML = nombre;
			document.getElementById("numeroCuenta").innerHTML = numero;
			formaPago = true;
		}
		

	}else{

		pago = "Seleccionar forma de pago"

	}

	document.getElementById("formaPago").innerHTML = pago;

}

function calcularEnvio() {

	let subtotal = parseInt(document.getElementById(`subtotal`).innerHTML);
	let envio = 0;
	let metodo = document.getElementsByName("metodoEnvio"); //array de metodos 

	for (var i = 0; i < metodo.length; i++) {

		if (metodo[i].checked) {

			if (metodo[i].value == 1) {

				envio = subtotal*15/100;

			}else if(metodo[i].value == 2) {

				envio = subtotal*7/100;

			}else{

				envio = subtotal/20;

			}

		}
	
	}

	document.getElementById("envio").innerHTML = envio;	
	calcularTotalFinal();

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
	calcularEnvio();

}

function calcularTotalFinal() {

	let subtotal = parseInt(document.getElementById(`subtotal`).innerHTML);
	let envio = parseInt(document.getElementById(`envio`).innerHTML);
	let total = subtotal + envio;
	document.getElementById("total").innerHTML = total;	

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

    let metodos = document.getElementsByName(`metodoEnvio`);
    for (var i = 0; i < metodos.length; i++) {

    	metodos[i].addEventListener("change", function() {
    		calcularEnvio();
    	});
    	
    }

});