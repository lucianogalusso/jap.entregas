//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

	document.getElementById("inicio").addEventListener("click", function(){

		let email = document.getElementById("email");
		let password = document.getElementById("password");
		let completo = true;

		if (email.value === ''){

			email.classList.add("completar");
			completo = false;

		}else{

			email.classList.remove("completar");

		}

		if (password.value === '') {

			password.classList.add("completar");
			completo = false;


		}else{

			password.classList.remove("completar");

		}

		if (completo) {

			window.location = 'inicio.html';

		}else{

			alert("Debe completar ambos casilleros");

		}


	})

});
