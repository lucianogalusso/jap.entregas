
let nombre 
let apellidos 
let edad
let email
let telefono
let password

function mostrarInfo() {

	document.getElementById("info").innerHTML = "";

	let content = `

		<div class="col-12">
	        <a href="https://ibb.co/WFdC6Xw">
	        <img id="imgP" class="m-3 rounded mx-auto d-block" style="width:200px; height:200px;" src="https://i.ibb.co/RPM89Km/luissuarez-jpg-340208009.jpg" alt="luissuarez-jpg-340208009" border="0"></a><br>
	    </div>
		<div class="col-6">
			<label class="col-4">Nombre:</label>        
	        <input id="nombreNew" class="col-6" placeholder="`+nombre+`"><br>
	    </div><br><br>    
	    <div class="col-6">
	        <label class="col-4">Apellidos:</label>        
	        <input id="apellidosNew" class="col-6" placeholder="`+apellidos+`"><br>
	    </div><br><br>
	    <div class="col-6">
	        <label class="col-4">Edad:</label>        
	        <input id="edadNew" class="col-6" placeholder="`+edad+`"><br>
	    </div><br><br>
	    <div class="col-6">
	        <label class="col-4">Email:</label>        
	        <input id="emailNew" type="email" class="col-6" placeholder="`+email+`"><br>
	    </div><br><br>
	    <div class="col-6">
	        <label class="col-4">Teléfono:</label>        
	        <input id="telefonoNew" class="col-6" placeholder="`+telefono+`"><br>
	    </div><br><br><br>
	    <div class="col-12">
	        <button id="submit" onclick="actualizarDatos()" class="btn btn-info col-12">Aplicar cambios</button> <br>
	        <button onclick="alert("Se ha enviado un correo a su cuenta")" class="btn btn-link">Se olvidó de la contraseña?</button>
	    </div><br><br>
	`;

	document.getElementById("info").innerHTML = content;

}

function actualizarDatos() {

	let nombreNew
	let apellidosNew
	let edadNew
	let emailNew
	let telefonoNew
	
	if (document.getElementById("nombreNew").value == "") {
		nombreNew = nombre;
	}else{
		nombreNew = document.getElementById("nombreNew").value;
	}

	if (document.getElementById("apellidosNew").value == "") {
		apellidosNew = apellidos;
	}else{
		apellidosNew = document.getElementById("apellidosNew").value;
	}

	if (document.getElementById("edadNew").value == "") {
		edadNew = edad;
	}else{
		edadNew = document.getElementById("edadNew").value;
	}

	if (document.getElementById("emailNew").value == "") {
		emailNew = email;
	}else{
		emailNew = document.getElementById("emailNew").value;
	}

	if (document.getElementById("telefonoNew").value == "") {
		telefonoNew = telefono;
	}else{
		telefonoNew = document.getElementById("telefonoNew").value;
	}


	
	// Get a reference to the image element
	var imagenPerfil = document.getElementById("imgP");

	// Take action when the image has loaded
	    var imgCanvas = document.createElement("canvas"),
	        imgContext = imgCanvas.getContext("2d");

	    // Make sure canvas is as big as the picture
	    imgCanvas.width = imagenPerfil.width;
	    imgCanvas.height = imagenPerfil.height;

	    // Draw image into canvas element
	    imgContext.drawImage(imagenPerfil, 0, 0, imagenPerfil.width, imagenPerfil.height);

	    // Get canvas contents as a data URL
	    var imgAsDataURL = imgCanvas.toDataURL("image/jpg");

	    let user = {
			email: emailNew, 
			imagen: imgAsDataURL,
			password: password,
			nombre: nombreNew,
			apellidos: apellidosNew,
			edad: edadNew,
			telefono: telefonoNew, 
		};

		let user_json = JSON.stringify(user);

		localStorage.setItem("user", user_json);37

		window.location = 'my-profile.html';


}


document.addEventListener("DOMContentLoaded", function (e) {

	user_json = localStorage.getItem("user");
    user = JSON.parse(user_json);

    email = user.email;
    nombre = user.nombre;
    apellidos = user.apellidos;
    edad = user.edad;
    telefono = user.telefono;
    password = user.password;

    mostrarInfo();

});