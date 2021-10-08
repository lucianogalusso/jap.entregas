
//variables globales de total
let arrPrecios = [];

function showCartProducts(array){

    document.getElementById("cartProductos").innerHTML = "";

    fetch(CART_INFO_URL) 
        .then(respuesta => respuesta.json())

        .then(datos => {

            let htmlContentToAppend = "";
            for(let i = 0; i < array.articles.length; i++){
                let elem = array.articles[i];
                let subtotal = elem.count*elem.unitCost;
                let dolares = false;
                if (elem.currency === "USD") {dolares = true}
                arrPrecios[i] = [subtotal, dolares];	//ACA ERROR
                //alert(arrPrecios)

                

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
			                        <small class="text-muted">Cantidad: ` + elem.count + `</small>
			                        <div class="btn-group-vertical">
									  	<button type="button" class="btn btn-outline-success">+</button>
									    <button type="button" class="btn btn-outline-danger">-</button>
									</div><br>		                        
			                    </div>
			                    <h3 >` + elem.unitCost + ` $`+ elem.currency +` </small><br>
			                    <small class="text-muted">Subtotal:  ` + elem.count + `*`+ elem.unitCost +` $`+ elem.currency +` = 
			                    `+ elem.count*elem.unitCost +` $`+ elem.currency +` </small>
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

function showPanel() {

	document.getElementById("panelAbajo").innerHTML = "";
	let panel = "";
	let total = 0;
	let subtotal = 0;
	let envio = 0;

	for (var i = 0; i < arrPrecios.length; i++) {	//con while
		let numero = arrPrecios[i][0];
		//let dolares = arrPrecios[i+1];

		if (arrPrecios[i][1] === true) {

			//alert(numero*40)
			subtotal += numero*40;

		}else{

			//alert(numero)
			subtotal += numero;

		}


	}

	panel = `

		<div class="row">
			<h2 class="col-md-12">Resumen de total:</h2><br><br><br>	
			<h6 class="col-5">Subtotal: `+subtotal+` $UYU</h6><br>
			<h6 class="col-2">Envio: `+subtotal/10+`</h6>
			<div class="dropdown col-1">
			  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
			    Forma de envio
			  </button>
			  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
			    <li><a class="dropdown-item" href="#">Premium (2-5 dias)</a></li>
			    <li><a class="dropdown-item" href="#">Express (5-8 dias)</a></li>
			    <li><a class="dropdown-item" href="#">Standard (12 a te llegara?)</a></li>
			  </ul>
			</div>
			<br><br><br>	
			<h3 class="col-12">Total: `+(subtotal + subtotal/10)+` $UYU</h3><br><br><br><br>
			<h4 class="col-5">Seleccionar forma de pago</h4>
			<select class="col-5">
			  <option value="tarjetaC">Tarjeta de credito</option>
			  <option value="transferencia">Transferencia bancaria</option>
			</select>		
			<button id="comprar" class="col-12 btn btn-primary">Realizar compra</button><br><br><br><br>	

		</div>

	`

	document.getElementById("panelAbajo").innerHTML = panel;

}


document.addEventListener("DOMContentLoaded", function(e){

	getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productos = resultObj.data;
            showCartProducts(productos);
        }
    });

});