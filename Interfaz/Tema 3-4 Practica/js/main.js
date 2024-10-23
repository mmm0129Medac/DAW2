const libros = [
    {
        titulo: "La chica de nieve",
        precio: "13.95",
        reservado: "SI",
        img: "img/chicanieve.jpg"
    },
    {
        titulo: "El juego del alma",
        precio: "16.50",
        reservado: "NO",
        img: "img/juegoalma.jpg"
    },
    {
        titulo: "El cuco de cristal",
        precio: "29.75",
        reservado: "NO",
        img:"img/cucocristal.jpg"
    }
];

const listadoLibros = document.getElementById("books_list");
const productoElegido = document.getElementsByClassName(".product_title");

loadBooks(libros);

function loadBooks(libros){

    listadoLibros.innerHTML = " ";
    
    libros.forEach(producto => {
        let title = producto.titulo.replace(/ /g, "");
        let li = document.createElement("li");
        li.classList.add("products");
        li.innerHTML = `
            <img class="product_image" src="${producto.img}" alt="${producto.titulo}">
            <p class="product_title">${producto.titulo}</p>
            <p id="prize">${producto.precio} €</p>
            <button onclick=discount(${producto.precio}) class="discount">Aplicar descuento</button>
            <button onclick=reserve("${title}") class="reserve">Reservar</button>
        `;
        listadoLibros.append(li);
    });
};

function discount(precio) {     
    
    if(precio < 15){
        alert(`El precio del producto es ${precio} €`)
    }
    else if(precio <= 15 && precio < 20){
        alert(`El precio del producto es ${(precio*0.95).toFixed(2)} €`)
    }
    else{
        alert(`El precio del producto es ${(precio*0.9).toFixed(2)} €`)
    }
};

function reserve(nombreDelLibro) {
    let libro = libros.find(libro => (libro.titulo).replace(/ /g, "") === nombreDelLibro);
    if (libro.reservado === "NO") {
        alert('¡Libro reservado! Ven a buscarlo.');
        libro.reservado = "SI";
    } else {
        const aviso = prompt('Libro no disponible, ¿desea recibir un mensaje cuando esté disponible? (SI/NO)').toUpperCase();
        if (aviso === "SI") {
            alert('¡Perfecto! Le avisaremos.');
        } else {
            alert('¡Puede reservar otro libro!');
        }
    }
};

function validarCorreo(correo) {
    const patronCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (patronCorreo.test(correo)) {
        alert("Correo válido.");
        return true;
    } else {
        alert("Correo no válido.");
        return false;
    }
};

function enviarFormulario() {
    const correo = document.getElementById("email").value;
    return validarCorreo(correo);
};

function verificarPalabra() {
    const palabra = prompt("¿Cuál es la palabra oculta?");
    if (palabra.toUpperCase() === "LIBRO") {
        alert("¡Correcto!");
    } else {
        alert("Sigue buscando");
    }
};

let intentos = 3;
const respuestaCorrecta = "thriller";
function verificarRespuesta() {
    const respuestaUsuario = document.getElementById("respuesta").value;
    if (respuestaUsuario.trim().toLowerCase() === respuestaCorrecta.toLowerCase()) {
        alert("¡Enhorabuena, has acertado!");
    } else {
        intentos--;
        if (intentos > 0) {
            alert(`Respuesta incorrecta. Te quedan ${intentos} intentos.`);
        } else {
            alert(`Has agotado tus intentos. La respuesta correcta era "${respuestaCorrecta}".`);
        }
    }
}