// Declare varaibles

let botones_compra = document.querySelectorAll(".boton_comprar");

let carrito = [];

let carrito_storage = [];

let talle_seleccionado = "";

let precio_total = 0;
 

for( let boton of botones_compra){

    boton.addEventListener("click", agregar_carrito);

}


function agregar_carrito(e){

    let precio_seleccionado = 0;

    let hijo = e.target;

    let padre = hijo.parentNode;

    let abuelo= padre.parentNode;

    let nombre_producto = abuelo.querySelector("h5").textContent;

    let img = abuelo.querySelector("img").src;

    let precio = abuelo.querySelector("p").textContent;

    talle_seleccionado = abuelo.querySelector("Select").value;

    precio_seleccionado = Number(precio.substr(2)); //remueve el $ y convierte el precio a numero

    if (precio_total == 0) {

        precio_total = precio_seleccionado;
    }

    else {

        precio_total += precio_seleccionado
    }

    let producto = {

        nombre: nombre_producto,

        img: img,

        precio: precio,

        cantidad:1,

        talle: talle_seleccionado
    };

    carrito.push(producto);

    let producto_JSON = JSON.stringify(producto);

    carrito_storage.push(producto_JSON);

    localStorage.setItem("producto" , carrito_storage);

    mostrar_carrito( producto );
}


function mostrar_carrito( producto ){

    let fila = document.createElement("tr");

    fila.setAttribute("id", "myTr");

    fila.innerHTML = `<td><img src="${producto.img}"></td>

                    <td>${producto.nombre}</td>
                    <td>${producto.cantidad}</td>
                    <td>${producto.talle}</td>
                    <td>${producto.precio}</td>
                    <td><button class="btn btn-outline-danger borrar_elemento"> Borrar </buttton></td>` ;

    let body_tabla = document.getElementById("tbody");

    body_tabla.append( fila );

    let botones_borrar = document.querySelectorAll(".borrar_elemento");

    for (let boton of botones_borrar){

        boton.addEventListener("click" , borrar_producto);
    }

    document.getElementById ("precioTotal").innerHTML = "El precio total de su seleccion es: $" + precio_total

    talle_seleccionado = ""; //reset el valor de la variable
}


function borrar_producto(e){

    let precio_a_borrar = 0;

    let hijo = e.target;

    let abuelo = hijo.parentNode.parentNode;

// obtener el precio del producto a borrar y restarlo del precio total

    precio_a_borrar = Number(abuelo.cells[4].innerText.substr(2)); //remueve el $ y convierte el precio a numero

    precio_total = precio_total - precio_a_borrar;

    document.getElementById ("precioTotal").innerHTML = "El precio total de su seleccion es: $" + precio_total

    abuelo.remove();
}








