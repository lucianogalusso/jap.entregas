//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

function validarIngreso(){

	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;

	if (email == "" || password == ""){

		alert("Debe completar ambos casilleros");

	}else{

		window.open(inicio.html);

	}


}