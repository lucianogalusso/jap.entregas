//const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const CATEGORIES_URL = "http://localhost:3000/CATEGORIES_URL"

//const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/PUBLISH_PRODUCT_URL"

//const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const CATEGORY_INFO_URL = "http://localhost:3000/CATEGORY_INFO_URL"

//const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCTS_URL = "http://localhost:3000/PRODUCTS_URL"

//const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_URL = "http://localhost:3000/PRODUCT_INFO_URL"

//const PRODUCTOS_ACTUALIZADOS_URL = "https://lucianogalusso.github.io/jap.entregas/js/infoProducts.json";
const PRODUCTOS_ACTUALIZADOS_URL = "http://localhost:3000/PRODUCTOS_ACTUALIZADOS_URL"

//const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/PRODUCT_INFO_COMMENTS_URL"

//const PRODUCTOS_COMENTARIOS_ACTUALIZADOS_URL = "https://lucianogalusso.github.io/jap.entregas/js/comentariosInfo.json";
const PRODUCTOS_COMENTARIOS_ACTUALIZADOS_URL = "http://localhost:3000/PRODUCTOS_COMENTARIOS_ACTUALIZADOS_URL"

//const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_INFO_URL = "http://localhost:3000/CART_INFO_URL"

//const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const CART_BUY_URL = "http://localhost:3000/CART_BUY_URL"



var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}




function verProducto(productoName) {

    let producto = {
      costo: productoName //el ideal seria que tuviera un id unico
    };

    let producto_json = JSON.stringify(producto);

    localStorage.setItem("producto", producto_json);

    window.location = 'product-info.html';

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

  let ubicacion = window.location;
  
  if (localStorage.getItem("user")) {
    user_json = localStorage.getItem("user");
    user = JSON.parse(user_json);
    if (user.nombre == "") {
      document.getElementById("user").innerHTML = user.email;
    }else{
      document.getElementById("user").innerHTML = user.nombre;
    }
    
  }else if ((ubicacion != 'https://lucianogalusso.github.io/jap.entregas/index.html') &&
            (ubicacion != 'file:///D:/Archivos%20de%20programa/jap.entregas/index.html') &&
            (ubicacion != 'file:///C:/Users/Admin/Desktop/Cosas%20muy%20lindas%20y%20sobretodo%20cortas/Github/jap.entregas-main/index.html')
            ){
    window.location = 'index.html';
  }

  var modal = document.getElementById('id01');

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  document.getElementById("cerrar").addEventListener("click", function(){

    localStorage.removeItem("user");
    window.location = 'index.html';

  })
  
});