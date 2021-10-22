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

      let user = {
          email: document.getElementById("email").value, 
          imagen: "",
          password: document.getElementById("password").value,
          nombre: "",
          apellidos: "",
          edad: "",
          telefono: "", 
      };

      let user_json = JSON.stringify(user);

      localStorage.setItem("user", user_json);

			window.location = 'inicio.html';

		}else{

			alert("Debe completar ambos casilleros");

		}


	})

});

function onSignIn(googleUser) {

  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  let user = {
      email: profile.getName(),
      password: profile.getId(), 
  };

  let user_json = JSON.stringify(user);

  localStorage.setItem("user", user_json);

  window.location = 'inicio.html';

}
