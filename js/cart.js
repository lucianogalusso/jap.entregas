
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
                alert(arrPrecios)

                

            	htmlContentToAppend += `
            		<div class="list-group-item list-group-item-action">
			            <div class="row">
			                <div class="col-3">
			                    <img src="` + elem.src + `" alt="` +  `" class="img-thumbnail">
			                </div>
			                <div class="col">
			                    <div class="d-flex w-100 justify-content-between">
			                        <div>
			                            <h4 class="mb-1">`+ elem.name +`</h4>
			                        </div>
			                        <br>
			                        <small class="text-muted">Cantidad: ` + elem.count + `</small><br>		                        
			                    </div>
			                    <h3 class="m-3">` + elem.unitCost + ` $`+ elem.currency +` </small><br>
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

			alert(numero*40)
			subtotal += numero*40;

		}else{

			alert(numero)
			subtotal += numero;

		}


	}

	panel = `

		<div>
			<h4>Resumen de total:</h4><br><br>
			<p>Subtotal: `+subtotal+` $UYU</p><br>
			<p>Envio: `+subtotal/10+`</p><br><br>
			<h4>Total: `+(subtotal + subtotal/10)+` $UYU</h4>
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