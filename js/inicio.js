
document.addEventListener("DOMContentLoaded", function(e){

	document.getElementById("user").innerHTML = `
                <p>`+ localStorage.getItem(email) +`</p>
                `;

});